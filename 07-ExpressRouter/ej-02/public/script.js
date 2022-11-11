
let menuElegido = ''
let hamburguesaElegida = ''
let bebidaElegida = ''
let patataElegida = ''


function mostrarMenus() {
   fetch('/menus')
      .then(res => res.json())
      .then(res => {
         let options = ''
         res.results.forEach(menu => {
            options +=
               `<option value="${menu.nombre}">${menu.nombre}&#160;&#160;&#160;${menu.precio}</option>`
         })
         
         document.getElementById('selection').innerHTML = `
         <select id="m-select" onchange="{(elegirHamburguesa()}" class="custom-select custom-select-lg mb-3" >${options}</select>`
      })
}

function mostrarHamburguesas() {

   fetch('/hamburguesas')
      .then(res => res.json())
      .then(res => {
         let html = ''
         res.results.forEach(hamburguesa => {
            html +=
               `<option value="${hamburguesa.nombre}">${hamburguesa.nombre}&#160;&#160;&#160;${hamburguesa.precio}</option>`
         })
         
         
         document.getElementById('selection').innerHTML = `
         <select class="custom-select custom-select-lg mb-3" required>${html}</select>`
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
         let html = ''
         res.data.forEach(hamburguesa => {
            html +=
               `<option value="${hamburguesa.nombre}">${hamburguesa.nombre}&#160;&#160;&#160;${hamburguesa.precio}</option>`
         })
         document.getElementById('selection').innerHTML = `
         <select onchange="mostrarBebida()" class="custom-select custom-select-lg mb-3" required>${html}</select>
         `
      })
} 


function mostrarBebidas() {
   fetch('/bebidas')
      .then(res => res.json())
      .then(res => {
         let html = ''
         res.results.forEach(bebida => {
            html +=
               `<option>${bebida.nombre}&#160;&#160;&#160;${bebida.precio}</option>`
         })
         document.getElementById('selection').innerHTML = `
         <select class="custom-select custom-select-lg mb-3" required>${html}</select>`
      })
}

function mostrarPatatas() {
   fetch('/patatas')
      .then(res => res.json())
      .then(res => {
         let html = ''
         res.results.forEach(patata => {
            html +=
               `<option>${patata.nombre}&#160;&#160;&#160;${patata.precio}</option>`
         })
         document.getElementById('selection').innerHTML = `
         <select class="custom-select custom-select-lg mb-3" required>${html}</select>`
      })
}