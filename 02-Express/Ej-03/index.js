/*3. Crea un array de 5 nombres. Define dos rutas: una será del tipo “/persona” y la otra será /persona/:parámetro. Al entrar a la primera ruta nos devolverá la lista de personas y al entrar a la segunda nos devolverá la persona solicitada.*/

const express = require('express');
const app = express();
const port = (process.env.PORT || 3000)

const array = ['Mario', 'Juana', 'Valeria', 'Ricardo', 'Pedro']

app.get('/persona', function (req, res) {
   let lista = ''
   array.forEach((persona, i) => {lista += `<li key=${i}>${persona}</li>`})
   console.log(lista)
   res.send(`<ul>${lista}</ul>`)
})

app.get('/persona/:nombre', function (req, res) {
   array.includes(req.params.nombre)
      ? res.send(req.params.nombre)
      : res.send(req.params.nombre + ' no se encuentra en la base de datos')

      /*Opcion recomendada:
      array.forEach((nombre, i) => {
         array === req.params.nombre
         ? res.send(array[1])
         : res.send('No hemos encontrado al usuario en la base de datos')
      })*/
})


app.listen(port, err => {
   err
      ? console.log('Error')
      : console.log('Funcionando en http://localhost:'+port)
})