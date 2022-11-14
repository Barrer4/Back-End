function start() {
   document.getElementById('clientes').innerHTML = ""
   document.getElementById('habitaciones').innerHTML = ""
   document.getElementById('reservas').innerHTML = ""
}

function agregarCliente() {
   let cliente = {
      nombre: document.getElementById('c-nombre').value,
      apellido: document.getElementById('c-apellido').value,
      dni: document.getElementById('c-dni').value
   }

   fetch('clientes/nuevoCliente', {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
   })
      .then(res => res.json())
      .then(res => {
         feedback(res.mensaje, res.error)
         mostrarClientes()
      })
}

function mostrarClientes() {
   document.getElementById('forms').innerHTML = ""
   document.getElementById('habitaciones').innerHTML = ""
   document.getElementById('reservas').innerHTML = ""
   fetch('/clientes/')
      .then(res => res.json())
      .then(res => {
         let html = ''
         res.results.forEach(cliente => {
            html +=
               `<tr><td>${cliente.nombre}</td><td>${cliente.apellido}</td><td>${cliente.dni}</td></tr>`
         })
         document.getElementById('clientes').innerHTML =

            `<table style="margin: auto; width: 50%; justify-content=center" class="table table-light table-striped"><tr><th>Nombre</th><th>Apellido</th><th>DNI</th></tr>${html}</table></br>
            </br>
            <div id="container">
            <h4>Gestión de clientes:</h4>
            <form style="margin: 20px;">
               <div id="frm-container" class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <input id="c-nombre" type="text" placeholder="Nombre" />
                  <input id="c-apellido" type="text" placeholder="Apellido" />
                  <input id="c-dni" type="text" placeholder="DNI" />
               </div>
               <div id="btn-container" class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button type="button" class="btn btn-sm btn-outline-dark" onclick="agregarCliente()">Añadir</button>
                  <button type="button" class="btn btn-sm btn-outline-dark" onclick="editarCliente()">Editar</button>
               </div>
            </form>
         </div>
         `
      })
}

function editarCliente() {
   let cliente = {
      nombre: document.getElementById('c-nombre').value,
      apellido: document.getElementById('c-apellido').value,
      dni: document.getElementById('c-dni').value
   }

   fetch('clientes/editarCliente', {
      method: "PUT",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
   })
      .then(res => res.json())
      .then(res => {
        feedback(res.mensaje, res.error)
        mostrarClientes()
      })
}

function agregarHabitacion() {
   let habitacion = {
      habitacion: document.getElementById('habitacion').value,
      disponible: document.getElementById('disponible').value,
   }

   fetch('habitaciones/nuevaHab', {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(habitacion)
   })
      .then(res => res.json())
      .then(res => {
         feedback(res.mensaje, res.error)
         mostrarHabitaciones()
      })
}

function mostrarHabitaciones() {
   document.getElementById('forms').innerHTML = ""
   document.getElementById('clientes').innerHTML = ""
   document.getElementById('reservas').innerHTML = ""
   fetch('/habitaciones/')
      .then(res => res.json())
      .then(res => {
         let html = ''
         res.results.forEach(habitacion => {
            html +=
               `<tr><td>${habitacion.habitacion}</td><td>${habitacion.disponible ? "🟢" : "🔴"}</td></tr>`
         })
         document.getElementById('habitaciones').innerHTML =
            `
            <table style="margin: auto; width: 50%; justify-content:center;"  class="table table-light table-striped"><tr><th>Habitación</th><th>Disponibilidad</th></tr>${html}</table></br>
            </br>
            <div id="container">
            <h4>Gestión de habitaciones:</h4>
            <form id="h-form" style="margin: 20px;">
               <div id="frm-container" class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <input id="habitacion" type="text" placeholder="Habitación" />
                  <input id="disponible" type="text" placeholder="Disponibilidad" />
               </div>
               <div id="btn-container" class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button type="button" class="btn btn-sm btn-outline-dark"
                     onclick="agregarHabitacion()">Agregar</button>
                  <button type="button" class="btn btn-sm btn-outline-dark" onclick="editarHabitacion()">Editar</button>
               </div>
            </form>
         </div>
         `
      })
}


function editarHabitacion() {
   let habitacion = {
      habitacion: document.getElementById('habitacion').value,
      disponible: document.getElementById('disponible').value,
   }

   fetch('habitaciones/editarHabitacion', {
      method: "PUT",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(habitacion)
   })
      .then(res => res.json())
      .then(res => {
         feedback(res.mensaje, res.error)
         mostrarHabitaciones()
      })
}

function mostrarReservas() {
   document.getElementById('forms').innerHTML = ""
   document.getElementById('clientes').innerHTML = ""
   document.getElementById('habitaciones').innerHTML = ""
   fetch('/reservas/')
      .then(res => res.json())
      .then(res => {
         let html = ''
         res.results.forEach(reserva => {
            html +=
               `<tr><td>${reserva.cliente.nombre}</td><td>${reserva.cliente.apellido}</td><td>${reserva.cliente.dni}</td><td>${reserva.habitacion}</td><td>${reserva.checkIn}</td><td>${reserva.checkOut}</td></tr>`
         })
         document.getElementById('reservas').innerHTML =
            `
            <table style="margin: auto; width: 50%; justify-content=center" class="table table-light table-striped"><tr><th>Nombre</th><th>Apellido</th><th>DNI</th><th>Habitacion</th><th>CheckIn</th><th>CheckOut</th></tr>${html}</table></br>
            </br>
            <div id="container">
            <h4>Gestión de reservas:</h4>
            <form id="r-form" style="margin: 20px;">
               <div id="frm-container" class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <input id="dni" type="text" placeholder="DNI" />
                  <input id="r-habitacion" type="text" placeholder="Habitación" />
                  <input id="r-checkIn" type="date" placeholder="Fecha de entrada" />
                  <input id="r-checkOut" type="date" placeholder="Fecha de salida" />
               </div>
               <div id="btn-container" class="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button type="button" class="btn btn-sm btn-outline-dark" onclick="agregarReserva()">Reservar</button>
                  <button type="button" class="btn btn-sm btn-outline-dark"
                     onclick="finalizarReserva()">Finalizar</button>
               </div>
            </form>
         </div>
         `
      })
}

function agregarReserva() {
   let reserva = {
      dni: document.getElementById('dni').value,
      habitacion: document.getElementById('r-habitacion').value,
      checkIn: document.getElementById('r-checkIn').value,
      checkOut: document.getElementById('r-checkOut').value,
   }

   fetch('reservas/checkIn', {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(reserva)
   })
      .then(res => res.json())
      .then(res => {
        feedback(res.mensaje, res.error)
         mostrarReservas()
      })
}

function finalizarReserva() {
   let reserva = {
      dni: document.getElementById('dni').value,
      habitacion: document.getElementById('r-habitacion').value,
      checkIn: document.getElementById('r-checkIn').value,
      checkOut: document.getElementById('r-checkOut').value,
   }
   fetch('reservas/checkOut', {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(reserva)
   })
      .then(res => res.json())
      .then(res => {
        feedback(res.mensaje, res.error)
         mostrarReservas()
      })
}

function feedback(mensaje, error){
   document.getElementById('feedback').innerHTML = `<p>${mensaje}</p>`
   error
      ? document.getElementById('feedback').style.color = 'red'
      : document.getElementById('feedback').style.color = 'green'

   setTimeout(() => {
      document.getElementById('feedback').innerHTML = ''
   }, 2000)
}