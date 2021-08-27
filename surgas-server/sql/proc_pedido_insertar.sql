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