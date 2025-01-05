const validationCrane = {
    validarNombre: (text, setNombre, setNombreError) => {
        const trimmedText = text.trim();
        setNombre(text);
        if (text === '') {
            setNombreError('El nombre es obligatorio.');
        } else if (text.startsWith(' ')) {
            setNombreError('No puede comenzar con espacios.');
        } else if (trimmedText === '') {
            setNombreError('El nombre no puede contener solo espacios.');
        } else if (!/^[A-Za-z0-9\s-]+$/.test(trimmedText)) {
            setNombreError('El nombre puede contener solo letras, números, espacios y guiones.');
        } else {
            setNombreError('');
        }
    },

    validarPeso: (text, setPeso, setPesoError) => {
        setPeso(text);
        if (text === '') {
            setPesoError('El peso es obligatorio.');
        } else if (!/^\d+(\.\d{1,2})?$/.test(text)) {  
            setPesoError('Debe ser un número positivo con hasta dos decimales.');
        } else {
            setPesoError('');
        }
    },

    validarPesoGancho: (text, setPesoGancho, setPesoGanchoError) => {
        setPesoGancho(text);
        if (text === '') {
            setPesoGanchoError('El peso del gancho es obligatorio.');
        } else if (!/^\d+(\.\d{1,2})?$/.test(text)) {  
            setPesoGanchoError('Debe ser un número positivo con hasta dos decimales.');
        } else {
            setPesoGanchoError('');
        }
    },

    validarCapacidadLevante: (text, setCapacidadLevante, setCapacidadLevanteError) => {
        setCapacidadLevante(text);
        if (text === '') {
            setCapacidadLevanteError('La capacidad de levante es obligatoria.');
        } else if (!/^\d+(\.\d{1,2})?$/.test(text)) {  
            setCapacidadLevanteError('Debe ser un número positivo con hasta dos decimales.');
        } else {
            setCapacidadLevanteError('');
        }
    },

    validarLargoPluma: (text, setLargoPluma, setLargoPlumaError) => {
        setLargoPluma(text);
        if (text === '') {
            setLargoPlumaError('El largo de la pluma es obligatorio.');
        } else if (!/^\d+(\.\d{1,2})?$/.test(text)) { 
            setLargoPlumaError('Debe ser un número positivo con hasta dos decimales.');
        } else {
            setLargoPlumaError('');
        }
    },

    validarContrapeso: (text, setContrapeso, setContrapesoError) => {
        setContrapeso(text);
        if (text === '') {
            setContrapesoError('El contrapeso es obligatorio.');
        } else if (!/^\d+(\.\d{1,2})?$/.test(text)) {  
            setContrapesoError('Debe ser un número positivo con hasta dos decimales.');
        } else {
            setContrapesoError('');
        }
    }
};

export default validationCrane;