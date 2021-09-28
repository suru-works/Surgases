DELIMITER $$
CREATE OR REPLACE PROCEDURE proc_impresora_insertar (
    IN impresora_descripcion TYPE OF impresora.descripcion
)
MODIFIES SQL DATA
BEGIN
    START TRANSACTION;
        INSERT INTO impresora(descripcion) VALUES(impresora_descripcion);
        SELECT LAST_INSERT_ID() as id;
    COMMIT;
END; $$

DELIMITER ;