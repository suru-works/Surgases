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

    SELECT cliente_pedidor INTO cliente_telefono FROM pedido WHERE fecha = pedido_fecha AND numero = pedido_numero;
    UPDATE cliente SET puntos = puntos + puntos_totales WHERE telefono = cliente_pedidor;
END; $$

DELIMITER ;