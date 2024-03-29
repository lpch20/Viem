const formulario = document.getElementById('formulario');
const registro = document.getElementById('registro')
const exito = document.getElementById('exito')
const inputs = document.querySelectorAll('.formulario .contenedor-input input')


const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    cedula: /^\d{8,8}$/, // 7 a 14 numeros.
    telefono: /^\d{8,9}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    cedula: false,
    contrasena: false,
    fecha: false,
    telefono: false
}


const validarFormulario = (e) => {

    switch (e.target.name) {
        case "nombre":
            validarCeldas(expresiones.nombre, e.target, "nombre")
            break;
        case "cedula":
            validarCeldas(expresiones.cedula, e.target, "cedula")
            break;
        case "contrasena":
            validarCeldas(expresiones.password, e.target, "contrasena")
            validarContrasena()
            break;
        case "contrasena2":
            validarContrasena()
            break;
        case "fecha":
            validarCeldas(expresiones.fecha, e.target, "fecha")
            break;
        case "telefono":
            validarCeldas(expresiones.telefono, e.target, "telefono")
            break;

    }
}


const validarCeldas = (expresion, input, campo) => {
    if (input.value.trim() === '') {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} svg path`).classList.add('formulario__grupo-incorrecto');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
    else if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto')
        document.querySelector(`#grupo__${campo} svg path`).classList.remove('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto')
        document.querySelector(`#grupo__${campo} svg path`).classList.add('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[campo] = false;
    }
}

const validarContrasena = () => {
    const contrasena1 = document.getElementById('contrasena')
    const contrasena2 = document.getElementById('contrasena2')

    if (contrasena1.value !== contrasena2.value) {
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo-incorrecto')
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo-correcto')
        document.querySelector(`#grupo__contrasena2 svg path`).classList.add('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.add('formulario__input-error-activo')
        campos[contrasena1] = false;
    } else {
        document.getElementById(`grupo__contrasena2`).classList.remove('formulario__grupo-incorrecto')
        document.getElementById(`grupo__contrasena2`).classList.add('formulario__grupo-correcto')
        document.querySelector(`#grupo__contrasena2 svg path`).classList.remove('formulario__grupo-incorrecto')
        document.querySelector(`#grupo__contrasena2 .formulario__input-error`).classList.remove('formulario__input-error-activo')
        campos[contrasena1] = true;
    }

}



inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
});

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    let camposCompletos = true; // Variable para verificar si todos los campos están completos


    for (const campo in campos) {
        if (!campos[campo]) {
            camposCompletos = false;
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} svg path`).classList.add('formulario__grupo-incorrecto');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        }
    }

    let contrasenaCifrada; // Variable para almacenar la contraseña cifrada

    // Verificar si todos los campos están completos
    if (camposCompletos) {
        try {
            // Cifrar la contraseña
            contrasenaCifrada = CryptoJS.AES.encrypt(formulario.contrasena.value, 'lpch20qwerty').toString();

            // Realizar el registro
            const registroRespuesta = await fetch('https://sheet.best/api/sheets/b3f9ed0f-fa06-42b4-a366-066dedcff8ca', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Nombre": formulario.nombre.value,
                    "Apellido": formulario.apellido.value,
                    "Cedula": formulario.cedula.value,
                    "Contrasena": contrasenaCifrada,
                    "Contrasena2": contrasenaCifrada,
                    "Correo Electronico": formulario.correo.value,
                    "Telefono": formulario.telefono.value
                }),
            });

            const contenido = await registroRespuesta.json();
            console.log(contenido);

            registro.classList.remove('activo')
            exito.classList.add('activo')

        } catch (error) {
            console.log(error);
        }
    } else {
        console.log('Faltan datos para completar el formulario');
    }

    // LEER FILAS
    try {
        const respuesta = await fetch('https://sheet.best/api/sheets/b3f9ed0f-fa06-42b4-a366-066dedcff8ca')
        const contenido = await respuesta.json()
        console.log(contenido)
    } catch (error) {
        console.log(error)
    }

    // ELIMINAR FILAS
    try {
        const respuesta = await fetch('https://sheet.best/api/sheets/b3f9ed0f-fa06-42b4-a366-066dedcff8ca', {
            method: 'DELETE'
        })
        const contenido = await respuesta.json()
        console.log(contenido)
    } catch (error) {
        console.log(error)
    }

    // ACTUALIZAR FILAS
    try {
        const respuesta = await fetch('https://sheet.best/api/sheets/b3f9ed0f-fa06-42b4-a366-066dedcff8ca', {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Nombre": "Nuevo nombre",
                "Apellido": "Nuevo apellido"
            }),
        })
        const contenido = await respuesta.json()
        console.log(contenido)
    } catch (error) {
        console.log(error)
    }


})




