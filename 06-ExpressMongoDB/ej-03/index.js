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

app.get('/api/series', (req, res) => {
   app.locals.db
      .collection('series')
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido leer la base de datos', results: err })
            : res.send({ mensaje: 'Las series disponibles han sido presentadas', results: data })
      })
})

app.get('/api/series/:titulo', (req, res) => {
   console.log(req.query.titulo)
   app.locals.db
      .collection('series')
      .find({ titulo: req.query.titulo })
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido leer la base de datos', results: err })
            : data.length > 0
               ? res.send({ mensaje: req.query.titulo, results: data })
               : res.send({ mensaje: req.query.titulo + ' no se encuentra en la base de datos' })
      })
})

app.post('/api/nuevaSerie', (req, res) => {
   app.locals.db
      .collection('series')
      .find({ titulo: req.body.titulo })
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido leer la base de datos', data: err })
            : data.length > 0
               ? res.send({ mensaje: req.body.titulo + ' ya se encuentra en la base de datos', data: data })
               : app.locals.db
                  .collection('series')
                  .insertOne({...req.body, nota: parseInt(req.body.nota)}, (err, data) => {
                     err
                        ? res.send({ mensaje: 'Error: ', data: err })
                        : res.send({ mensaje: req.body.titulo + ' ha sido almacenada en la base de datos', data: data })
                  })
      })

})

app.listen(port, err => {
   err
      ? console.error('Error: ' + err)
      : console.log('Funcionando en http://localhost:' + port)
})