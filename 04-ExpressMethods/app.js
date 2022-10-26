/* 1. Crea un array de personas. Cada objeto “persona” tendrá nombre, apellido y edad. Crea una página HTML que
haga un fetch al servidor. En el servidor crea una ruta que reciba una petición GET que devuelve el array de
personas. Muestra el contenido del array en el HTML.
2. Crea una ruta POST que reciba una petición con un objeto persona con nombre, apellido y edad. Añade ese objeto al array de personas.
3. Crea una ruta PUT que reciba un objeto persona con nombre, apellido y edad. Dentro del array personas, modifica el objeto que tenga el nombre que recibimos en la petición.
4. Crea una ruta DELETE que reciba un nombre de persona. Borra el objeto persona del array que tenga el nombre que recibimos en la petición. */


const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


let personas = require('./personas')


app.get('/personas', (req, res) => {
   res.send(personas)
})

app.post('/agregar', (req, res) => {
   let persona = req.body
   personas.push(persona)
   console.log(personas)
   res.send({ mensaje: 'Persona añadida correctamente', status: 200 })
})

app.put('/modificar', (req, res) => {
   let index = personas.findIndex(persona => persona.nombre === req.body.persona.nombre)
   if (index < 0) {
      res.send({ mensaje: req.body.persona.nombre +' no se encuentra en la base de datos' })
   } else { 
      personas[index] = req.body.persona
      res.send({ mensaje: 'Los datos de '+ req.body.persona.nombre +' han sido modificados correctamente', status: 200 }) }
})

app.delete('/eliminar', (req, res) => {
   let index = personas.findIndex(persona => persona.nombre === req.body.persona.nombre)
   if (index < 0) {
      res.send({ mensaje: req.body.persona.nombre +' no se encuentra en la base de datos' })
   } else { 
      personas.splice(index, 1)
      res.send({ mensaje: 'Persona eliminada correctamente', status: 200 }) }
})

app.listen(port, err => {
   err
      ? console.error(Error)
      : console.log('Funcionando desde: http://localhost:' + port)
})