function signIn() {
   document.getElementById('container').innerHTML =
      `
      <form>
         <div class="form-group">
            <input type="text" class="form-control form-control-sm" id="name" aria-describedby="emailHelp" placeholder="Name">
         </div>

         <div class="form-group">
            <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Email">
         </div>

         <div class="form-group">
            <input type="password" class="form-control form-control-sm" id="password" placeholder="Password">
         </div>

         </br>
         <button type="button" class="btn btn-block" onclick="signInUser()">Sign In</button>
      </form>

      <div id="feedback"></div>`
}


function signInUser() {
   let user = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
   }

   if (formCheck(user) === true) {
      fetch('/users/signIn', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(user)
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


function logIn() {
   document.getElementById('container').innerHTML =
      `      <form>
         <div class="form-group">
            <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Email" />
         </div>

         <div class="form-group">
            <input type="password" class="form-control form-control-sm" id="password" placeholder="Password" />
         </div>
         </br>
         <button type="button" class="btn btn-block" onclick="logInUser()">Log In</button>
      </form>
      
      <div id="feedback"></div>`
}

function logInUser() {
   let user = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
   }

   fetch('users/logIn', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
   })
      .then(res => res.json())
      .then(res => {

         document.getElementById('feedback').innerHTML = `<p>${res.mensaje}</p>`
         res.error
            ? document.getElementById('feedback').style.color = 'red'
            : (document.getElementById('feedback').style.color = 'green',

               document.getElementById('container').innerHTML = `<p>Login exitoso</p>`,
               console.log(res.data.online),
               uploads(res.data[0].online)
            )
         setTimeout(() => {
            document.getElementById('feedback').innerHTML = ''
         }, 5000)
      })
}

function uploads(online) {
   if (online) {
      document.getElementById('container').innerHTML =

         `
         <form class="was-validated">
         <div class="mb-3">
         <label for="formFile" class="form-label">Default file input example</label>
         <input class="form-control" type="file" id="formFile">
       </div>
         </form>
       `
   } else {
      document.getElementById('container').innerHTML =
      `  <p>Please login to upload pics</p>`
   }
}



function formCheck(user) {
   if (user && user.name.length > 0 && user.email.length > 0 && user.password.length > 0) {
      return true
   } else {
      setTimeout(() => {
         document.getElementById('feedback').innerHTML = `Por favor, rellene todos los campos antes de enviar el formulario`
      }, 2000)
   }
}

