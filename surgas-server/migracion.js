const mysql = require('mysql2');

const conn1 = mysql.createConnection({
    host: 'localhost',
    user: 'surgaswebuser',
    password: 'GH5ndijNJRSD',
    database: 'gases2'
});

const conn2 = mysql.createConnection({
    host: 'localhost',
    user: 'surgaswebuser',
    password: 'GH5ndijNJRSD',
    database: 'gases3'
});

async function migrar() {
    let results, rows, fields, i, tipo;

    // Usuarios
    results = await conn1.promise().execute('SELECT * FROM usuario');
    const usuarios = JSON.parse(JSON.stringify(results[0]));
    for (i = 0; i < usuarios.length; i++) {
        if (usuarios[i].administrador === '1') {
            tipo = 'administrador';
        } else if (usuarios[i].comun === '1') {
            tipo = 'vendedor';
        } else {
            tipo = 'cliente';
        }
        [rows, fields] = await conn2.promise().execute(
            "INSERT INTO usuario VALUES(?, ?, ?, ?, ?, b'1')",
            [usuarios[i].nick, usuarios[i].email, usuarios[i].password_hash, usuarios[i].nombre, tipo]
        );
    }

    // Empleados
    results = await conn1.promise().execute('SELECT * FROM empleado');
    const empleados = JSON.parse(JSON.stringify(results[0]));
    let estado;
    for (i = 0; i < empleados.length; i++) {
        if (empleados[i].inactivo === '1') {
            estado = 'inactivo';
        } else if (empleados[i].despedido === '1') {
            estado = 'despedido';
        } else {
            estado = 'activo';
        }
        [rows, fields] = await conn2.promise().execute(
            'INSERT INTO empleado VALUES(?, ?, ?, ?, ?, NULL)',
            [empleados[i].cedula, empleados[i].nombre, empleados[i].direccion, empleados[i].telefono, estado]
        );
    }

    // Clientes
    results = await conn1.promise().execute('SELECT * FROM cliente');
    const clientes = JSON.parse(JSON.stringify(results[0]));
    for (i = 0; i < clientes.length; i++) {
        if (clientes[i].empresarial === '1') {
            tipo = 'empresarial';
        } else {
            tipo = 'comun';
        }
        [rows, fields] = await conn2.promise().execute(
            "INSERT INTO cliente VALUES(?, NULL, ?, ?, ?, 0.0, ?, ?, NULL, ?, NULL)",
            [clientes[i].telefono, clientes[i].nombre, clientes[i].fecha_registro, clientes[i].puntos, tipo, clientes[i].fecha_ultimo_pedido, clientes[i].numero_pedidos]
        );
    }
}

migrar();