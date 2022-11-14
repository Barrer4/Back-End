
let menuElegido = ''
let hamburguesaElegida = ''
let bebidaElegida = ''
let patataElegida = ''


function mostrarMenus() {
   fetch('/menus')
      .then(res => res.json())
      .then(res => {
         let options = ''
         res.results.forEach(producto => {
            options +=
               `<option "value="${producto.menu}"><td>${producto.menu}</option>`
         })
         
         document.getElementById('selection').innerHTML = `
         <select id="m-select" onchange="(menuElegido = document.getElementById('m-select').value), mostrarBebidas()" class="custom-select custom-select-lg mb-3" ><option>Select your menu</option>${options}/select>`        
      })     
}

function mostrarHamburguesas() {
   fetch('/hamburguesas')
      .then(res => res.json())
      .then(res => {
         let options = ''
         res.results.forEach(producto => {
            options +=
               `<option value="${producto.hamburguesa}">${producto.hamburguesa}</option>`
         })
         document.getElementById('selection').innerHTML = `
         <select class="custom-select custom-select-lg mb-3" required><option>Select your burger</option>${options}</select>`
      })
}

function elegirHamburguesa(hamburguesa) {
   fetch('/hamburguesas/elegirHamburguesa',  {method: "POST",
   headers: {
      "Content-Type": "application/json"
   },
   body: JSON.stringify(hamburguesa)
})
      .then(res => res.json())
      .then(res => {
         let options = ''
         res.data.forEach(producto => {
            options +=
               `<option value="${producto.hamburguesa}">${producto.hamburguesa}&#160;&#160;&#160;${producto.precio}</option>`
         })
         document.getElementById('selection').innerHTML = `
         <select onchange="mostrarBebida()" class="custom-select custom-select-lg mb-3" required>${options}</select>
         `
      })
} 

function mostrarBebidas() {
   console.log(menuElegido)
   fetch('/bebidas')
      .then(res => res.json())
      .then(res => {
         let options = ''
         res.results.forEach(producto => {
            options +=
               `<option>${producto.bebida}</option>`
         })
         document.getElementById('selection').innerHTML = `
         <select id="b-select" onchange="(bebidaElegida = document.getElementById('b-select').value), mostrarPatatas()" class="custom-select custom-select-lg mb-3" required><option>Select your beverage</option>${options}</select>`
      })
}

function mostrarPatatas() {
   console.log(bebidaElegida)
   fetch('/patatas')
      .then(res => res.json())
      .then(res => {
         let options = ''
         res.results.forEach(producto => {
            options +=
               `<option>${producto.patata}</option>`
         })
         document.getElementById('selection').innerHTML = `
         <select id="p-select" onchange="(patataElegida = document.getElementById('p-select').value), mostrarCompra()" class="custom-select custom-select-lg mb-3" required><option>Select your fries</option>${options}</select>`
      })
}

function mostrarCompra() {
   let compra = {
      menu: menuElegido,
      hamburguesa: hamburguesaElegida === undefined ? menuElegido : hamburguesaElegida,
      bebida: bebidaElegida,
      patata: patataElegida
   }
   fetch('/menus/elegirMenu',  {method: "POST",
   headers: {
      "Content-Type": "application/json"
   },
   body: JSON.stringify(compra)})
   .then(res => res.json())
   .then(res => {
      let productos = ''
      res.data.forEach(producto => {
        productos += `<tr><td>${producto.precio}</td></tr>`
        console.log(productos)
      })
      document.getElementById('selection').innerHTML = ` <table>
      ${productos}
    </table>`
   })
 
}