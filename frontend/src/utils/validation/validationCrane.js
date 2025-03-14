export const validateSetupGrua = (grua) => {
    let newErrors = {};
  
    if (!grua) {
      newErrors.grua = 'Debe seleccionar una grúa antes de continuar';
    }
  
    return newErrors;
};