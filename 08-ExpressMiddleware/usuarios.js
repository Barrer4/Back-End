const express = require('express')
const usuarios = express.Router();
const bcrypt = require('bcrypt');

usuarios.get('/', (req, res) => {
   req.app.locals.db
      .collection('usuarios')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err })
            : res.send({ error: false, mensaje: 'Búsqueda satisfactoria' + req.body.dni, data: data })
      })
})

usuarios.post('/login', (req, res) => {
   req.app.locals.db
      .collection('usuarios')
      .find({ dni: req.body.dni })
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'Problemas con las credenciales', data: data })
               : bcrypt.compareSync(req.body.password, data[0].password)
                  ? res.send({ error: false, mensaje: 'Login exitoso', data: data })
                  : res.send({ error: true, mensaje: 'La contraseña indicada es incorrecta', data: data })
      })
})

usuarios.post('/registrar', (req, res) => {
   let password = bcrypt.hashSync(req.body.password, 10)
   req.app.locals.db
      .collection('usuarios')
      .find({ dni: req.body.dni })
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err })
            : data.length > 0
               ? res.send({ error: true, mensaje: 'Por favor, revise las credenciales e inténtelo de nuevo', data: data })
               : req.app.locals.db
                  .collection('usuarios')
                  .insertOne({ nombre: req.body.nombre, email: req.body.email, password: password, dni: req.body.dni, fecha: req.body.fecha, ciudad: req.body.ciudad, ads: req.body.ads }, (err1, data1) => {
                     err1
                        ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', err: err })
                        : data1.insertedId === null
                           ? res.send({ error: true, mensaje: 'No se ha podido registrar al usuario ' + req.body.dni + 'en la base de datos', data: data })
                           : req.res.send({ error: false, mensaje: 'El usuario ' + req.body.dni + ' ha sido registrado correctamente en la base de datos', data: data })
                  })
      })
})

usuarios.delete('/borrar', (req, res) => {
   req.app.locals.db
      .collection('usuarios')
      .find({ dni: req.body.dni })
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'Por favor, revise las credenciales e inténtelo de nuevo', data: data })
               : (bcrypt.compareSync(req.body.password, data[0].password) !== true)
                  ? res.send({ error: true, mensaje: 'Por favor, revise las credenciales e inténtelo de nuevo', data: data })
                  : req.app.locals.db
                     .collection('usuarios')
                     .deleteOne({ dni: req.body.dni }, (err1, data1) => {
                        err1
                           ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err1 })
                           : data1.deletedCount < 1
                              ? res.send({ error: true, mensaje: 'No se ha podido eliminar el usuario con dni: ' + req.body.dni, data: data })
                              : res.send({ error: false, mensaje: 'El usuario con dni: ' + req.body.dni + ' ha sido eliminado de la base de datos', data: data })
                     })

      })
})

usuarios.put('/modificar', (req, res) => {
   req.app.locals.db
      .collection('usuarios')
      .find({ dni: req.body.dni })
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err })
            : data.length < 1
               ? res.send({ error: true, mensaje: 'Por favor, revise las credenciales e inténtelo de nuevo', data: data })
               : (bcrypt.compareSync(req.body.password, data[0].password) !== true)
                  ? res.send({ error: true, mensaje: 'Por favor, revise las credenciales e inténtelo de nuevo', data: data })
                  : req.app.locals.db
                     .collection('usuarios')
                     .updateOne({ dni: req.body.dni }, { $set: { nombre: req.body.nombre, email: req.body.email, password: (bcrypt.hashSync(req.body.password2, 10)), fecha: req.body.fecha, ciudad: req.body.ciudad, ads: req.body.ads } }, (err1, data1) => {
                        err1
                           ? res.send({ error: true, mensaje: 'Error al conectar con la base de datos de usuarios', data: err1 })
                           : data1.modifiedCount < 1
                              ? res.send({ error: true, mensaje: 'No se ha podido modificar el usuario con dni: ' + req.body.dni, data: data })
                              : res.send({ error: false, mensaje: 'El usuario con dni: ' + req.body.dni + ' ha sido modificado en la base de datos', data: data })
                     })
      })
})
module.exports = usuarios




/*{...req.body, pass: (bcrypt.hashSync(req.body.password, 10)}*/