export const getManiobras = () => ['Eslinga', 'Estrobo'];

export const validateManiobraSelection = (selectedManeuverType, selectedManeuverQuantity) => {
  if (selectedManeuverType && selectedManeuverQuantity) {
    return { isValid: true };
  }
  return { isValid: false, message: 'Debe seleccionar un tipo de maniobra y cantidad' };
};