const express = require('express')
const app = express()
const port = (process.env.PORT || 3000)

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
.then(client => {
   console.log(`🟢 MongoDB se ha conectado`)
   app.locals.db = client.db('mongodonald')
})
.catch(err => console.error(`🔴 MongoDB no conectado. Error: ${err}`))


let menus = require('./routes/menus')
let hamburguesas = require('./routes/hamburguesas')
let bebidas = require('./routes/bebidas')
let patatas = require('./routes/patatas')



app.use('/menus', menus)
app.use('/hamburguesas', hamburguesas)
app.use('/bebidas', bebidas)
app.use('/patatas', patatas)


app.listen(port, err => {
   err
   ? console.error('🔴 Error: ' + err)
   : console.log('🟢 Funcionando en http://localhost:' + port)
})