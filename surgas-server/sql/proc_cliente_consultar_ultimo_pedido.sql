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