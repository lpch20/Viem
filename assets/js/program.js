// Deshabilitar campos y botones al cargar la página
document.getElementById('nombre').disabled = true;
document.getElementById('fechaNacimiento').disabled = true;
document.getElementById('celular').disabled = true;
document.getElementById('token').disabled = true;

// Función para buscar la cédula en la base de datos de Sheet.Best
function buscarCedulaEnBD(cedula) {
  // URL de la API de Sheet.Best con el endpoint para consultar la hoja de cálculo
  const url = 'https://sheet.best/api/sheets/1fd7b086-4ec4-4dfb-aa65-59e6fc3e9a88/search?Cedula=' + cedula;

  // Realiza la solicitud GET a la API de Sheet.Best utilizando fetch
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la solicitud');
      }
    })
    .then(data => {
      // Verifica si la cédula está en la base de datos
      if (data.length > 0) {
        // Mostrar SweetAlert indicando que la cédula fue encontrada
        swal("Éxito", "La cédula fue encontrada.", "success");
        document.getElementById('nombre').disabled = false;
        document.getElementById('fechaNacimiento').disabled = false;
        document.getElementById('celular').disabled = false;
        document.getElementById('token').disabled = false;
      } else {
        // Mostrar SweetAlert indicando que la cédula no fue encontrada
        swal("Error", "La cédula no fue encontrada.", "error");
      }
    })
    .catch(error => {
      // Mostrar SweetAlert indicando que ocurrió un error al buscar la cédula
      swal("Error", "Ocurrió un error al buscar la cédula. Por favor, intenta nuevamente más tarde.", "error");
      console.error(error);
    });
}

// Evento al salir del campo de entrada (input)
document.getElementById("cedula").addEventListener("blur", function () {
  // Obtener el valor de la cédula ingresada
  const cedula = this.value;

  // Verificar si se ha ingresado algo en el campo de la cédula
  if (cedula !== "") {
    // Mostrar SweetAlert indicando que se está buscando la cédula en la base de datos
    swal({
      title: "Buscando cédula",
      text: "Espere un momento...",
      icon: "info",
      button: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });

    // Llamar a la función para buscar la cédula en la base de datos
    buscarCedulaEnBD(cedula);
  }
});

// Evento al cambiar el valor de los campos de entrada
document.getElementById("nombre").addEventListener("input", verificarCampos);
document.getElementById("fechaNacimiento").addEventListener("input", verificarCampos);
document.getElementById("celular").addEventListener("input", verificarCampos);
document.getElementById("token").addEventListener("input", verificarCampos);

// Función para verificar si los campos están vacíos y habilitar/deshabilitar los botones
function verificarCampos() {
  const nombre = document.getElementById('nombre').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const celular = document.getElementById('celular').value;
  const token = document.getElementById('token').value;
  const cedula = document.getElementById('cedula').value;

  // Verificar expresiones regulares
  const regexNombre = /^[a-zA-Z\s]+$/;
  const regexCedula = /^\d{7,8}$/;
  const regexCelular =  /^[0-9+]+$/;

  if (nombre !== "" && !regexNombre.test(nombre)) {
    document.getElementById('nombre').style.border = "2px solid red";
  } else {
    document.getElementById('nombre').style.border = "none";
  }

  if (celular !== "" && !regexCelular.test(celular)) {
    document.getElementById('celular').style.border = "2px solid red";
  } else {
    document.getElementById('celular').style.border = "none";
  }

  // Obtener la fecha de nacimiento ingresada
  const fechaNacimiento2 = new Date(document.getElementById('fechaNacimiento').value);

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Calcular la diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
  const diferenciaTiempo = fechaActual.getTime() - fechaNacimiento2.getTime();

  // Calcular la edad en base a la diferencia de tiempo
  const edadEnMilisegundos = new Date(diferenciaTiempo);
  const edad = Math.abs(edadEnMilisegundos.getUTCFullYear() - 1970);

  // Verificar si la edad es mayor a 18
  if (edad < 18) {
    // La fecha de nacimiento es mayor a 18 años
    swal("Error", "La fecha de nacimiento es menor a 18 años.", "error");
  } 
}

// Evento al hacer clic en el botón "Ver Mi Deuda"
document.getElementById("btn1").addEventListener("click", function () {
  // Verificar si los campos están completados correctamente
  const nombre = document.getElementById('nombre').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const celular = document.getElementById('celular').value;
  const token = document.getElementById('token').value;
  const cedula = document.getElementById('cedula').value;

  // Verificar expresiones regulares
  const regexNombre = /^[a-zA-Z\s]+$/;
  const regexCedula = /^\d{7,8}$/;
  const regexCelular =  /^[0-9+]+$/;

  if (nombre === "" || fechaNacimiento === "" || celular === "" || token === "" || !regexNombre.test(nombre) || !regexCedula.test(cedula) || !regexCelular.test(celular)) {
    // Campos no completados correctamente, mostrar SweetAlert de error y evitar avanzar a la siguiente página
    swal("Error", "Por favor, completa correctamente todos los campos antes de continuar.", "error");
  } else {
    // Todos los campos completados correctamente, redirigir a la página de deuda
    window.location.href = 'https://www.google.com/search?q=traductor&rlz=1C1ONGR_esUY1048UY1048&oq=trad&aqs=chrome.0.69i59i131i433i512j0i131i433i512j69i57j0i512j0i131i433i512l3j0i3j0i131i433i512l2.1840j0j7&sourceid=chrome&ie=UTF-8'
  }
});

// Evento al hacer clic en el botón "Enviar Token"
// Evento al hacer clic en el botón "Enviar Token"
document.getElementById("btn2").addEventListener("click", function () {
  const celular = document.getElementById('celular').value;

  // Verificar expresión regular del número de celular
  const regexCelular = /^[0-9+]+$/;
  if (celular === "" || !regexCelular.test(celular)) {
    swal("Error", "Por favor, ingresa un número de celular válido.", "error");
  } else {
    // Mostrar SweetAlert indicando que se está enviando el token
    swal({
      title: "Enviando Token",
      text: "Se enviará un token al número de celular proporcionado.",
      icon: "info",
      button: false,
      closeOnClickOutside: false,
      closeOnEsc: false,
    });

    // Realizar solicitud a la API de Twilio para enviar el token al número de celular
    fetch('https://api.twilio.com/2010-04-01/Accounts/AC07e05daf83d07163fa24797fc1f5b9ee/Messages.json', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa("AC07e05daf83d07163fa24797fc1f5b9ee:2cf3f875e29e7894f0eea8c73ff25628")
      },
      body: new URLSearchParams({
        From: "+13159292208",
        To: celular,
        Body: "Tu token es: 55646545" // Aquí debes reemplazar XXXX con el token generado
      })
    })
      .then(response => {
        if (response.ok) {
          // Mostrar SweetAlert indicando que el token fue enviado
          swal("Éxito", "Se ha enviado el token al número de celular proporcionado.", "success");
          document.getElementById('token').disabled = false;
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .catch(error => {
        // Mostrar SweetAlert indicando que ocurrió un error al enviar el token
        swal("Error", "Ocurrió un error al enviar el token. Por favor, intenta nuevamente más tarde.", "error");
        console.error(error);
      });
  }
});





// // Deshabilitar campos y botones al cargar la página
// document.getElementById('nombre').disabled = true;
// document.getElementById('fechaNacimiento').disabled = true;
// document.getElementById('celular').disabled = true;
// document.getElementById('token').disabled = true;


// // Función para buscar la cédula en la base de datos de Sheet.Best
// function buscarCedulaEnBD(cedula) {
//   // URL de la API de Sheet.Best con el endpoint para consultar la hoja de cálculo
//   const url = 'https://sheet.best/api/sheets/1fd7b086-4ec4-4dfb-aa65-59e6fc3e9a88/search?Cedula=' + cedula;

//   // Realiza la solicitud GET a la API de Sheet.Best utilizando fetch
//   fetch(url)
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Error en la solicitud');
//       }
//     })
//     .then(data => {
//       // Verifica si la cédula está en la base de datos
//       if (data.length > 0) {
//         // Mostrar SweetAlert indicando que la cédula fue encontrada
//         swal("Éxito", "La cédula fue encontrada.", "success");
//         document.getElementById('nombre').disabled = false;
//         document.getElementById('fechaNacimiento').disabled = false;
//         document.getElementById('celular').disabled = false;
//         document.getElementById('token').disabled = false;
//       } else {
//         // Mostrar SweetAlert indicando que la cédula no fue encontrada
//         swal("Error", "La cédula no fue encontrada.", "error");
//       }
//     })
//     .catch(error => {
//       // Mostrar SweetAlert indicando que ocurrió un error al buscar la cédula
//       swal("Error", "Ocurrió un error al buscar la cédula. Por favor, intenta nuevamente más tarde.", "error");
//       console.error(error);
//     });
// }

// // Evento al salir del campo de entrada (input)
// document.getElementById("cedula").addEventListener("blur", function () {
//   // Obtener el valor de la cédula ingresada
//   const cedula = this.value;

//   // Verificar si se ha ingresado algo en el campo de la cédula
//   if (cedula !== "") {
//     // Mostrar SweetAlert indicando que se está buscando la cédula en la base de datos
//     swal({
//       title: "Buscando cédula",
//       text: "Espere un momento...",
//       icon: "info",
//       button: false,
//       closeOnClickOutside: false,
//       closeOnEsc: false,
//     });

//     // Llamar a la función para buscar la cédula en la base de datos
//     buscarCedulaEnBD(cedula);
//   }
// });

// // Evento al cambiar el valor de los campos de entrada
// document.getElementById("nombre").addEventListener("input", verificarCampos);
// document.getElementById("fechaNacimiento").addEventListener("input", verificarCampos);
// document.getElementById("celular").addEventListener("input", verificarCampos);
// document.getElementById("token").addEventListener("input", verificarCampos);

// // Función para verificar si los campos están vacíos y habilitar/deshabilitar los botones
// function verificarCampos() {
//   const nombre = document.getElementById('nombre').value;
//   const fechaNacimiento = document.getElementById('fechaNacimiento').value;
//   const celular = document.getElementById('celular').value;
//   const token = document.getElementById('token').value;
//   const cedula = document.getElementById('cedula').value; // Agregar captura de la cédula

//   // Verificar expresiones regulares
//   const regexNombre = /^[a-zA-Z\s]+$/;
//   const regexCedula = /^\d{7,8}$/;
//   const regexCelular = /^\d{8,9}$/;

//   if (nombre !== "" && !regexNombre.test(nombre)) {
//     document.getElementById('nombre').style.border = "2px solid red";
//   } else {
//     document.getElementById('nombre').style.border = "none";
//   }

//   if (celular !== "" && !regexCelular.test(celular)) {
//     document.getElementById('celular').style.border = "2px solid red";
//   } else {
//     document.getElementById('celular').style.border = "none";
//   }

//   // Obtener la fecha de nacimiento ingresada
//   const fechaNacimiento2 = new Date(document.getElementById('fechaNacimiento').value);

//   // Obtener la fecha actual
//   const fechaActual = new Date();

//   // Calcular la diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
//   const diferenciaTiempo = fechaActual.getTime() - fechaNacimiento2.getTime();

//   // Calcular la edad en base a la diferencia de tiempo
//   const edadEnMilisegundos = new Date(diferenciaTiempo);
//   const edad = Math.abs(edadEnMilisegundos.getUTCFullYear() - 1970);

//   // Verificar si la edad es mayor a 18
//   if (edad < 18) {
//     // La fecha de nacimiento es mayor a 18 años
//     swal("Error", "La fecha de nacimiento es menor a 18 años.", "error");
//   } 
// }

// // Evento al hacer clic en el botón "Ver Mi Deuda"
// document.getElementById("btn1").addEventListener("click", function () {
//   // Verificar si los campos están completados correctamente
//   const nombre = document.getElementById('nombre').value;
//   const fechaNacimiento = document.getElementById('fechaNacimiento').value;
//   const celular = document.getElementById('celular').value;
//   const token = document.getElementById('token').value;
//   const cedula = document.getElementById('cedula').value; // Agregar captura de la cédula

//   // Verificar expresiones regulares
//   const regexNombre = /^[a-zA-Z\s]+$/;
//   const regexCedula = /^\d{7,8}$/;
//   const regexCelular = /^\d{8,9}$/;

//   if (nombre === "" || fechaNacimiento === "" || celular === "" || token === "" || !regexNombre.test(nombre) || !regexCedula.test(cedula) || !regexCelular.test(celular)) {
//     // Campos no completados correctamente, mostrar SweetAlert de error y evitar avanzar a la siguiente página
//     swal("Error", "Por favor, completa correctamente todos los campos antes de continuar.", "error");

//   } else {
//     // Todos los campos completados correctamente, redirigir a la página de deuda
//     window.location.href = 'https://www.google.com/search?q=traductor&rlz=1C1ONGR_esUY1048UY1048&oq=trad&aqs=chrome.0.69i59i131i433i512j0i131i433i512j69i57j0i512j0i131i433i512l3j0i3j0i131i433i512l2.1840j0j7&sourceid=chrome&ie=UTF-8'
//   }
// });
