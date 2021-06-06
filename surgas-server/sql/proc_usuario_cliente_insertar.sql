DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_usuario_cliente_insertar (
    IN cliente_telefono TYPE OF cliente.telefono,
    IN cliente_email TYPE OF cliente.email,
    IN cliente_nombre TYPE OF cliente.nombre,
    IN cliente_tipo TYPE OF cliente.tipo,
    IN usuario_username TYPE OF usuario.username,
    IN usuario_email TYPE OF usuario.email,
    IN usuario_password_hash TYPE OF usuario.password_hash
)
MODIFIES SQL DATA
DETERMINISTIC
BEGIN
    INSERT INTO cliente(
        telefono,
        email,
        nombre,
        fecha_registro,
        puntos,
        tipo,
        numero_pedidos
    ) VALUES (
        cliente_telefono,
        cliente_email,
        cliente_nombre,
        DATE(NOW()),
        0,
        cliente_tipo,
        0
    );

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
        cliente_telefono
    );
END; $$

DELIMITER ;