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
   .toArray( (err, data) => {
      err
      ? res.send({ mensaje: 'Error: ', results: err })
      : res.send({ mensaje: 'Ok: ', results: data })
   })
})

app.get('/api/series/:serie', (req, res) => {
   app.locals.db
   .collection('series')
   .find({titulo: req.params.serie})
   .toArray((err, data)=> {
      err
      ? res.send({ mensaje: 'Error: ', results: err })
      : res.send({ mensaje: req.params, results: data })
   })
})



app.post('/api/nuevaSerie', (req,res)=> {
   app.locals.db
   .collection('series')
   .insertOne(req.body, (err, data) => {
      err
      ? res.send({ mensaje: 'Error: ', results: err })
      : res.send({ mensaje: 'Serie almacenada en la base de datos', results: data })
   })
})


app.listen(port, err => {
   err
      ? console.error('Error: ' + err)
      : console.log('Funcionando en http://localhost:' + port)
})