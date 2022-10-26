/*2. Crea una aplicación con una ruta a la que le puede llegar un parámetro en la url. Al hacer una petición get a esa ruta, el servidor devolverá como respuesta un número aleatorio entre 1 y el número que llega como parámetro.*/

const express = require('express');
const app = express();
const port = (process.env.port || 3000)


app.get('/numero/:number', function (req, res) {
   let numero = parseInt(req.params.number)
   let number = Math.floor(Math.random() * (numero - 1) + 1)

   res.send('El número aleatorio entre ' + numero + ' y 1 es: ' + number);
});


app.listen(port, err => {
   err
      ? console.log('Error')
      : console.log('Funcionando en http://localhost:'+port)
})