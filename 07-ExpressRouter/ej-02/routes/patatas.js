const express = require('express')
const patatas = express.Router();


patatas.get('/', (req, res) => {
   req.app.locals.db
      .collection('patatas')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de patatas', err: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No hay patatas registradas en la base de datos', results: data })
               : res.send({ error: false, mensaje: 'Patatas disponibles', results: data })
      })
})

module.exports = patatas