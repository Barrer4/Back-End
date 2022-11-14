const express = require('express')
const menus = express.Router();


menus.get('/', (req, res) => {
   req.app.locals.db
      .collection('menus')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de menus', results: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No hay menus registrados en la base de datos', results: data })
               : res.send({ error: false, mensaje: 'Menus disponibles', results: data })
      })
})

menus.post('/nuevoMenu', (req, res) => {
   req.app.locals.db
      .collection('menus')
      .insertOne({ nombre: req.body.menu, precio: parseFloat(req.body.precio) }, (err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de menus', data: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No se ha podido registrar el menu ' + req.body.menu + ' en la base de datos', data: data })
               : res.send({ error: false, mensaje: 'El menu ' + req.body.menu + ' ha sido añadido correctamente a la base de datos', data: data })
      })
})

menus.post('/elegirMenu', (req, res) => {
   req.app.locals.db
      .collection('menus')
      .find({ menu: req.body.menu })
      .toArray((err, data) => {
         console.log(data[0].menu, data[0].precio)
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de menus', data: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'No hay menus registrados en la base de datos', data: data })
               : req.app.locals.db
                  .collection('hamburguesas')
                  .find({ hamburguesa: req.body.hamburguesa })
                  .toArray((err1, data1) => {
                     err1
                        ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de hamburguesas', data: err1 })
                        : data1.length < 1
                           ? res.send({ error: true, mensaje: 'No hay hamburguesas registradas en la base de datos', data: data1 })
                           : req.app.locals.db
                              .collection('bebidas')
                              .find({ bebida: req.body.bebida })
                              .toArray((err2, data2) => {
                                 err2
                                    ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de bebidas', data: err2 })
                                    : data2.length < 1
                                       ? res.send({ error: true, mensaje: 'No hay bebidas registradas en la base de datos', data: data2 })
                                       : req.app.locals.db
                                          .collection('patatas')
                                          .find()
                                          .toArray((err3, data3) => {
                                             err3

                                                ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de patatas', data: err3 })
                                                : data3.length < 1
                                                   ? res.send({ error: true, mensaje: 'No hay patatas registradas en la base de datos', data: data3 })
                                                   : req.app.locals.db
                                                      .collection('compras')
                                                      .insertOne({ menu: req.body.menu, hamburguesa: req.body.hamburguesa, bebida: req.body.bebida, patatas: data3[0].nombre, precio: parseInt(data[0].precio) }, (err4, data4) => {
                                                         err4

                                                            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de compras', data: err4 })
                                                            : res.send({ error: false, mensaje: 'Compra exitosa', data: data4 })
                                                      })
                                          })
                              })
                  })
      })
})

module.exports = menus