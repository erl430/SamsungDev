// Lectura de los valores del formulario
const formulario = document.getElementById('formulario');
const usuario = document.getElementById('usuario');
const email = document.getElementById('email');
const contrasena = document.getElementById('contrasena');
const contrasena2 = document.getElementById('contrasena2');

// Definición de los mensajes de error
const campoIncompleto = 'Rellene este campo.';
const nombreInvalido = 'Nombre inválido.';
const emailInvalido = 'Email inválido.';
const contrasenaLarga = 'La clave no debe de tener más de 8 caracteres.';
const contrasenaDiferente = 'Las claves no coinciden';

// Entrada de datos del formulario
formulario.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

// Errores
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

// Validacion del email
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Validacion del nombre de usuario
const isValidName = (usuario) => {
    const ValidName  = /^[A-Za-z\s]+$/;
    return ValidName.test(usuario)
}

// Completado con exito
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

// Borrado de valores del formulario
const resetFormulario = () => {
    usuario.value = '';
    email.value = '';
    contrasena.value = '';
    contrasena2.value = '';
    const inputControls = document.querySelectorAll('.input-control');
    inputControls.forEach(inputControl => {
    inputControl.classList.remove('error');
    inputControl.classList.remove('success');
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    });
    };

// Validación de inputs
const validateInputs = () => {
    const usuarioValue = usuario.value.trim();
    const emailValue = email.value.trim();
    const contrasenaValue = contrasena.value.trim();
    const contrasena2Value = contrasena2.value.trim();

    // Caso de errores en el nombre de usuario
    if(usuarioValue === '') {
        setError(usuario, campoIncompleto);
    } else if (!isValidName(usuarioValue)) {
        setError ( usuario, nombreInvalido)  ;
    } else {
        setSuccess(usuario);
    }

    // Caso de errores en el email
    if(emailValue === ''){
        setError(email, campoIncompleto);
    } else if (!isValidEmail(emailValue)){
        setError(email, emailInvalido);
    } else {
        setSuccess(email);
    }

    // Caso de errores en la clave
    if(contrasenaValue === ''){
        setError(contrasena, campoIncompleto);
    } else if (contrasenaValue.length > 8 ){
        setError(contrasena, contrasenaLarga)
    } else {
        setSuccess(contrasena);
    }

    // Caso de errores en la repeticion de la clave
    if(contrasena2Value === '') {
        setError(contrasena2, campoIncompleto);
    } else if (contrasena2Value !== contrasenaValue){
        setError(contrasena2, contrasenaDiferente);
    } else {
        setSuccess(contrasena2);    
    }

    // Caso de la cuenta creada correctamente
    if (usuarioValue !== '' && emailValue !== '' && contrasenaValue !== '' && contrasena2Value !== ''
     && isValidName(usuarioValue) && isValidEmail(emailValue) && contrasenaValue.length <= 8 
     && contrasena2Value === contrasenaValue) {
        setTimeout(() => {
        alert('Inscripción correcta.');
        resetFormulario();
        }, 700);
    };
};