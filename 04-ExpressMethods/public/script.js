fetch('/personas')
   .then(res => res.json())
   .then(data => {
      let table = ''
      data.forEach(persona => {
          table += `<tr><td>${persona.nombre}</td><td>${persona.apellido}</td><td>${persona.edad}</td></tr>`
      })

      document.getElementById('table').innerHTML = `<table><tr><th>Nombre</th><th>Apellido</th><th>Edad</th></tr>${table}</table>`

   })







   //   .catch(err => console.error('error: ' + err)