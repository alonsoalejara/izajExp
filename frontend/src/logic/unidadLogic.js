export const getUnidades = () => ['kg', 'Tonelada', 'Metros'];

export const convertUnit = (value, unidad) => {
  if (unidad === 'Tonelada') {
    return value / 1000; // Convertir kg a toneladas
  }
  return value;
};