const express =require("express");
const app=express();
const mysql = require("mysql")
const cors = require("cors")

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "novasalud",
});
// TABLA MEDICAMENTOS
// crear consultas en la base de datos
app.post('/crear', (req, res) => {
    const nombre = req.body.nombre;
    const presentacion = req.body.presentacion;
    const precio = req.body.precio;
    const stock = req.body.stock;
    

    const sql = 'INSERT INTO medicamentos (nombre, presentacion, precio, stock) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, presentacion, precio, stock], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al insertar el medicamento');   
        } else {
            res.status(200).send('medicamento registrado');
        }
    });
});

// listar las consultas de la base de datos
app.get('/medicamentos', (req, res) => {
    const sql = 'SELECT * FROM medicamentos';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los medicamentos');
        } else {
            res.status(200).json(result);
        }
    });
});


//actualizar la consulta de la base de datos
app.put("/actualizar", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const presentacion = req.body.presentacion;
    const precio = req.body.precio;
    const stock = req.body.stock;

    db.query('UPDATE medicamentos SET nombre=?, presentacion=?, precio=?, stock=? WHERE id=?',
        [nombre, presentacion, precio, stock, id],
        (err, result) => {
            if (err) {
                console.error(err); // Cambié console(err) a console.error(err)
            } else {
                res.send("empleado actualizado con exito");
            }
        }
    );
});

//eliminar la consulta de la base de datos
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM medicamentos WHERE id=?", id, (err, result) => {
        if (err) {
            console.error(err); 
        } else {
            res.send("empleado eliminado con exito");
        }
    });
});

//TABLA CLIENTES
app.post('/crearcliente', (req, res) => {
    const nombrecliente = req.body.nombrecliente;
    const producto = req.body.producto;
    const dni = req.body.dni;
    const cantidad = req.body.cantidad;
    const precioventa = req.body.precioventa;
    const total = req.body.total;
    const fecha = req.body.fecha;

    const sql = 'INSERT INTO clientes (nombrecliente, producto, dni, cantidad, precioventa, total, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombrecliente, producto, dni, cantidad, precioventa, total, fecha], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al insertar el cliente');
        } else {
            res.status(200).send('Cliente registrado');
        }
    });
});

app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los clientes');
        } else {
            res.status(200).json(result);
        }
    });
});

app.put("/actualizarcliente", (req, res) => {
    const idcliente = req.body.idcliente;
    const nombrecliente = req.body.nombrecliente;
    const producto = req.body.producto;
    const dni = req.body.dni;
    const cantidad = req.body.cantidad;
    const precioventa = req.body.precioventa;
    const total = req.body.total;
    const fecha = req.body.fecha;

    db.query('UPDATE clientes SET nombrecliente=?, producto=?, dni=?, cantidad=?, precioventa=?, total=?, fecha=? WHERE idcliente=?',
        [nombrecliente, producto, dni, cantidad, precioventa, total, fecha, idcliente],
        (err, result) => {
            if (err) {
                console.error(err); // Cambié console(err) a console.error(err)
            } else {
                res.send("cliente actualizado con exito");
            }
        }
    );
});


app.delete("/deletecliente/:idcliente", (req, res) => {
    const idcliente = req.params.idcliente;
    db.query("DELETE FROM clientes WHERE idcliente=?", idcliente, (err, result) => {
        if (err) {
            console.error(err); 
        } else {
            res.send("cliente eliminado con exito");
        }
    });
});


// LOGIN

app.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;

    console.log("Datos recibidos:", { correo, contraseña }); // Log para verificar los datos recibidos

    const sql = 'SELECT * FROM usuarioslogin WHERE correo = ? AND contraseña = ?';
    db.query(sql, [correo, contraseña], (err, result) => {
        if (err) {
            console.error("Error en la consulta:", err);
            res.status(500).send('Error en la consulta');
        } else if (result.length > 0) {
            console.log("Resultado de la consulta:", result); // Log para verificar el resultado de la consulta
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            console.log("Credenciales incorrectas"); // Log para verificar si las credenciales no coinciden
            res.status(401).send('Credenciales incorrectas');
        }
    });
});

// puerto para el servidor
app.listen(3001, () =>(
    console.log("corriendo el puerto 3001")
));