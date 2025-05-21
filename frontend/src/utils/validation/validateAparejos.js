export const validateSetupAparejos = (maniobraSeleccionada, cantidadGrilletes, tipoGrillete, tipoAparejoSeleccionado, aparejoPorWLL, anguloSeleccionado) => {
    let newErrors = {};
  
    if (!maniobraSeleccionada?.cantidad) {
      newErrors.cantidadManiobra = 'Debe seleccionar la cantidad de maniobras.';
    }
  
    if (!maniobraSeleccionada?.tipo?.type) {
      newErrors.tipoManiobra = 'Debe seleccionar el tipo de maniobra (eslinga/estrobo).';
    }
  
    if (!cantidadGrilletes || parseInt(cantidadGrilletes, 10) === 0) {
      newErrors.cantidadGrilletes = 'Debe seleccionar la cantidad de maniobras.';
    }
  
    if (Object.keys(tipoGrillete).length === 0) {
      newErrors.tipoGrillete = 'Debe seleccionar el tipo de grillete.';
    }
  
    if (!tipoAparejoSeleccionado) {
      newErrors.tipoAparejo = 'Debe seleccionar el tipo de aparejo.';
    }
  
    if (!aparejoPorWLL) {
      newErrors.aparejoPorWLL = 'Debe seleccionar el aparejo según su WLL.';
    }
  
    if (['2', '4'].includes(maniobraSeleccionada?.cantidad) && !anguloSeleccionado) {
      newErrors.anguloSeleccionado = 'Debe seleccionar el ángulo de trabajo.';
    }
  
    return newErrors;
  };
  