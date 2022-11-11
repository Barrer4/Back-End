const express = require('express')
const reservas = express.Router()

reservas.get('/', (req, res) => {
   req.app.locals.db
      .collection('reservas')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', err: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No hay reservas registradas en la base de datos', results: data })
               : res.send({ error: false, mensaje: 'Reservas registradas', results: data })
      })
})

reservas.post('/checkIn', (req, res) => {
   req.app.locals.db
      .collection('clientes')
      .find({ dni: req.body.dni })
      .toArray((err1, data1) => {
         err1
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err1 })
            : data1.length < 1
               ? res.send({ error: true, mensaje: 'El cliente NO se encuentra en la base de datos', data: data1 })
               : req.app.locals.db
                  .collection('habitaciones')
                  .find({ habitacion: parseInt(req.body.habitacion) })
                  .toArray((err2, data2) => {
                     err2
                        ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err2 })
                        : (data2[0].disponible === false)
                           ? res.send({ error: true, mensaje: 'La habitación no se encuentra disponible', data: data2 })
                           : req.app.locals.db
                              .collection('reservas')
                              .insertOne({
                                 cliente: {
                                    nombre: data1[0].nombre,
                                    apellido: data1[0].apellido, dni: data1[0].dni
                                 },
                                 habitacion: data2[0].habitacion,
                                 checkIn: (new Date(req.body.checkIn)).getTime(),
                                 checkOut: (new Date(req.body.checkOut)).getTime()
                              }, (err3, data3) => {
                                 err3
                                    ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err3 })
                                    : data2[0].inserted === null
                                       ? res.send({ error: true, mensaje: 'No se ha podido registrar la reserva en la base de datos' })
                                       : req.app.locals.db
                                          .collection('habitaciones')
                                          .updateOne({ habitacion: data2[0].habitacion }, { $set: { disponible: false } }, (err4, data4) => {
                                             err4
                                                ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err4 })
                                                : data4.modifiedCount < 1
                                                   ? res.send({
                                                      error: true, mensaje: 'No se ha modificado la habitación ' + data2[0].habitacion, data: err4
                                                   })
                                                   : res.send({ error: false, mensaje: 'La habitación ' + data2[0].habitacion + ' ha sido reservada por el cliente ' + data1[0].dni, data: data3, data4 })
                                          })
                              })
                  })

      })
})

reservas.post('/checkOut', (req, res) => {
   req.app.locals.db
      .collection('clientes')
      .find({ dni: req.body.dni })
      .toArray((err1, data1) => {
         err1
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err1 })
            : data1.length < 1
               ? res.send({ error: true, mensaje: 'NO se ha encontrado el cliente ' + req.body.dni + ' en la base de datos', data: data1 })
               : req.app.locals.db
                  .collection('reservas')
                  .updateOne({ "cliente.dni": req.body.dni }, { $currentDate: { checkOut: { $type: "date" } } }, (err2, data2) => {
                     err2
                        ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err2 })
                        : req.app.locals.db
                           .collection('habitaciones')
                           .updateOne({ habitacion: data1[0].habitacion }, { $set: { disponible: true } }, (err3, data3) => {
                              err3
                                 ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos', data: err3 })
                                 : res.send({ error: false, mensaje: 'El checkOut de la habitación ' + data1[0].habitacion + ' se ha ejecutado correctamente', data: data2, data3 })
                           })
                  })
      })
})



module.exports = reservas