export const validatePlan = (nombreProyecto, supervisorSeleccionado, jefeAreaSeleccionado, responsablesAdicionales, nuevoResponsableNombre, nuevoResponsableRol) => {
  let newErrors = {};

  if (!nombreProyecto) {
    newErrors.nombreProyecto = 'Este campo es requerido';
  } else if (nombreProyecto.length > 75) {
    newErrors.nombreProyecto = 'Límite de caracteres excedido (máximo 75)';
  }

  if (!supervisorSeleccionado) {
    newErrors.supervisorSeleccionado = 'Este campo es requerido';
  }

  if (!jefeAreaSeleccionado) {
    newErrors.jefeAreaSeleccionado = 'Este campo es requerido';
  }

  if (responsablesAdicionales && responsablesAdicionales.length > 0) {
    responsablesAdicionales.forEach((responsable, index) => {
      if (!responsable.nombre) {
        newErrors[`responsableNombre${index}`] = `Nombre del responsable ${index + 1} es requerido`;
      } else if (responsable.nombre.length > 100) {
        newErrors[`responsableNombre${index}`] = `Nombre del responsable ${index + 1} excede el límite de 100 caracteres`;
      }
      if (!responsable.rol) {
        newErrors[`responsableRol${index}`] = `Rol del responsable ${index + 1} es requerido`;
      } else if (responsable.rol.length > 30) {
        newErrors[`responsableRol${index}`] = `Rol del responsable ${index + 1} excede el límite de 30 caracteres`;
      }
    });
  }

  if (isNuevoResponsableValido(nuevoResponsableNombre) && !nuevoResponsableRol) {
    newErrors.nuevoResponsableRol = 'Rol del responsable es requerido';
  } else if (nuevoResponsableRol && nuevoResponsableRol.length > 30) {
    newErrors.nuevoResponsableRol = 'El rol no puede tener más de 30 caracteres';
  }

  if (isNuevoResponsableValido(nuevoResponsableRol) && !nuevoResponsableNombre) {
    newErrors.nuevoResponsableNombre = 'Nombre del responsable es requerido';
  } else if (nuevoResponsableNombre && nuevoResponsableNombre.length > 100) {
    newErrors.nuevoResponsableNombre = 'El nombre no puede tener más de 100 caracteres';
  }

  return newErrors;
};

export const validarNombre = (text, setNombre, setNombreError) => {
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
};

const isNuevoResponsableValido = (valor) => {
  return valor && valor.trim() !== '';
};