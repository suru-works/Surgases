DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_cliente_consultar_ultimo_pedido (IN cliente_telefono TYPE OF cliente.telefono)
READS SQL DATA
BEGIN
	DECLARE fup TYPE OF pedido.fecha;
	DECLARE nup TYPE OF pedido.numero;
	
	SELECT fecha_ultimo_pedido, numero_ultimo_pedido INTO fup, nup FROM cliente WHERE telefono = cliente_telefono;
	
	SELECT * FROM pedido WHERE fecha = fup AND numero = nup;
END; $$

DELIMITER ;
DELIMITER $$
CREATE OR REPLACE PROCEDURE proc_impresora_insertar (
    IN impresora_descripcion TYPE OF impresora.descripcion
)
MODIFIES SQL DATA
BEGIN
    START TRANSACTION;
        INSERT INTO impresora(descripcion) VALUES(impresora_descripcion);
        SELECT LAST_INSERT_ID() as id;
    COMMIT;
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_pedido_actualizar_informacion (
    IN pedido_fecha TYPE OF pedido.fecha,
    IN pedido_numero TYPE OF pedido.numero,
	IN pedido_precio_bruto TYPE OF pedido.precio_bruto,
    IN pedido_precio_final TYPE OF pedido.precio_final,
    IN peso_total TYPE OF producto.peso
)
MODIFIES SQL DATA
BEGIN
    DECLARE puntos_libra TYPE OF static.puntosxlibra;
    DECLARE pedido_puntos_compra TYPE OF pedido.puntos_compra;

    SELECT puntosxlibra INTO puntos_libra FROM static;
    SET pedido_puntos_compra := puntos_libra * peso_total;

    UPDATE pedido
    SET precio_bruto = pedido_precio_bruto, precio_final = pedido_precio_final, puntos_compra = pedido_puntos_compra
    WHERE fecha = pedido_fecha AND numero = pedido_numero;

    
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_pedido_insertar (
	IN pedido_direccion TYPE OF pedido.direccion,
	IN pedido_municipio TYPE OF pedido.municipio,
	IN pedido_estado TYPE OF pedido.estado,
	IN pedido_bodega TYPE OF pedido.bodega,
	IN pedido_nota TYPE OF pedido.nota,
	IN pedido_empleado_vendedor TYPE OF empleado.id,
	IN pedido_empleado_repartidor TYPE OF empleado.id,
	IN cliente_telefono TYPE OF cliente.telefono
)
MODIFIES SQL DATA
BEGIN
	DECLARE ahora TIMESTAMP;
	DECLARE pedido_fecha TYPE OF pedido.fecha;
	DECLARE pedido_numero TYPE OF pedido.numero;
	DECLARE cliente_tipo TYPE OF cliente.tipo;

	SET ahora = NOW();
	
	SET pedido_fecha := DATE(ahora);

	IF (pedido_fecha IN (SELECT fecha FROM pedido)) THEN
		SELECT MAX(numero) INTO pedido_numero FROM pedido WHERE fecha = pedido_fecha;
		SET pedido_numero := pedido_numero + 1;
	ELSE
		SET pedido_numero := 1;
	END IF;

	SELECT tipo INTO cliente_tipo FROM cliente WHERE telefono = cliente_telefono;

	UPDATE cliente
	SET fecha_ultimo_pedido = pedido_fecha, numero_ultimo_pedido = pedido_numero, numero_pedidos = numero_pedidos + 1
	WHERE telefono = cliente_telefono;
	
	INSERT INTO pedido(
		fecha,
		numero,
		hora_registro,
		direccion,
		municipio,
		estado,
		bodega,
		tipo_cliente,
		nota,
		empleado_vendedor,
		empleado_repartidor,
		cliente_pedidor
	) VALUES (
		pedido_fecha,
		pedido_numero,
		TIME(ahora),
		pedido_direccion,
		pedido_municipio,
		pedido_estado,
		pedido_bodega,
		cliente_tipo,
		pedido_nota,
		pedido_empleado_vendedor,
		pedido_empleado_repartidor,
		cliente_telefono
	);

	SELECT pedido_fecha AS fecha, pedido_numero AS numero;
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_pedido_inventario_puntos (
	IN pedido_fecha TYPE OF pedido.fecha,
    IN pedido_numero TYPE OF pedido.numero
)
MODIFIES SQL DATA
BEGIN
    DECLARE puntos_libra TYPE OF static.puntosxlibra;
    DECLARE producto_inventario TYPE OF producto.inventario;
    DECLARE puntos_totales TYPE OF cliente.puntos;
    DECLARE producto_peso TYPE OF producto.peso;
    DECLARE cliente_telefono TYPE OF cliente.telefono;

    SELECT puntosxlibra INTO puntos_libra FROM static;

    FOR pp IN (SELECT producto, unidades FROM pedidoxproducto WHERE fecha_pedido = pedido_fecha AND numero_pedido = pedido_numero) DO
        SELECT inventario INTO producto_inventario FROM producto WHERE codigo = pp.producto;
        IF producto_inventario - pp.unidades < 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Hay un producto sin suficiente stock';
        END IF;
    END FOR;

    SET puntos_totales := 0;

    FOR pp IN (SELECT producto, unidades FROM pedidoxproducto WHERE fecha_pedido = pedido_fecha AND numero_pedido = pedido_numero) DO
        UPDATE producto SET inventario = inventario - pp.unidades WHERE codigo = pp.producto;

        SELECT peso INTO producto_peso FROM producto WHERE codigo = pp.producto;
        SET puntos_totales := puntos_totales + (puntos_libra * producto_peso);
    END FOR;

    UPDATE pedido SET puntos_compra = puntos_totales WHERE fecha = pedido_fecha AND numero = pedido_numero;

    SELECT cliente_pedidor INTO cliente_telefono FROM pedido WHERE fecha = pedido_fecha AND numero = pedido_numero;
    UPDATE cliente SET puntos = puntos + puntos_totales WHERE telefono = cliente_pedidor;
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_pedidoxproducto_actualizar (
	IN producto_codigo TYPE OF pedidoxproducto.producto,
    IN pedido_fecha TYPE OF pedidoxproducto.fecha_pedido,
    IN pedido_numero TYPE OF pedidoxproducto.numero_pedido,
    IN pedidoxproducto_precio_venta TYPE OF pedidoxproducto.precio_venta,
    IN pedidoxproducto_unidades TYPE OF pedidoxproducto.unidades
)
MODIFIES SQL DATA
BEGIN
    DECLARE pedidoxproducto_precio_venta_original TYPE OF pedidoxproducto.precio_venta;
    DECLARE pedidoxproducto_valor_iva_original TYPE OF pedidoxproducto.valor_iva;
    DECLARE pedidoxproducto_unidades_original TYPE OF pedidoxproducto.valor_iva;
    DECLARE pedidoxproducto_valor_iva TYPE OF pedidoxproducto.valor_iva;
    DECLARE pedidoxproducto_descuento TYPE OF pedidoxproducto.descuento;
    DECLARE precio_bruto_original TYPE OF pedidoxproducto.precio_bruto;
    DECLARE precio_final_original TYPE OF pedido.precio_final;
    DECLARE precio_bruto_nuevo TYPE OF pedido.precio_bruto;
    DECLARE precio_final_nuevo TYPE OF pedido.precio_final;

    SELECT precio_venta, valor_iva, descuento, unidades INTO pedidoxproducto_precio_venta_original, pedidoxproducto_valor_iva_original, pedidoxproducto_descuento, pedidoxproducto_unidades_original
    FROM pedidoxproducto
    WHERE producto = producto_codigo AND fecha_pedido = pedido_fecha AND numero_pedido = pedido_numero;

    SET pedidoxproducto_valor_iva := pedidoxproducto_precio_venta * (pedidoxproducto_valor_iva / pedidoxproducto_precio_venta_original);

	UPDATE pedidoxproducto
    SET precio_venta = pedidoxproducto_precio_venta, valor_iva = pedidoxproducto_valor_iva, unidades = pedidoxproducto_unidades
    WHERE producto = producto_codigo AND fecha_pedido = pedido_fecha AND numero_pedido = pedido_numero;

    SET precio_bruto_original := pedidoxproducto_precio_venta_original * pedidoxproducto_unidades_original;
    SET precio_final_original := (pedidoxproducto_precio_venta_original + pedidoxproducto_valor_iva_original) * ((100 - pedidoxproducto_descuento) / 100) * pedidoxproducto_unidades_original;
    SET precio_bruto_nuevo := pedidoxproducto_precio_venta * pedidoxproducto_unidades;
    SET precio_final_nuevo := (pedidoxproducto_precio_venta + pedidoxproducto_valor_iva) * ((100 - pedidoxproducto_descuento) / 100) * pedidoxproducto_unidades;

    SELECT precio_bruto_original, precio_final_original, precio_bruto_nuevo, precio_final_nuevo;
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_pedidoxproducto_eliminar (
	IN producto_codigo TYPE OF pedidoxproducto.producto,
    IN pedido_fecha TYPE OF pedidoxproducto.fecha_pedido,
    IN pedido_numero TYPE OF pedidoxproducto.numero_pedido
)
MODIFIES SQL DATA
BEGIN
    DECLARE pedidoxproducto_precio_venta TYPE OF pedidoxproducto.precio_venta;
    DECLARE pedidoxproducto_valor_iva TYPE OF pedidoxproducto.valor_iva;
    DECLARE pedidoxproducto_descuento TYPE OF pedidoxproducto.descuento;
    DECLARE pedidoxproducto_unidades TYPE OF pedidoxproducto.unidades;
    DECLARE precio_bruto TYPE OF pedido.precio_bruto;
    DECLARE precio_final TYPE OF pedido.precio_final;

    SELECT precio_venta, valor_iva, descuento, unidades INTO pedidoxproducto_precio_venta, pedidoxproducto_valor_iva, pedidoxproducto_descuento, pedidoxproducto_unidades
    FROM pedidoxproducto
    WHERE producto = producto_codigo AND fecha_pedido = pedido_fecha AND numero_pedido = pedido_numero;

    SET precio_bruto := pedidoxproducto_precio_venta * pedidoxproducto_unidades;
    SET precio_final := (pedidoxproducto_precio_venta + pedidoxproducto_valor_iva) * ((100 - pedidoxproducto_descuento) / 100) * pedidoxproducto_unidades;

    SELECT precio_bruto, precio_final;
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_pedidoxproducto_insertar (
	IN producto_codigo TYPE OF pedidoxproducto.producto,
    IN pedido_fecha TYPE OF pedidoxproducto.fecha_pedido,
    IN pedido_numero TYPE OF pedidoxproducto.numero_pedido,
    IN pedidoxproducto_precio_venta TYPE OF pedidoxproducto.precio_venta,
    IN pedidoxproducto_unidades TYPE OF pedidoxproducto.unidades,
    IN cliente_telefono TYPE OF pedido.cliente_pedidor
)
MODIFIES SQL DATA
BEGIN
    DECLARE pedidoxproducto_valor_iva TYPE OF pedidoxproducto.valor_iva;
    DECLARE pedidoxproducto_descuento TYPE OF pedidoxproducto.descuento;
    DECLARE clientexproducto_descuento TYPE OF clientexproducto.descuento;
    DECLARE precio_bruto TYPE OF pedido.precio_bruto;
    DECLARE precio_final TYPE OF pedido.precio_final;

    SET pedidoxproducto_valor_iva := pedidoxproducto_precio_venta * ((SELECT iva_actual FROM static) / 100);

    SET pedidoxproducto_descuento := 0;

    SELECT descuento INTO pedidoxproducto_descuento
    FROM clientexproducto
    WHERE cliente = cliente_telefono AND producto = producto_codigo;

	INSERT INTO pedidoxproducto VALUES (
        producto_codigo,
        pedido_fecha,
        pedido_numero,
        pedidoxproducto_precio_venta,
        pedidoxproducto_valor_iva,
        pedidoxproducto_descuento,
        pedidoxproducto_unidades
    );

    SET precio_final := (pedidoxproducto_precio_venta + pedidoxproducto_valor_iva) * ((100 - pedidoxproducto_descuento) / 100) * pedidoxproducto_unidades;

    SELECT pedidoxproducto_precio_venta * pedidoxproducto_unidades AS precio_bruto, precio_final;
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_usuario_cambiar_password (
    IN usuario_restore_password_token TYPE OF usuario.restore_password_token,
    IN usuario_password_hash TYPE OF usuario.password_hash
)
MODIFIES SQL DATA
BEGIN
    DECLARE usuario_username TYPE OF usuario.username;

    SELECT username INTO usuario_username FROM usuario WHERE restore_password_token = usuario_restore_password_token;

    DELETE FROM sessions WHERE session_id IN (SELECT session_id FROM user_sessions WHERE username = usuario_username);
    DELETE FROM user_sessions WHERE username = usuario_username;

    UPDATE usuario SET password_hash = usuario_password_hash, restore_password_token = NULL WHERE username = usuario_username;
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_usuario_cliente_insertar (
    IN cliente_telefono TYPE OF cliente.telefono,
    IN cliente_email TYPE OF cliente.email,
    IN cliente_nombre TYPE OF cliente.nombre,
    IN cliente_tipo TYPE OF cliente.tipo,
    IN usuario_username TYPE OF usuario.username,
    IN usuario_email TYPE OF usuario.email,
    IN usuario_password_hash TYPE OF usuario.password_hash
)
MODIFIES SQL DATA
DETERMINISTIC
BEGIN
    INSERT INTO cliente(
        telefono,
        email,
        nombre,
        fecha_registro,
        puntos,
        tipo,
        numero_pedidos
    ) VALUES (
        cliente_telefono,
        cliente_email,
        cliente_nombre,
        DATE(NOW()),
        0,
        cliente_tipo,
        0
    );

    INSERT INTO usuario(
        username,
        email,
        password_hash,
        verificado,
        es_admin,
        cliente
    ) VALUES (
        usuario_username,
        usuario_email,
        usuario_password_hash,
        b'0',
        b'0',
        cliente_telefono
    );
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_usuario_current (IN usuario_username TYPE OF usuario.username)
READS SQL DATA
BEGIN
    DECLARE usuario_cliente TYPE OF usuario.cliente;
    DECLARE usuario_empleado TYPE OF usuario.empleado;
    DECLARE cliente_tipo TYPE OF cliente.tipo;
    DECLARE empleado_tipo TYPE OF empleado.tipo;
    
    SELECT cliente, empleado INTO usuario_cliente, usuario_empleado FROM usuario WHERE username = usuario_username;
    
    IF usuario_cliente IS NOT NULL THEN
        SELECT tipo INTO cliente_tipo FROM cliente WHERE telefono = usuario_cliente;
    END IF;
    
    IF usuario_empleado IS NOT NULL THEN
        SELECT tipo INTO empleado_tipo FROM empleado WHERE id = usuario_empleado;
    END IF;

    SELECT username, email, es_admin, cliente_tipo, empleado_tipo FROM usuario WHERE username = usuario_username;
END; $$

DELIMITER ;
DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_usuario_insertar (
    IN usuario_username TYPE OF usuario.username,
    IN usuario_email TYPE OF usuario.email,
    IN usuario_password_hash TYPE OF usuario.password_hash,
    IN usuario_cliente TYPE OF usuario.cliente
)
MODIFIES SQL DATA
BEGIN
    INSERT INTO usuario(
        username,
        email,
        password_hash,
        verificado,
        es_admin,
        cliente
    ) VALUES (
        usuario_username,
        usuario_email,
        usuario_password_hash,
        b'0',
        b'0',
        usuario_cliente
    );

    UPDATE cliente SET email = usuario_email WHERE telefono = usuario_cliente;
END; $$

DELIMITER ;