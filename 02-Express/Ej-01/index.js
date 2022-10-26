/*1. Crea una aplicación express con una llamada de tipo get que devuelve el siguiente HTML: <h1>Hola Mundo</h1><br><h2>desde express</h2>*/

const express = require('express');
const app = express();
const port = (process.env.PORT || 3000);

app.get('/', function (req, res) {
   res.send('<h1>Hola Mundo</h1><br><h2>desde express</h2>')
})


app.listen(port, err => {
   err
      ? console.log('Error')
      : console.log('Funcionando en http://localhost:'+port)
})