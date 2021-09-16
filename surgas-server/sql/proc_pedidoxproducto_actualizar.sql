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