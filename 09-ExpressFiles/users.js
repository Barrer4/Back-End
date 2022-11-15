const express = require('express')
const users = express.Router();
const bcrypt = require('bcrypt');


users.post('/logIn', (req, res) => {
   req.app.locals.db
      .collection('users')
      .find({ email: req.body.email })
      .toArray((err, data) => {
            err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'Hay problemas con las credenciales, por favor verifique los datos e inténtelo nuevamente', data: data })
               : !bcrypt.compareSync(req.body.password, data[0].password)
                  ? res.send({ error: true, mensaje: 'Hay problemas con las credenciales, por favor verifique los datos e inténtelo nuevamente', data: data })
                  : req.app.locals.db
                     .collection('users')
                     .updateOne({ email: req.body.email }, { $set: { online: true } }, (err1, data1) => {
                        err1
                           ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err1 })
                           : data1.modified < 1
                              ? res.send({ error: true, mensaje: 'El usuario no ha podido ser conectado', data: data1 })
                              : (console.log(data), res.send({ error: false, mensaje: 'Login exitoso', data: data }))
                     })
      })
})

users.post('/signIn', (req, res) => {
   let password = bcrypt.hashSync(req.body.password, 10)
   req.app.locals.db
      .collection('users')
      .find({ email: req.body.email })
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err })
            : data.length > 0
               ? res.send({ error: true, mensaje: 'Por favor, revise las credenciales e inténtelo de nuevo', data: data })
               : req.app.locals.db
                  .collection('users')
                  .insertOne({ name: req.body.name, email: req.body.email, password: password, online: false }, (err1, data1) => {
                     err1
                        ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err1 })
                        : data1.insertedId === null
                           ? res.send({ error: true, mensaje: 'No se ha podido registrar al usuario ' + req.body.email + 'en la base de datos', data: data1})
                           : req.res.send({ error: false, mensaje: 'El usuario ' + req.body.email + ' ha sido registrado correctamente en la base de datos', data: data1 })
                  })
      })
})

module.exports = users