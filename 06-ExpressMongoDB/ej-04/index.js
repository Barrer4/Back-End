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

app.get('/api/menus' , (req,res) => {
   app.locals.db
   .collection('menus')
   .find()
   .toArray((err,data) => {
      err
            ? res.send({ mensaje: 'Error: No se ha podido leer la información de la base de datos', results: err })
            : res.send({ mensaje: 'Los menús han sido publicados', results: data })
   })
})

app.post('/api/nuevoMenu', (req,res)=> {
 
       app.locals.db
      .collection('menus')
      .insertOne(req.body, (err, data) => {
         err
         ? res.send({ mensaje: 'Error: No se ha podido agregar la información de la base de datos', results: err })
         : res.send({agregado: data.insertedId, mensaje: data.numero +' ha sido añadido a los menús', data})
      })
    
   })


app.listen(port, err => {
   err
      ? console.error('🔴 Error: ' + err)
      : console.log('🟢 Funcionando en http://localhost:' + port)
})