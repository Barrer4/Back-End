/*3. Escribe un módulo con una función que al recibir un string nos devuelva el número de caracteres que tiene.
Después impórtalo en tu “entry point” y utilízala para devolver la longitud de “En un lugar de la mancha de cuyo
nombre no quiero acordarme”*/

let txtLength = require('./function')

let txt =  'En un lugar de la mancha de cuyo nombre no quiero acordarme'
console.log(txtLength(txt))