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

    SET precio_final := (pedidoxproducto_precio_venta + pedidoxproducto_valor_iva) * ((100 - pedidoxproducto_descuento) / 100);

    SELECT pedidoxproducto_precio_venta AS precio_bruto, precio_final;
END; $$

DELIMITER ;