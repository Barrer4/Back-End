/*6. Crea un módulo en una carpeta llamada “funciones” que contenga una función que nos devuelve el factorial de un número que le llega por argumento. Después, en la raiz de nuestro proyecto, utiliza el número que devuelve esa función para enseñar el supervillano correspondiente del paquete npm “supervillains”. Llama a la función cuatro veces con un número aleatorio entre 1 y 5*/



let factorial = require('../funciones/factorial')
let supervillains = require('supervillains')

function randomNumber() {
   let randomNumber = parseInt(Math.random() * (5 - 1) + 1);
   return randomNumber;
}

for (let i = 0; i < 4; i++) {
   console.log(`Supervillain #${i+1}`);
   console.log(supervillains.all[factorial(randomNumber())]);
}




