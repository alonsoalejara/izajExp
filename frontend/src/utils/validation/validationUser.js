const validationUser = {
    validarEmail: (text, setEmail, setEmailError) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmail(text);
        if (text === '') {
            setEmailError('');
        } else if (!emailPattern.test(text)) {
            setEmailError('El correo electrónico no tiene el formato correcto');
        } else {
            setEmailError('');
        }
    },

    validarNombre: (text, setNombre, setNombreError) => {
        const trimmedText = text.trim();
        setNombre(text);
        if (text === '') {
            setNombreError('');
        } else if (text.startsWith(' ')) {
            setNombreError('No puede comenzar con espacios.');
        } else if (trimmedText === '') {
            setNombreError('El nombre no puede contener solo espacios.');
        } else if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ,\s-]+$/.test(trimmedText)) {
            setNombreError('No se aceptan números/caracteres especiales.');
        } else {
            setNombreError('');
        }
    },

    validarApellido: (text, setApellido, setApellidoError) => {
        const trimmedText = text.trim();
        setApellido(text);
        if (text === '') {
            setApellidoError('');
        } else if (text.startsWith(' ')) {
            setApellidoError('No puede comenzar con espacios.');
        } else if (trimmedText === '') {
            setApellidoError('El apellido no puede contener solo espacios.');
        } else if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ,\s-]+$/.test(trimmedText)) {
            setApellidoError('No se aceptan números/caracteres especiales.');
        } else {
            setApellidoError('');
        }
    },

    validarRut: (text, setRut, setRutError) => {
        const rutPattern = /^\d{7,8}-[0-9Kk]{1}$/;
        setRut(text);
        if (text === '') {
            setRutError('');
        } else if (!rutPattern.test(text)) {
            setRutError('El RUT no tiene el formato correcto (ej: 12345678-K)');
        } else {
            setRutError('');
        }
    },

    validarTelefono: (text, setTelefono, setTelefonoError) => {
        const telefonoPattern = /^\+569\d{8}$/;
        setTelefono(text);
        if (text === '') {
            setTelefonoError('');
        } else if (!telefonoPattern.test(text)) {
            setTelefonoError('Debe tener el formato +569XXXXXXXX');
        } else {
            setTelefonoError('');
        }
    }
};

export default validationUser;