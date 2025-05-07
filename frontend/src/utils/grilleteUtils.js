// Esta función genera un resumen de los tipos de grilletes seleccionados
export const generarGrilleteSummary = (tipoGrillete) => {
    return Object.entries(tipoGrillete)
      .filter(([, qty]) => qty > 0)
      .map(([dia]) => `${dia}"`)
      .join(', ');
  };
  