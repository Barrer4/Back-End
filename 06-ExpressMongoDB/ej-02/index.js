const express = require('express')
const app = express()
const port = (process.env.PORT || 3000)

const MongoClient = require('mongodb').MongoClient

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))


MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .then(client => {
      console.log(`🟢 MongoDB se ha conectado`)
      app.locals.db = client.db("cice")
   })
   .catch(err => console.error(`🔴 MongoDB no conectado. Error: ${err}`))


app.get('/api/libros', (req, res) => {
   app.locals.db
      .collection("libros")
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido leer la información de la base de datos', results: err })
            : res.send({ mensaje: 'Ok ', results: data })
      })
})


app.get('/api/libros/:titulo', (req, res) => {
   app.locals.db
      .collection("libros")
      .find({ titulo: req.params.titulo })
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido leer la información de la base de datos', results: err })
            : res.send({ mensaje: 'El libro: ' + req.params.titulo + 'se encuentra en la base de datos', results: data })
      })
})


app.post('/api/nuevoLibro/:titulo', (req, res) => {
   app.locals.db
      .collection("libros")
      .find({ titulo: req.params.titulo })
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido encontrar el título en la base de datos', data: err })
            : res.send({
               mensaje: data.length > 0 ? req.params.titulo + ' ya se encuentra en la base de datos'
                  : app.locals.db
                     .collection("libros")
                     .insertOne({ titulo: req.params.titulo, estado: false }, (err, data) => {
                        err
                           ? res.send({ mensaje: 'Error: No se ha podido agregar la información a la base de datos', err })
                           : res.send({ mensaje: req.params.titulo + ' se ha añadido a la base de datos', data })
                     })
            })
      })
})


app.put('/api/editarLibro/:titulo', (req, res) => {
   app.locals.db
      .collection("libros")
      .find({ titulo: req.params.titulo })
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido encontrar el título en la base de datos', data: err })
            : data.length > 0
               ? app.locals.db
                  .collection("libros")
                  .updateOne({ titulo: req.params.titulo }, { $set: { estado: true } }, (err, data) => {
                     err
                        ? res.send({ mensaje: 'Error: No se ha podido modificar la base de datos', data: err })
                        : data.modifiedCount > 0
                           ? res.send({ modificado: data.modifiedCount > 0, mensaje: req.params.titulo + ' ha cambiado al estado leído', data })
                           : res.send({ mensaje: req.params.titulo + ' ya ha sido leído', data })
                  })
               : res.send({ mensaje: req.params.titulo + ' no se encuentra en la base de datos', data })
      })
})


app.delete('/api/borrarLibro/:titulo', (req, res) => {
   app.locals.db
      .collection("libros")
      .find({ titulo: req.params.titulo })
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido encontrar el título en la base de datos', data: err })
            : data.length > 0
               ? app.locals.db
                  .collection("libros")
                  .deleteOne({ titulo: req.params.titulo }, (err, data) => {
                     err
                        ? res.send({ mensaje: 'Error: ', data: err })
                        : res.send({ eliminado: data.deletedCount > 0, mensaje: 'Las patas han sido modificadas', data })
                  })
               : res.send({ mensaje: req.params.titulo + ' no se encuentra en la base de datos', data })
      })
   })


   app.listen(port, err => {
      err
         ? console.error('🔴 Error: ' + err)
         : console.log('🟢 Funcionando en http://localhost:' + port)
   })