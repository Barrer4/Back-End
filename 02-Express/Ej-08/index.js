/*8. Con los dos módulos del ejercicio anterior, crea una aplicación en la que hacer peticiones de tipo get a la que le añadas /borrar/:numero para borrar el número (ponerlo a cero) del índice pasado por parámetro indicado (si
es que existe).*/

const express = require('express');
const app = express();
const port = (process.env.PORT || 3000);
const array = require('./modules/array')
const randomNum = require('./modules/randomNum');


app.get('/sumar', function (req, res) {
   let indice = randomNum()
   array[indice] = array[indice] + 1
   console.log(array)
   res.send('<h1> Sumando 1 al índice ' + indice + ' => ' + array + ' </h1>')
})

app.get('/borrar/:numero', function (req, res) {
   let indice = req.params.numero
   indice >= 0 && indice <= 9
   console.log(indice)
   console.log(array[indice] = 0)
   res.send('<h1> Reiniciando índice ' + indice + ' => ' + array + ' </h1>')
})

app.listen(port, err => {
   err
      ? console.log('Error')
      : console.log('Funcionando en http://localhost:'+port)
})