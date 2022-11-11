const express = require('express')
const clientes = express.Router();

clientes.get('/', (req, res) => {
   req.app.locals.db
      .collection('clientes')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', err: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No hay clientes registrados en la base de datos', results: data })
               : res.send({ error: false, mensaje: 'Clientes registrados', results: data })
      })
})


clientes.post('/nuevoCliente', (req, res) => {
   req.app.locals.db
      .collection('clientes')
      .find({ dni: req.body.dni })
      .toArray((err1, data1) => {
         err1
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err1 })
            : data1.length > 0
               ? res.send({ error: true, mensaje: 'El cliente ya se encuentra en la base de datos', data: data1 })
               : req.app.locals.db
                  .collection('clientes')
                  .insertOne({ nombre: req.body.nombre, apellido: req.body.apellido, dni: req.body.dni }, (err2, data2) => {
                     err2
                        ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err2 })
                        : data2.insertedId === null
                           ? res.send({ error: true, mensaje: 'No se ha podido registrar al cliente ' + req.body.dni + ' en la base de datos', data: data2 })
                           : res.send({ error: false, mensaje: 'El cliente ' + req.body.dni + ' ha sido añadido correctamente a la base de datos', data: data2 })
                  })
      })
})

clientes.put('/editarCliente', (req, res) => {
   req.app.locals.db
      .collection('clientes')
      .updateOne({ dni: req.body.dni },
         {
            $set: {
               nombre: req.body.nombre,
               apellido: req.body.apellido,
            },
         },
         (err, data) => {
            err
               ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err })
               : data.matchedCount < 1
                  ? res.send({ error: true, mensaje: 'El cliente ' + req.body.dni + ' no se encuentra registrado en la base de datos', data: data })
                  : data.modifiedCount < 1
                     ? res.send({ error: true, mensaje: 'No se han realizado modificaciones en el cliente ' + req.body.dni, data: data })
                     : res.send({ error: false, mensaje: 'El cliente ' + req.body.dni + ' ha sido modificado correctamente en la base de datos', data: data })
         })
})

module.exports = clientes;