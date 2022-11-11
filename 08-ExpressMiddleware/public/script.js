function registrar() {
   document.getElementById('container').innerHTML =
      `
      <form>
         <div class="form-group">
            <input type="text" class="form-control form-control-sm" id="nombre" aria-describedby="emailHelp" placeholder="Nombre">
         </div>

         <div class="form-group">
            <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Email">
         </div>

         <div class="form-group">
            <input type="password" class="form-control form-control-sm" id="password" placeholder="Contraseña">
         </div>

         <div class="form-group">
            <input type="text" class="form-control form-control-sm" id="dni" aria-describedby="emailHelp" placeholder="DNI">
         </div>

         <div class="form-group">
            <label for="fecha">Fecha de nacimiento</label>
            <input type="date" class="form-control form-control-sm" id="fecha" aria-describedby="emailHelp"
               placeholder="Fecha de nacimiento">
         </div>

         <div class="form-group">
            <input type="text" class="form-control form-control-sm" id="ciudad" aria-describedby="emailHelp" placeholder="Ciudad">
         </div>

         <div class="form-check">
            <input id="ads" type="checkbox" class="form-check-input" id="checkbox">
            <label class="form-check-label" for="checkbox">Acepto las políticas de publicidad</label>
         </div>
         </br>
         <button type="button" class="btn btn-block" onclick="registrarUsuario()">Registrar</button>
      </form>

      <div id="feedback"></div>`
}


function borrar() {
   document.getElementById('container').innerHTML =
      `
      <form>
         <div class="form-group">
            <input type="text" class="form-control form-control-sm" id="dni" aria-describedby="emailHelp" placeholder="DNI" />
         </div>

         <div class="form-group">
            <input type="password" class="form-control form-control-sm" id="password" placeholder="Contraseña" />
         </div>
      
         <button type="button" class="btn btn-block" onclick="borrarUsuario()">Borrar</button>
      </form>
      <div id="feedback"></div>
      `
}


function pedir() {
   document.getElementById('container').innerHTML =
      ` <form>
   <div class="form-group">
      <input type="text" class="form-control form-control-sm" id="dni" aria-describedby="emailHelp" placeholder="DNI" />
   </div>

   <div class="form-group">
      <input type="password" class="form-control form-control-sm" id="password" placeholder="Contraseña" />
   </div>
  
   <button type="button" class="btn btn-block" onclick="pedirUsuario()">Ver datos</button>

   </br>
   <h3>Datos:</h3>
   </br>
   <form>
      <div class="form-group">
         <input type="text" class="form-control form-control-sm" id="nombre" aria-describedby="emailHelp" placeholder="Nombre">
      </div>

      <div class="form-group">
         <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Email">
      </div>

      <div class="form-group">
         <label for="fecha">Fecha de nacimiento</label>
         <input type="date" class="form-control form-control-sm" id="fecha" aria-describedby="emailHelp"
            placeholder="Fecha de nacimiento">
      </div>

      <div class="form-group">
         <input type="text" class="form-control form-control-sm" id="ciudad" aria-describedby="emailHelp" placeholder="Ciudad">
      </div>

      <div class="form-check">
      <input id="ads" type="checkbox" class="form-check-input" id="checkbox" disabled>
      <label class="form-check-label" for="checkbox" >Acepto las políticas de publicidad</label>
      </div>
   </form>

   <div id="feedback"></div>`
}


function modificar() {
   document.getElementById('container').innerHTML =
      ` <form>
   <div class="form-group">
      <input type="text" class="form-control form-control-sm" id="dni" aria-describedby="emailHelp" placeholder="DNI" />
   </div>

   <div class="form-group">
      <input type="password" class="form-control form-control-sm" id="password" placeholder="Contraseña" />
   </div>
  
   <button type="button" class="btn btn-block" onclick="pedirUsuario()">Ver datos</button>

   </br>
   <h3>Datos:</h3>
   <small id="emailHelp" class="form-text text-muted">Llene únicamente los campos que desea modificar.</small>
   </br>
   <form>
      <div class="form-group">
         <input type="text" class="form-control form-control-sm" id="nombre" aria-describedby="emailHelp" placeholder="Nombre">
      </div>

      <div class="form-group">
         <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Email">
      </div>

      <div class="form-group">
         <input type="password" class="form-control form-control-sm" id="password2" placeholder="Contraseña">
      </div>

      <div class="form-group">
         <label for="fecha">Fecha de nacimiento</label>
         <input type="date" class="form-control form-control-sm" id="fecha" aria-describedby="emailHelp"
            placeholder="Fecha de nacimiento">
      </div>

      <div class="form-group">
         <input type="text" class="form-control form-control-sm" id="ciudad" aria-describedby="emailHelp" placeholder="Ciudad">
      </div>

      <div class="form-check">
      <input id="ads" type="checkbox" class="form-check-input" id="checkbox">
      <label class="form-check-label" for="checkbox" >Acepto las políticas de publicidad</label>
      </div>

      </br>
      <button type="button" class="btn btn-block" onclick="modificarUsuario()">Modificar</button>
      </form>

      <div id="feedback"></div>`
}

function formCheck(usuario) {
   if (usuario && usuario.nombre.length > 0 && usuario.email.length > 0 && usuario.password.length > 0 && usuario.dni.length > 0 && usuario.fecha.length > 0 && usuario.ciudad.length > 0) {
      return true
   } else {
      setTimeout(() => {
         document.getElementById('feedback').innerHTML = `Por favor, rellene todos los campos antes de enviar el formulario`
      }, 2000)
   }
}

function registrarUsuario() {
   let usuario = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      dni: document.getElementById('dni').value,
      fecha: document.getElementById('fecha').value,
      ciudad: document.getElementById('ciudad').value,
      ads: document.getElementById('ads').checked
   }

   if (formCheck(usuario) === true) {
      fetch('usuarios/registrar', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Origin': 'www.midominio.es'
         },
         body: JSON.stringify(usuario)
      })
         .then(res => res.json())
         .then(res => {
            document.getElementById('feedback').innerHTML = `<p>${res.mensaje}</p>`
            res.error
               ? document.getElementById('feedback').style.color = 'red'
               : document.getElementById('feedback').style.color = 'green'

            setTimeout(() => {
               document.getElementById('feedback').innerHTML = ''
            }, 2000)
         })
   } else {
      document.getElementById('feedback').innerHTML = `Por favor rellene todos los campos`
      document.getElementById('feedback').style.color = 'red'

      setTimeout(() => {
         document.getElementById('feedback').innerHTML = ''
      }, 2000)
   }
}

function pedirUsuario() {
   let usuario = {
      dni: document.getElementById('dni').value,
      password: document.getElementById('password').value
   }

   fetch('usuarios/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Origin': 'www.midominio.es'
      },
      body: JSON.stringify(usuario)
   })
      .then(res => res.json())
      .then(res => {

         document.getElementById('feedback').innerHTML = `<p>${res.mensaje}</p>`
         res.error
            ? document.getElementById('feedback').style.color = 'red'
            : (document.getElementById('feedback').style.color = 'green',

               document.getElementById('nombre').value = res.data[0].nombre,
               document.getElementById('email').value = res.data[0].email,
               document.getElementById('dni').value = res.data[0].dni,
               document.getElementById('fecha').value = res.data[0].fecha,
               document.getElementById('ciudad').value = res.data[0].ciudad,
               document.getElementById('ads').checked = res.data[0].ads)

         setTimeout(() => {
            document.getElementById('feedback').innerHTML = ''
         }, 5000)
      })
}


function borrarUsuario() {
   let usuario = {
      dni: document.getElementById('dni').value,
      password: document.getElementById('password').value
   }

   fetch('usuarios/borrar', {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Origin': 'www.midominio.es'
      },
      body: JSON.stringify(usuario)
   })
      .then(res => res.json())
      .then(res => {
         document.getElementById('feedback').innerHTML = `<p>${res.mensaje}</p>`
         res.error
            ? document.getElementById('feedback').style.color = 'red'
            : document.getElementById('feedback').style.color = 'green'

         setTimeout(() => {
            document.getElementById('feedback').innerHTML = ''
         }, 2000)
      })
}

function modificarUsuario() {
   console.log('inicio')
   let usuario = {
      dni: document.getElementById('dni').value,
      password: document.getElementById('password').value,
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      password2: document.getElementById('password2').value.length < 1
         ? document.getElementById('password').value
         : document.getElementById('password2').value,
      fecha: document.getElementById('fecha').value,
      ciudad: document.getElementById('ciudad').value,
      ads: document.getElementById('ads').checked 
   }

   fetch('usuarios/modificar', {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Origin': 'www.midominio.es'
      },
      body: JSON.stringify(usuario)
   })
      .then(res => res.json())
      .then(res => {
         document.getElementById('feedback').innerHTML = `<p>${res.mensaje}</p>`
         res.error
            ? document.getElementById('feedback').style.color = 'red'
            : document.getElementById('feedback').style.color = 'green'

         setTimeout(() => {
            document.getElementById('feedback').innerHTML = ''
         }, 2000)
      })
}