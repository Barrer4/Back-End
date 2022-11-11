const express = require('express')
const bebidas = express.Router();

bebidas.get('/', (req, res) => {
   req.app.locals.db
      .collection('bebidas')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de bebidas', results: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No hay bebidas registradas en la base de datos de bebidas', results: data })
               : res.send({ error: false, mensaje: 'Clientes registrados', results: data })
      })
})

module.exports = bebidas
