const express = require('express');
const hamburguesas = express.Router();

hamburguesas.get('/', (req, res) => {
   req.app.locals.db
      .collection('hamburguesas')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de hamburguesas', err: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No hay hamburguesas registradas en la base de datos', results: data })
               : res.send({ error: false, mensaje: 'Hamburguesas disponibles', results: data })
      })
})

hamburguesas.post('/nuevaHamburguesa', (req, res) => {
   req.app.locals.db
      .collection('hamburguesas')
      .insertOne({nombre: req.body.nombre, precio: parseFloat(req.body.precio)}, (err, data) => {
         err
         ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', err: err2 })
         : data.length < 1
         ? res.send({ error: true, mensaje: 'No se ha podido registrar la hamburguesa ' + req.body.nombre + ' en la base de datos', data: data })
         : res.send({ error: false, mensaje: 'El menu ' + req.body.nombre + ' ha sido añadido correctamente a la base de datos', data: data })
      })
})

hamburguesas.post('/elegirHamburguesa', (req, res) => {
   req.app.locals.db
      .collection('compra')
      .insertOne({nombre: req.body.nombre, precio: parseFloat(req.body.precio)}, (err, data => {
         err
         ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de compra', err: err2 })
         : data.length < 1
         ? res.send({ error: true, mensaje: 'No se ha podido registrar el menu ' + req.body.nombre + ' en la base de datos de compra', data: data })
         : res.send({ error: false, mensaje: 'El menu ' + req.body.nombre + ' ha sido añadido correctamente a la base de datos de compra', data: data })
      }))
})



module.exports = hamburguesas