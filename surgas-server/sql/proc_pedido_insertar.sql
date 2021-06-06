DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_pedido_insertar
(IN telefono_cliente TYPE OF cliente.telefono, IN fecha_pedido TYPE OF pedido.fecha)
MODIFIES SQL DATA
DETERMINISTIC
BEGIN
    DECLARE tipo_cliente TYPE OF cliente.tipo;
	SELECT tipo INTO tipo_cliente FROM cliente WHERE telefono = telefono_cliente;

	DECLARE numero_pedido TYPE OF pedido.numero;
	IF (fecha_pedido IN (SELECT fecha FROM pedido)) THEN
		SELECT MAX(numero) INTO numero_pedido FROM pedido WHERE fecha = fecha_pedido;
		SET numero_pedido := numero_pedido + 1;
	ELSE
		numero_pedido = 1;
	END IF;
	
	SELECT fecha_ultimo_pedido, numero_ultimo_pedido INTO fup, nup FROM cliente WHERE telefono = tel;
	
	SELECT * FROM pedido WHERE fecha = fup AND numero = nup;
END; $$

DELIMITER ;