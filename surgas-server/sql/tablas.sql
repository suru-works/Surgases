CREATE TABLE empleado(
    id VARCHAR(100),
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    estado ENUM('activo', 'inactivo', 'despedido') NOT NULL,
    tipo VARCHAR(120) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE cliente(
    telefono VARCHAR(50),
    email VARCHAR(100),
    nombre VARCHAR(100),
    fecha_registro DATE NOT NULL,
    puntos INT NOT NULL,
    tipo ENUM('natural', 'juridica') NOT NULL,
    fecha_ultimo_pedido DATE,
    numero_ultimo_pedido INT,
    numero_pedidos INT,
    promotor VARCHAR(50),
    PRIMARY KEY (telefono),
    FOREIGN KEY (promotor) REFERENCES empleado(id),
    CHECK (telefono != '')
);

CREATE TABLE usuario(
    username VARCHAR(30),
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    verificado BIT NOT NULL,
    restore_password_token VARCHAR(200),
    verification_token VARCHAR(200),
    es_admin BIT NOT NULL,
    cliente VARCHAR(50),
    empleado VARCHAR(100),
    PRIMARY KEY (username),
    UNIQUE (email),
    UNIQUE (cliente),
    UNIQUE (empleado),
    FOREIGN KEY (cliente) REFERENCES cliente(telefono),
    FOREIGN KEY (empleado) REFERENCES empleado(id)
);

CREATE TABLE pago(
    codigo BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    fecha_hora DATETIME NOT NULL,
    monto INT NOT NULL,
    registrador VARCHAR(100) NOT NULL,
    beneficiario VARCHAR(100) NOT NULL,
    PRIMARY KEY (codigo),
    FOREIGN KEY (registrador) REFERENCES empleado(id),
    FOREIGN KEY (beneficiario) REFERENCES empleado(id)
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
    iva_incluido BIT NOT NULL,
    PRIMARY KEY (codigo),
    UNIQUE (nombre, color, peso, tipo)
);

CREATE TABLE clientexproducto(
    cliente VARCHAR(50) NOT NULL,
    producto BIGINT UNSIGNED NOT NULL,
    descuento FLOAT NOT NULL,
    iva_incluido BIT NOT NULL,
    PRIMARY KEY (cliente, producto),
    FOREIGN KEY (cliente) REFERENCES cliente(telefono),
    FOREIGN KEY (producto) REFERENCES producto(codigo)
);

CREATE TABLE pedido(
    fecha DATE NOT NULL,
    numero INT NOT NULL,
    hora_registro TIME NOT NULL,
    direccion VARCHAR(100) NOT NULL,
    municipio VARCHAR(100) NOT NULL,
    precio_bruto INT,
    precio_final FLOAT,
    estado ENUM('verificacion', 'cola', 'proceso', 'fiado', 'pago', 'cancelado') NOT NULL,
    bodega VARCHAR(15) NOT NULL,
    puntos_compra INT,
    tipo_cliente ENUM('natural', 'juridica'),
    nota VARCHAR(280),
    empleado_vendedor VARCHAR(30) NOT NULL,
    empleado_repartidor VARCHAR(30),
    cliente_pedidor VARCHAR(15) NOT NULL,
    PRIMARY KEY (fecha, numero),
    FOREIGN KEY (empleado_vendedor) REFERENCES empleado(id),
    FOREIGN KEY (empleado_repartidor) REFERENCES empleado(id),
    FOREIGN KEY (cliente_pedidor) REFERENCES cliente(telefono)
);

CREATE TABLE pedidoxproducto(
    producto BIGINT UNSIGNED NOT NULL,
    fecha_pedido DATE NOT NULL,
    numero_pedido INT NOT NULL,
    precio_venta INT NOT NULL,
    unidades INT NOT NULL,
    PRIMARY KEY (producto, fecha_pedido, numero_pedido),
    FOREIGN KEY (fecha_pedido, numero_pedido) REFERENCES pedido(fecha, numero),
    FOREIGN KEY (producto) REFERENCES producto(codigo)
);

CREATE TABLE promotorxproducto(
    promotor VARCHAR(50) NOT NULL,
    producto BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (promotor) REFERENCES empleado(id),
    FOREIGN KEY (producto) REFERENCES producto(codigo)
);

CREATE TABLE static(
    codigo VARCHAR(8),
    limite_puntos INT NOT NULL,
    limite_puntos_acumulables INT NOT NULL,
    puntosxlibra INT NOT NULL,
    tiempo_de_gracia INT NOT NULL,
	tiempo_de_redencion INT NOT NULL, 
    descuento FLOAT NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE user_sessions(
    session_id VARCHAR(128) NOT NULL COLLATE 'utf8mb4_bin',
    username VARCHAR(30) NOT NULL
);

CREATE TABLE impresora(
    codigo BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(200),
    PRIMARY KEY (codigo)
);