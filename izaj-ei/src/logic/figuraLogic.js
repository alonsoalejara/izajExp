export const getFiguras = () => ['Cuadrado', 'Rectángulo', 'Círculo'];

export const calculateArea = (figura, dimensiones) => {
  switch (figura) {
    case 'Cuadrado':
      return dimensiones.lado * dimensiones.lado;
    case 'Rectángulo':
      return dimensiones.largo * dimensiones.ancho;
    case 'Círculo':
      return Math.PI * Math.pow(dimensiones.radio, 2);
    default:
      return 0;
  }
};
