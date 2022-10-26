/*7. Crea un módulo propio con un array de 10 ceros. Crea otro módulo con una función que devuelva un número aleatorio entre 0 y 9. Crea una ruta para que cada vez que se haga una petición de tipo get, se llame al método de número aleatorio y se sume 1 al valor del número en el índice del número aleatorio. Muestra el array con los valores en la respuesta.*/


const express = require('express');
const randomNum = require('./modules/randomNum');
const app = express();
const array = require('./modules/array')
const port = (process.env.PORT || 3000);




app.get('/sumar', function (req, res) {
   let indice = randomNum()
   array[indice] = array[indice] + 1
   console.log(array)
   res.send('<h1> Sumando 1 al índice ' + indice + ' => ' + array + ' </h1>')
})

app.listen(port, err => {
   err
      ? console.log('Error')
      : console.log('Funcionando en http://localhost:'+port)
})



module.exports = array;