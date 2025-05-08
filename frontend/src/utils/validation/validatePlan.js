export const validatePlan = (nombreProyecto) => {
    let newErrors = {};
  
    if (nombreProyecto && nombreProyecto.length > 75) {
      newErrors.nombreProyecto = 'Límite de caracteres excedido (máximo 75)';
    }
  
    return newErrors;
  };