const express = require('express')
const app = express();
const port = (process.env.PORT || 3000)

const MongoClient = require('mongodb').MongoClient

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
   .then(client => {
      console.log(`🟢 MongoDB se ha conectado`)
      app.locals.db = client.db("cice")
   })
   .catch(err => console.error(`🔴 MongoDB no conectado. Error: ${err}`))


app.get('/api/mesas', (req, res) => {
   app.locals.db
      .collection("mesas")
      .find()
      .toArray((err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido extraer la información de la base de datos', results: err })
            : res.send({ mensaje: 'Base de datos cargada correctamente', results: data })
      })
})


app.post('/api/anyadir', (req, res) => {
   app.locals.db
      .collection("mesas")
      .insertOne(req.body, (err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido añadir la información a la base de datos', data: err })
            : res.send({ mensaje: 'Mesa añadida correctamente', data })
      })
})


app.put('/api/modificar/:color', (req, res) => {
   app.locals.db
   .collection("mesas")
   .updateMany({ color: req.params.color }, { $set: { color: "azul" } }, (err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido modificar la información en la base de datos', data: err })
            : res.send({ mensaje:  data.modifiedCount > 0 ? 'El color de ' + data.modifiedCount + ' mesa(s) ha sido modificado' : 'No se han encontrado mesas para modificar', data })
      })
})


app.delete('/api/borrar/:patas', (req, res) => {
   app.locals.db
   .collection("mesas")
   .deleteMany({ patas: parseInt(req.params.patas) }, {multi: true}, (err, data) => {
         err
            ? res.send({ mensaje: 'Error: No se ha podido eliminar el objeto de la base de datos', data: err })
            : res.send({ mensaje: data.deletedCount > 0 ? data.deletedCount + ' mesa(s) eliminada(s)' : 'No se han encontrado mesas con esa cantidad de patas', data })
      })
})


app.listen(port, err => {
   err
      ? console.error('🔴 Error: ' + err)
      : console.log('🟢 Funcionando en http://localhost:' + port)
})


