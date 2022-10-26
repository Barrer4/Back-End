/*6. Declara un array con los nombres de l@s estudiantes del curso. Crea una aplicación en la que se puedan añadir elementos a ese array mediante el método get. Entonces agrega los nombres de los profesores.*/

const express = require('express');
const app = express();
const port = (process.env.PORT || 3000);

let array = [
   estudiantes = ['Vanesa', 'Manuel', 'Virginia', 'Olga', 'Cristina', 'Katia', 'Juan Carlos'],
   profesores = []
];

app.get('/estudiantes', function (req, res) {
   console.log(array[0])
   res.send(`<h1>Estudiantes: ${array[0]}`)
}
);

app.get('/profesores', function (req, res) {
   console.log(array[0])
   res.send(`<h1>Profesores: ${array[1]}`)
}
);

app.get('/estudiantes/:nombre', function (req, res) {
   let nombre = req.params.nombre
   array[0].push(nombre)
   console.log(array[0])
   res.send(`<h1>Estudiantes: ${array[0]}`)
}
);

app.get('/profesores/:nombre', function (req, res) {
   let nombre = req.params.nombre
   array[1].push(nombre)
   console.log(array[1])
   res.send(`<h1>Profesores: ${array[1]}`)
}
);

app.listen(port, err => {
   err
      ? console.log('Error')
      : console.log('Funcionando en http://localhost:'+port)
})