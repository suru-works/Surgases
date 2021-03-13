DELIMITER $$

CREATE OR REPLACE PROCEDURE insertar_cliente
(IN tel TYPE OF cliente.telefono, IN correo TYPE OF cliente.email, IN nom TYPE OF cliente.nombre, IN fecha_reg TYPE OF cliente.fecha_registro, IN tip TYPE OF cliente.tipo)
MODIFIES SQL DATA
DETERMINISTIC
BEGIN
    DECLARE discount TYPE OF cliente.descuento;

    IF tip = 'empresarial' THEN
        SELECT descuento INTO discount FROM static;
    ELSE
        SET discount := 0.0;
    END IF;

    INSERT INTO cliente (telefono, email, nombre, fecha_registro, descuento, tipo) VALUES (tel, correo, nom, fecha_reg, discount, tip);
END; $$

DELIMITER ;