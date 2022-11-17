const express = require('express')
const app = express()
const port = (process.env.PORT || 3000)
const mongoose = require('mongoose')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/cice', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(console.log('🟢 Mongoose se ha conectado'))
   .catch(err => console.log(('🔴 Mongoose no conectado. Error: ' + err)))

let Album = require('./schemas/Album')

app.get('/albums', (req, res) => {
   Album.find({}, (err, data) => {
      err
         ? res.send({ error: true, mensaje: 'No se ha podido consultar la base de datos', data: err })
         : res.send({ error: false, mensaje: 'Petición satisfecha', data: data })
   })
})

app.get('/album/:title', (req, res) => {
   Album.find(req.params.title, (err, data) => {
      err
         ? res.send({ error: true, mensaje: 'No se ha podido consultar la base de datos', data: err })
         : res.send({ error: false, mensaje: 'Petición satisfecha', data: data })
   })
})

app.post('/newAlbum', (req, res) => {
   let Album = new Album({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
   })
   Album.save((err, data) => {
      err
         ? res.send({ error: true, mensaje: 'No se ha podido grabar en la base de datos', data: err })
         : res.send({ error: false, mensaje: 'Álbum añadido a la base de datos', data: data })
   })
})

app.put('/modify', (req, res) => {
   Album.findOneAndUpdate({ title: req.body.title }, {
      $set: {
         artist: req.body.artist,
         year: req.body.year,
         genre: req.body.genre,
         stock: req.body.stock,
         format: req.body.format
      }
   }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: 'No se ha podido modificar el álbum en la base de datos', data: err })
         : res.send({ error: false, mensaje: 'Petición satisfecha', data: data })
   })
})

app.delete('/delete', (req, res) => {
   Album.deleteOne({ title: req.body.title }, (err, data) => {
      err
         ? res.send({ error: true, mensaje: 'No se ha podido eliminar el álbum de la base de datos', data: err })
         : res.send({ error: false, mensaje: 'Petición satisfecha', data: data })
   })
})


app.listen(port, err => {
   err
      ? console.error('🔴 Error: ' + err)
      : console.log('🟢 Funcionando en http://localhost:' + port)
})