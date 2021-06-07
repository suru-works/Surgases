DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_usuario_insertar (
    IN usuario_username TYPE OF usuario.username,
    IN usuario_email TYPE OF usuario.email,
    IN usuario_password_hash TYPE OF usuario.password_hash,
    IN usuario_cliente TYPE OF usuario.cliente
)
MODIFIES SQL DATA
BEGIN
    INSERT INTO usuario(
        username,
        email,
        password_hash,
        verificado,
        es_admin,
        cliente
    ) VALUES (
        usuario_username,
        usuario_email,
        usuario_password_hash,
        b'0',
        b'0',
        usuario_cliente
    );

    UPDATE cliente SET email = usuario_email WHERE telefono = usuario_cliente;
END; $$

DELIMITER ;