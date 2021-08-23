DELIMITER $$

CREATE OR REPLACE PROCEDURE proc_usuario_cambiar_password (
    IN usuario_restore_password_token TYPE OF usuario.restore_password_token,
    IN usuario_password_hash TYPE OF usuario.password_hash
)
MODIFIES SQL DATA
BEGIN
    DECLARE usuario_username TYPE OF usuario.username;

    SELECT username INTO usuario_username FROM usuario WHERE restore_password_token = usuario_restore_password_token;

    DELETE FROM sessions WHERE session_id IN (SELECT session_id FROM user_sessions WHERE username = usuario_username);
    DELETE FROM user_sessions WHERE username = usuario_username;

    UPDATE usuario SET password_hash = usuario_password_hash, restore_password_token = NULL WHERE username = usuario_username;
END; $$

DELIMITER ;