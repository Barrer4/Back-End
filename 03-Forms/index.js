/* Crear una aplicación de servidor que tenga una lista de animales (un array con objetos) que tendrán nombre,
edad y tipo de animal. Cuando vayamos a la raíz (ruta '/’) el servidor devolverá el HTML de la lista de animales. */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.static('public'))

let animales = [
   { nombre: 'Wally', edad: 2, tipo: 'Ballena' },
   { nombre: 'Flipper', edad: 4, tipo: 'Delfín' },
   { nombre: 'Manny', edad: 5, tipo: 'Manatí' },
   { nombre: 'Bob', edad: 3, tipo: 'Morsa' },
   { nombre: 'Fred', edad: 7, tipo: 'Sapo' },
   { nombre: 'Sally', edad: 3, tipo: 'Salamandra' },
   { nombre: 'Hannah', edad: 1, tipo: 'Anaconda' },
   { nombre: 'Cool', edad: 1, tipo: 'Culebra' },
   { nombre: 'Tugui', edad: 2, tipo: 'Tortuga' },
   { nombre: 'Coco', edad: 4, tipo: 'Cocodrilo' },
]

app.get('/', (req, res) => {
   let html = ''
   animales.forEach(animal => html += `<tr><td><li>${animal.nombre}</td><td>${animal.edad}</td><td>${animal.tipo}</td> <form action='/adoptar'><td><button name='nombre' value=${animal.nombre} type="submit">Adoptar</button></form></li></td></tr>`)
   res.send(`<h2>Animales</h2> <ul> <table> <th>Nombre</th> <th>Edad</th> <th>Tipo</th></tr>${html}</ul>`)
})

app.get('/sumar-animal', (req, res) => {
   let html = ''
   animales.push({ nombre: `${req.query.nombre}`, edad: parseInt(req.query.edad), tipo: `${req.query.tipo}` })
   animales.forEach(animal => html += `<tr><td><li>${animal.nombre}</td><td>${animal.edad}</td><td>${animal.tipo}</td> <form action='/adoptar'><td><button name='nombre' value=${animal.nombre} type="submit">Adoptar</button></form></li></td></tr>`)
   res.send(`<h2>Animales</h2> <ul> <table> <th>WNombre</th> <th>Edad</th> <th>Tipo</th></tr>${html}</ul>`)
})


app.get('/dejar-animal', (req, res) => {
   res.send(`<!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Animales</title>
   </head>
   <body>
      <form action="/sumar-animal">
         <input type='text' placeholder='Nombre' name='nombre'/>
         <input type='text' placeholder='Edad' name='edad'/>
         <input type='text' placeholder='Tipo' name='tipo'/>
         <button type='submit'>Enviar</button>
      </form>
   </body>
   </html>`)
})


app.get('/adoptar', (req, res) => {
   let animal = animales.find((animal) => animal.nombre === req.query.nombre)
   let animalIndex = animales.findIndex((animal) => animal.nombre === req.query.nombre)

   if (animal === undefined) {
      res.send('Desafortunadamente, ' + animal + ' no se encuentra en nuestra base de datos')
   } else {
      animales.splice(animalIndex, 1)
      res.send('Gracias por darle un hogar a ' + animales[animalIndex].nombre)
   }
})


app.listen(port, err => {
   err
      ? console.error(Error)
      : console.log('Funcionando desde: http://localhost:' + port)
})




