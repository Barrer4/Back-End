const express = require('express');
const app = express();
const port = process.env.PORT || 3000


let almacen = require('./modules/almacen')
let cesta = []



app.get('/', (req, res) => {
   res.send(almacen)
})

app.get('/cesta', (req, res) => {
   if (cesta.length < 1) {
      res.send('No hay productos dentro de la cesta')
   } else {
      let html = ''
      cesta.forEach(producto => html += `<tr><td>${producto.nombre}</td> <td>${producto.stock}</td></tr>`)
      res.send(`<table><tr><th>Producto</th> <th>Stock</th></tr> <tr>${html}</tr></table>`)
   }
})

app.get('/checkout', (req,res) => {
   cesta.length > 0 
   ? (cesta = [], res.send('Compra procesada'))
   : res.send('No hay items en su cesta de la compra')
})

app.get('/:dpto', (req, res) => {
   let html = ''
   let index = almacen.findIndex((dpto) => dpto.departamento === req.params.dpto)
   if (index < 0) {
      res.send('El departamento no se encuentra en nuestra base de datos')
   } else {
      almacen[index].productos.forEach(producto => html += `<tr><td>${producto.nombre}</td> <td>${producto.precio}</td> <td>${producto.stock}</td></tr>`)
      res.send(`<table><tr><th>Producto</th> <th>Precio</th> <th>Stock</th></tr> <tr>${html}</tr></table>`)
   }
})

app.get('/:dpto/:producto/:stock', (req, res) => {
   let dpto = almacen.find((dpto) => dpto.departamento === req.params.dpto)
   let dptoIndex = almacen.findIndex((dpto) => dpto.departamento === req.params.dpto)

   if (dpto === undefined) {
      res.send('El departamento no se encuentra en nuestra base de datos')
   } else {
      let producto = dpto.productos.find(producto => producto.nombre === req.params.producto)
      let productoIndex = dpto.productos.findIndex(producto => producto.nombre === req.params.producto)

      if (producto === undefined) {
         res.send('El producto no se encuentra en nuestra base de datos')
      } else {
         if (producto.stock < req.params.stock) {
            res.send('Desafortunadamente no tenemos esa cantidad en stock. La cantidad máxima de compra es de: ' + producto.stock)
         } else {
            cesta.push({ nombre: producto.nombre, stock: req.params.stock })
            almacen[dptoIndex].productos[productoIndex].stock = almacen[dptoIndex].productos[productoIndex].stock - req.params.stock
            res.send(almacen[dptoIndex].productos[productoIndex])
         }
      }
   }
})

app.listen(port, err => {
   err
      ? console.error(Error)
      : console.log('Funcionando desde: http://localhost:' + port)
})

