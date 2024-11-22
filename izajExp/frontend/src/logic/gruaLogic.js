export const getGruas = () => [
  'Terex de 55 toneladas',
  'Grúa Personalizada',
];

export const validateGruaSelection = (grua) => {
  if (grua === 'Grúa Personalizada') {
    return { isValid: false, message: 'Debe ingresar los radios de izaje y montaje' };
  }
  return { isValid: true };
};