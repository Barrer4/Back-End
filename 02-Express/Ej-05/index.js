/*5. Define un objeto con las siguientes propiedades: nombre, apellidos y edad. El objeto estará fuera de las rutas para que sea accesible por todas ellas. Crea una aplicación en la que se pueda modificar cualquiera de las propiedades de ese objeto utilizando peticiones de tipo get. Crea una ruta para cambiar el nombre, otra ruta
para el apellido y otra ruta para la edad.*/

const express = require('express');
const app = express();
const port = (process.env.PORT || 3000);

let objeto = { nombre: '', apellido: '', edad: 0 }

app.get('/', function(req, res) {
   res.send(objeto)
})

app.get('/nombre/:name', function (req, res) {
   let nombre = req.params.name
   objeto.nombre = nombre
   res.send(`<a href="http://localhost:${port}">Ir a Inicio</a>`)
})

app.get('/apellido/:surname', function (req, res) {
   objeto.apellido = req.params.surname
   res.send(`<a href='http://localhost:${port}">Ir a Inicio</a>`)
})

app.get('/edad/:age', function (req, res) {
   objeto.edad = parseInt(req.params.age)
   res.send(`<a href="http://localhost:${port}">Ir a Inicio</a>`)
})


app.listen(port, err => {
   err
      ? console.log('Error')
      : console.log('Funcionando en http://localhost:'+port)
})