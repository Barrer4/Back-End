mostrar()

function mostrar() {
   fetch('/api/menus')
      .then(res => res.json())
      .then(res => {
         let menus = ''
         res.results.forEach(menu => {
            menus +=
              ` <tr>
                  <td>${menu.numero}</td>
                  <td>${menu.primero}</td>
                  <td>${menu.segundo}</td>
                  <td>${menu.postre}</td>
                  <td>${menu.precio}</td>
                  <td>
                     <div class="d-grid gap-2">
                        <button type="button" class="btn btn-outline-dark" onclick="eliminar({numero: ${menu.numero}})">Borrar</button>
                     </div>
                  </td>
               </tr>`
         })
         document.getElementById('theBody').innerHTML =
            `  <table class="table">
           <thead>
              <tr>
                 <th scope="col">#</th>
                 <th scope="col">Primero</th>
                 <th scope="col">Segundo</th>
                 <th scope="col">Postre</th>
                 <th scope="col">€</th>
                 <th scope="col">Acción</th>
              </tr>
              <tbody>
                 ${menus}
           </tbody>
        </table>`
      })
}

function agregar() {
   let menu = {
      numero: parseInt(document.getElementById('numero').value),
      primero: document.getElementById('primero').value,
      segundo: document.getElementById('segundo').value,
      postre: document.getElementById('postre').value,
      precio: parseFloat(document.getElementById('precio').value),
   }
   if (menu.numero > 0 && menu.primero.length > 0) {
      fetch('/api/nuevoMenu', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', },
         body: JSON.stringify(menu)
      })
         .then(res => res.json())
         .then(res => {
            feedback(res.error, res.mensaje)
         })
   } else { document.getElementById('theFeedback').innerHTML = `<p style="color: red">Por favor rellene los campos</p>` }
}

function editar() {
   let menu = {
      numero: parseInt(document.getElementById('numero').value),
      primero: document.getElementById('primero').value,
      segundo: document.getElementById('segundo').value,
      postre: document.getElementById('postre').value,
      precio: parseFloat(document.getElementById('precio').value),
   }

   fetch('/api/editarMenu', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menu)
   })
      .then(res => res.json())
      .then(res => {
         feedback(res.error, res.mensaje)
      })
}

function eliminar(numero) {
   console.log(numero)
   fetch('/api/borrarMenu', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(numero)
   })
      .then(res => res.json())
      .then(res => {
         feedback(res.error, res.mensaje)
      })
}

function feedback(error, mensaje) {
   document.getElementById('theFeedback').innerHTML = `<p>${mensaje}</p>`
   error
      ? document.getElementById('theFeedback').style.color = 'red'
      : document.getElementById('theFeedback').style.color = 'green'
   mostrar()

   setTimeout(() => {
      document.getElementById('theFeedback').innerHTML = ''
      clean()
   }, 2000)
}

function clean() {
   document.getElementById('numero').value = ''
   document.getElementById('primero').value = ''
   document.getElementById('segundo').value = ''
   document.getElementById('postre').value = ''
   document.getElementById('precio').value = ''
}