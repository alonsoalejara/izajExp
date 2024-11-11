export const getUnidades = () => ['mm', 'pulg.'];

export const convertUnit = (value, unit) => {
  switch (unit) {
    case 'mm':
      return value * 1000; // Convertir a milímetros
    case 'pulg.':
      return value * 39.37; // Convertir a pulgadas
    default:
      return value;
  }
};