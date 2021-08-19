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
    DECLARE clientexproducto_descuento TYPE OF clientexproducto.descuento;
    DECLARE precio_final TYPE OF pedido.precio_final;

	INSERT INTO pedidoxproducto VALUES (
        producto_codigo,
        pedido_fecha,
        pedido_numero,
        pedidoxproducto_precio_venta,
        pedidoxproducto_unidades
    );

    SELECT descuento INTO clientexproducto_descuento
    FROM clientexproducto
    WHERE cliente = cliente_telefono AND producto = producto_codigo;

    SET precio_final := pedidoxproducto_precio_venta * clientexproducto_descuento;

    SELECT pedidoxproducto_precio_venta AS precio_bruto, precio_final;
END; $$

DELIMITER ;