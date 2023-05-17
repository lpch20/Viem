const initDB = require('./db')

initDB()

// Extraer datos de la Base de Datos Viemventura


// Modificando los botones de html. Ver deuda. 

function ocultarBoton() {
  // Ocultar el botón
  document.getElementById("verDeuda").style.display = "none";

  // Mostrar el contenido
  document.getElementById("miContenido").style.display = "block";
}