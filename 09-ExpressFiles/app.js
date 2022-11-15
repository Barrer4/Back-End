const express = require('express')
const app = express()
const fileupload = require('express-fileupload')
const port = (process.env.PORT || 3000)
const MongoClient = require('mongodb').MongoClient
const fs = require('fs').promises
let users = require('./users')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(fileupload({createParentPath: true, safeFileNames: true}))

app.use('/users', users)


MongoClient.connect('mongodb://127.0.0.1:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})
.then(client => {
   console.log(`🟢 MongoDB se ha conectado`)
   app.locals.db = client.db('cice')
})
.catch(err => console.error(`🔴 MongoDB no conectado. Error: ${err}`))

app.post('/upload', (req, res)=> {
   let now = ((new Date()).toISOString()).replaceAll(':','_').replaceAll('.','_').replaceAll('-','_')
   if(!req.files){
      res.send({error: true, mensaje: 'No hay archivos adjuntos', data: {}})
   }else{
      let filename = (now + '_' + req.files.file.name.substring(0, req.files.file.name.length-3) + '.' + req.files.file.name.substring(req.files.file.name.length -3))
      req.files.file.mv('./public/pics/' + filename)
      res.send({error: false, mensaje: 'Archivos adjuntados', data: {name: filename, md5: req.files.file.md5 , size: req.files.file.size}})
   }
})

app.put('/download',(req,res) => {
   res.send(req.body.file)
   res.download('./public/pics/' + req.body.file)
})

app.delete('/delete', (req, res) => {
  fs.unlink('./public/pics/' + req.body.file).then(
   app.locals.db
   .collection('users')
   .updateOne({email: req.body.email},{ $pull: {files: req.body.filename}},
      (err, data) => {
         err => {
            err
            ? res.send({error: true, mensaje: 'No se ha podido eliminar ' + req.body.file, data:{}})
            : res.send({error: false, mensaje: req.body.file +' ha sido eliminado de la base de datos', data:{}})
      }}))
  })

app.listen(port, err => {
   err
      ? console.error('🔴 Error: ' + err)
      : console.log('🟢 Funcionando en http://localhost:' + port)
})