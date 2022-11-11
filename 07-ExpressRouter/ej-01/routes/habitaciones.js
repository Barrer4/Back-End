const express = require('express')
const hab = express.Router()

hab.get('/', (req, res) => {
   req.app.locals.db
      .collection('habitaciones')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', err: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No hay habitaciones registradas en la base de datos', results: data })
               : res.send({ error: false, mensaje: 'Habitaciones registradas', results: data })
      })
})

hab.post('/nuevaHab', (req, res) => {
   req.app.locals.db
      .collection('habitaciones')
      .find({ habitacion: parseInt(req.body.habitacion) })
      .toArray((err, data) => {
         console.log((req.body.habitacion))
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err })
            : data.length > 0
               ? res.send({ error: true, mensaje: 'La habitación ' + req.body.habitacion + ' ya se encuentra en la base de datos', data: err })
               : req.app.locals.db
                  .collection('habitaciones')
                  .insertOne({ habitacion: parseInt(req.body.habitacion), disponible: req.body.disponible }, (err, data) => {
                     err
                        ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err })
                        : data.length < 1
                           ? res.send({ error: true, mensaje: 'No se ha podido reservar la habitación' + req.body.habitacion, data: err })
                           : res.send({ error: false, mensaje: 'La habitación ' + req.body.habitacion + ' ha sido añadida correctamente a la base de datos', data: data })
                  })
      })
})

hab.put('/editarHabitacion', (req, res) => {
   req.app.locals.db
      .collection('habitaciones')
      .updateOne({ habitacion: parseInt(req.body.habitacion) },
         {
            $set: { disponible: req.body.disponible }
         },
         (err, data) => {
            err
               ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', err: err })
               : res.send({ error: false, mensaje: 'La habitación ' + req.body.habitacion + ' se ha modificado correctamente', data: data })
         })
})

module.exports = hab