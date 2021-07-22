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