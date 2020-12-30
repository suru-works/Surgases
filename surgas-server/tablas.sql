CREATE TABLE usuario(
    username VARCHAR(30) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('cliente', 'vendedor', 'administrador') NOT NULL,
    verificado BIT NOT NULL
);

CREATE TABLE empleado(
    id VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    estado ENUM('activo', 'inactivo', 'despedido') NOT NULL,
    username VARCHAR(30),
    CONSTRAINT `fk_emp_usuario` FOREIGN KEY (username) REFERENCES usuario(username)
);

CREATE TABLE cliente(
    telefono VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100),
    nombre VARCHAR(100),
    fecha_registro DATE NOT NULL,
    puntos INT NOT NULL,
    descuento FLOAT,
    tipo ENUM('comun', 'empresarial') NOT NULL,
    fecha_ultimo_pedido DATE,
    numero_ultimo_pedido INT,
    numero_pedidos INT,
    username VARCHAR(30),
    CONSTRAINT `fk_cl_usuario` FOREIGN KEY (username) REFERENCES usuario(username)
);

CREATE TABLE pago(
    codigo BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    fechaHora DATETIME PRIMARY KEY,
    monto INT NOT NULL,
    empleado VARCHAR(100) NOT NULL,
    usuario VARCHAR(30) NOT NULL,
    PRIMARY KEY (codigo),
    CONSTRAINT `fk_pago_emp` FOREIGN KEY (empleado) REFERENCES empleado(id),
    CONSTRAINT `fk_pago_user` FOREIGN KEY (usuario) REFERENCES usuario(username)
);

CREATE TABLE producto(
    codigo BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    color VARCHAR(15) NOT NULL,
    peso FLOAT NOT NULL,
    tipo VARCHAR(15) NOT NULL,
    precio INT NOT NULL,
    inventario INT NOT NULL,
    disponible BIT NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE pedido(
    fecha DATE NOT NULL,
    numero INT NOT NULL,
    hora_registro TIME NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    precio_bruto INT NOT NULL,
    precio_final FLOAT NOT NULL,
    estado ENUM('verificacion', 'cola', 'proceso', 'fiado', 'pago') NOT NULL,
    bodega VARCHAR(15) NOT NULL,
    puntos_compra INT NOT NULL,
    tipo_cliente ENUM('comun', 'empresarial') NOT NULL,
    nota VARCHAR(280),
    usuario_registrador VARCHAR(30) NOT NULL,
    cliente_pedidor VARCHAR(15) NOT NULL,
    empleado_despachador VARCHAR(100) NOT NULL,
    PRIMARY KEY (fecha, numero),
    CONSTRAINT `fk_pedido_usuario` FOREIGN KEY (usuario_registrador) REFERENCES usuario(username),
    CONSTRAINT `fk_pedido_cliente` FOREIGN KEY (cliente_pedidor) REFERENCES cliente(telefono),
    CONSTRAINT `fk_pedido_empleado` FOREIGN KEY (empleado_despachador) REFERENCES empleado(id)
);

CREATE TABLE pedidoxproducto(
    producto BIGINT UNSIGNED NOT NULL,
    fecha_pedido DATE NOT NULL,
    numero_pedido INT NOT NULL,
    PRIMARY KEY (producto, fecha_pedido, numero_pedido),
    CONSTRAINT `fk_pedido` FOREIGN KEY (fecha_pedido, numero_pedido) REFERENCES pedido(fecha, numero),
    CONSTRAINT `fk_producto` FOREIGN KEY (producto) REFERENCES producto(codigo)
);

CREATE TABLE static(
    codigo VARCHAR(8) PRIMARY KEY
    limite_puntos INT NOT NULL,
    puntos_libra INT NOT NULL
);
