const express = require('express')
const app = express()
const cors = require('cors')
const port = (process.env.PORT || 3000)


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

const corsOptions = {
   origin: 'www.midominio.es'
}

app.use(cors(corsOptions))
const MongoClient = require('mongodb').MongoClient

let usuarios = require('./usuarios')

MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
.then(client => {
   console.log(`🟢 MongoDB se ha conectado`)
   app.locals.db = client.db('cice')
})
.catch(err => console.error(`🔴 MongoDB no conectado. Error: ${err}`))



app.use('/usuarios', usuarios)



app.listen(port, err => {
   err
      ? console.error('🔴 Error: ' + err)
      : console.log('🟢 Funcionando en http://localhost:' + port)
})