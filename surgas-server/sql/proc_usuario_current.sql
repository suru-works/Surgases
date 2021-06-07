DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_usuario_current (IN usuario_username TYPE OF usuario.username)
MODIFIES SQL DATA
DETERMINISTIC
BEGIN
    DECLARE usuario_cliente TYPE OF usuario.cliente;
    DECLARE usuario_empleado TYPE OF usuario.empleado;
    DECLARE cliente_tipo TYPE OF cliente.tipo;
    DECLARE empleado_tipo TYPE OF empleado.tipo;
    
    SELECT cliente, empleado INTO usuario_cliente, usuario_empleado FROM usuario WHERE username = usuario_username;
    
    IF usuario_cliente IS NOT NULL THEN
        SELECT tipo INTO cliente_tipo FROM cliente WHERE telefono = usuario_cliente;
    END IF;
    
    IF usuario_empleado IS NOT NULL THEN
        SELECT tipo INTO empleado_tipo FROM empleado WHERE id = usuario_empleado;
    END IF;

    SELECT username, email, es_admin, cliente_tipo, empleado_tipo FROM usuario WHERE username = usuario_username;
END; $$

DELIMITER ;