/*4. Crea una aplicación express con un index.js y un archivo .js aparte en el que tendrás una función saludarEnExpress() que devuelva un string. Importa este módulo en el index.js y crea una ruta para que cada
vez que se haga una petición get a esa ruta, se muestre el string que nos devuelve la función.*/

const saludarExpress = require('./archivo');
const express = require('express');

const app = express();
const port = (process.env.PORT || 3000);

app.get('/home', function (req, res) {
   res.send(saludarExpress())
});


app.listen(port, err => {
   err
      ? console.log('Error')
      : console.log('Funcionando en http://localhost:'+port)
})