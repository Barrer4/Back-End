/* 5. Crea un módulo con el siguiente objeto:
let objeto = {
favoritos : [1,3,5],
paises: {
a: ["albania", "andorra"],
b: ["bélgica", "brasil"],
c: ["canadá", "cuba"]
},
nombre: "Antonio",
}

Después, importa el módulo desde tu “entry point” y enseña los países favoritos Antonio ( entendiendo que todos los países se pueden concatenar en un solo array)*/


let objeto = require('./objeto')
let object = objeto.paises.a.concat(objeto.paises.b, objeto.paises.c)

console.log('Los países favoritos de Antonio son:')
for (let i = 0; i < objeto.favoritos.length; i++) {
   console.log(object[objeto.favoritos[i]]);
}


