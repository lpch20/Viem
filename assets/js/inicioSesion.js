// const formularioLogin = document.getElementById('formulario-login');
// const claveSecreta = 'lpch20qwerty'


// formularioLogin.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const contrasena = document.getElementById('contrasena').value;
//   const cedula = document.getElementById('cedula').value;

//   try {
//     // Obtener los registros de la base de datos
//     const respuesta = await fetch('https://sheet.best/api/sheets/b3f9ed0f-fa06-42b4-a366-066dedcff8ca');
//     const registros = await respuesta.json();

//     // Verificar las credenciales del usuario
//     const usuario = registros.find(registro => registro["Cedula"] === cedula);

//     if (usuario) {
//       // Desencriptar la contraseña almacenada
//       const contrasenaEncriptada = usuario["Contrasena"];
//       const contrasenaDesencriptada = CryptoJS.AES.decrypt(contrasenaEncriptada, claveSecreta).toString(CryptoJS.enc.Utf8);

//       // Comparar las contraseñas
//       if (contrasena === contrasenaDesencriptada) {
//         // Credenciales correctas, redirigir o mostrar mensaje de éxito
//         console.log('Inicio de sesión exitoso');

//         document.getElementById('cedula').value = cedula;
//         // Realizar la acción deseada, como redirigir a una página de inicio
//         window.location.href = 'program.html';
//       } else {
//         // Credenciales incorrectas, mostrar mensaje de error
//         console.log('Credenciales incorrectas');
//         // Mostrar un mensaje de error en tu página o realizar otra acción adecuada
//       }
//     } else {
//       // Credenciales incorrectas, mostrar mensaje de error
//       console.log('Credenciales incorrectas');
//       // Mostrar un mensaje de error en tu página o realizar otra acción adecuada
//     }
//   } catch (error) {
//     console.log(error);
//   }
  
// });