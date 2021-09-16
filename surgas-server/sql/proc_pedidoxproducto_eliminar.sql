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