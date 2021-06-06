DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_cliente_consultar_ultimo_pedido
(IN tel TYPE OF cliente.telefono)
MODIFIES SQL DATA
DETERMINISTIC
BEGIN
	DECLARE fup TYPE OF pedido.fecha;
	DECLARE nup TYPE OF pedido.numero;
	
	SELECT fecha_ultimo_pedido, numero_ultimo_pedido INTO fup, nup FROM cliente WHERE telefono = tel;
	
	SELECT * FROM pedido WHERE fecha = fup AND numero = nup;
END; $$

DELIMITER ;