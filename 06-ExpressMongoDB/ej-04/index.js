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

app.get('/api/menus', (req, res) => {
   app.locals.db
      .collection('menus')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error de conexión con la base de datos', results: err })
            : res.send({ error: false, mensaje: 'Los menús han sido publicados', results: data })
      })
})

app.post('/api/nuevoMenu', (req, res) => {
   app.locals.db
      .collection('menus')
      .find({ numero: parseInt(req.body.numero) })
      .toArray((err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error de conexión con la base de datos', data: err })
            : data.length > 0
               ? res.send({ error: true, mensaje: 'El menú ' + req.body.numero + ' ya se encuentra registrado en la base de datos', data: data })
               : app.locals.db
                  .collection('menus')
                  .insertOne({ numero: parseInt(req.body.numero), primero: req.body.primero, segundo: req.body.segundo, postre: req.body.postre, precio: parseFloat(req.body.precio) }, (err1, data1) => {
                     err
                        ? res.send({ error: true, mensaje: 'Error de conexión con la base de datos', data: err1 })
                        : res.send({ error: false, mensaje: 'El menú ' + req.body.numero + ' ha sido agregado a la base de datos', data: data1 })
                  })
      })
})

app.put('/api/editarMenu', (req, res) => {
   app.locals.db
      .collection('menus')
      .updateOne({ numero: parseInt(req.body.numero) }, { $set: req.body }, (err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error de conexión con la base de datos', data: err })
            : data.matchedCount < 1
               ? res.send({ error: true, mensaje: 'El menú ' + req.body.numero + ' no se encuentra en la base de datos', data: data })
               : data.modifiedCount < 1
                  ? res.send({ error: true, mensaje: 'El menú ' + req.body.numero + ' no ha podido ser modificado', data: data })
                  : res.send({ error: false, mensaje: req.body.numero + ' ha sido modificado en la base de datos', data: data })
      })
})

app.delete('/api/borrarMenu', (req, res) => {
   app.locals.db
      .collection('menus')
      .deleteOne({ numero: parseInt(req.body.numero) }, (err, data) => {
         err
            ? res.send({ error: true, mensaje: 'Error de conexión con la base de datos', data: err })
            : data.deletedCount < 1
               ? res.send({ error: true, mensaje: 'El menú ' + req.body.numero + ' no ha podido ser eliminado', data: data })
               : res.send({ error: false, mensaje: req.body.numero + ' ha sido eliminado de la base de datos', data: data })
      })
   })

app.listen(port, err => {
   err
      ? console.error('Error: ' + err)
      : console.log('Funcionando en http://localhost:' + port)
})