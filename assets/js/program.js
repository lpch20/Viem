
// Función para verificar la cédula en las bases de datos
function verificarCedula(cedula) {
    const url1 = 'https://sheet.best/api/sheets/b3f9ed0f-fa06-42b4-a366-066dedcff8ca';
    const url2 = 'https://sheet.best/api/sheets/1fd7b086-4ec4-4dfb-aa65-59e6fc3e9a88';

    const loadingAlert = swal({
        title: 'Cargando...',
        text: 'Verificando la cédula en las bases de datos',
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        icon: 'info',
    });

    // Realizar solicitud HTTP a la primera base de datos
    fetch(url1)
        .then(response1 => response1.json())
        .then(data1 => {
            const cedulas1 = data1.map(item => item.Cedula);

            // Realizar solicitud HTTP a la segunda base de datos
            fetch(url2)
                .then(response2 => response2.json())
                .then(data2 => {
                    const cedulas2 = data2.map(item => item.Cedula);

                    // Verificar si la cédula está en ambas bases de datos
                    if (cedulas1.includes(cedula) && cedulas2.includes(cedula)) {
                        console.log('Usuario con deuda, puede continuar');
                    } else {
                        console.log('Usuario incorrecto, no se encuentra en nuestra base de datos');
                    }

                    swal.close();

                    swal({
                        title: 'Error',
                        text: 'Usuario incorrecto, no se encuentra en nuestra base de datos',
                        icon: 'error',
                        buttons: {
                            continuar: {
                                text: 'Continuar',
                                value: 'continuar',
                            },
                        },
                    }).then(value => {
                        if (value === 'continuar') {
                            // Acción al hacer clic en el botón "Continuar"
                            console.log('Continuar...');
                        }
                    });
                });


        });
}

// Obtener el elemento de input de la cédula
const cedulaInput = document.getElementById('cedula');

// Escuchar el evento 'blur' para verificar la cédula cuando el usuario sale del input
cedulaInput.addEventListener('blur', () => {
    const cedula = cedulaInput.value.trim();
    verificarCedula(cedula);
});