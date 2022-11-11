const express = require('express')
const app = express()
const port = (process.env.PORT || 3000)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

const MongoClient = require('mongodb').MongoClient

let clientes = require('./routes/clientes')
let hab = require('./routes/habitaciones')
let reservas = require('./routes/reservas')


MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
.then(client => {
   console.log(`🟢 MongoDB se ha conectado`)
   app.locals.db = client.db('hotel')
})
.catch(err => console.error(`🔴 MongoDB no conectado. Error: ${err}`))


app.use('/clientes', clientes)
app.use('/habitaciones', hab)
app.use('/reservas', reservas)

app.listen(port, err => {
   err
      ? console.error('🔴 Error: ' + err)
      : console.log('🟢 Funcionando en http://localhost:' + port)
})