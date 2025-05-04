// Se definen las tablas de capacidad según el largo de pluma.
// Las claves son los radios de trabajo (en metros) y los valores la capacidad (en toneladas).
export const capacityTables = {
  "10.5": { 3: 50, 3.5: 44.6, 4: 38.5, 4.5: 33.7, 5: 29.9, 6: 24.2, 7: 20.0, 8: 16.9, 9: 14.4 },
  "15.2": { 3: 27.2, 3.5: 27.2, 4: 27.2, 4.5: 27.2, 5: 27.2, 6: 24.7, 7: 20.6, 8: 17.5, 9: 15.1, 10: 13.2, 12: 9.8, 14: 7.1 },
  "19.8": { 4.5: 26.8, 5: 25.8, 6: 23.8 , 7: 20.9, 8: 17.8, 9: 15.4, 10: 13.5, 12: 10.1, 14: 7.6, 16: 5.8, 18: 4.5 },
  "24.3": { 6: 17.7, 7: 16.1, 8: 14.7, 9: 13.5, 10: 12.5, 12: 10.2, 14: 7.7, 16: 6, 18: 4.7, 20: 3.7, 22: 3 },
  "26.9": { 7: 14, 8: 12.8, 9: 11.8, 10: 10.9, 12: 9.5, 14: 7.8, 16: 6.1, 18: 4.8, 20: 3.9, 22: 3.1, 24: 2.5, 26: 2 },
  "33.5": { 9: 10.5, 10: 9.7, 12: 8.4, 14: 7.3, 16: 6.1, 18: 4.9, 20: 3.9, 22: 3.2, 24: 2.6, 26: 2.1, 28: 1.6, 30: 1.3, 32: 0.9 }
};

// Función auxiliar para interpolar la capacidad de carga en una tabla dada
function interpolateCapacity(table, radio) {
  const keys = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b);

  // Si el radio es menor que el mínimo o mayor que el máximo, no se puede interpolar
  if (radio < keys[0] || radio > keys[keys.length - 1]) {
    return undefined;
  }

  // Si el radio coincide exactamente con uno de los valores, se retorna ese valor
  if (table[radio] !== undefined) {
    return table[radio];
  }

  // Buscar los dos puntos para interpolar
  let lower = keys[0],
    upper = keys[keys.length - 1];

  for (let i = 0; i < keys.length - 1; i++) {
    if (radio > keys[i] && radio < keys[i + 1]) {
      lower = keys[i];
      upper = keys[i + 1];
      break;
    }
  }

  // Interpolación lineal
  const valueLower = table[lower];
  const valueUpper = table[upper];
  const slope = (valueUpper - valueLower) / (upper - lower);
  const interpolated = valueLower + slope * (radio - lower);
  return interpolated;
}

/*
La función evaluateMovement recibe tres parámetros:
  - radio: El radio de trabajo (en metros).
  - loadWeight: El peso de la carga (en kilogramos).
  - boomLength: El largo de pluma (en metros).

Ahora se convierte loadWeight de kg a toneladas y se evalúa si el movimiento es óptimo comparando el peso convertido con la capacidad disponible.
*/
export function evaluateMovement(radio, loadWeight, boomLength) {
  // Si no se proporciona un radio, mostrar el mensaje de solicitud
  if (radio === null || radio === undefined || radio === '') {
    return {
      optimum: false,
      message: 'Ingrese radio de movimiento',
      details: null
    };
  }

  // Se obtiene la tabla de capacidades para el largo de pluma ingresado.
  // Se asume que boomLength debe coincidir exactamente con alguno de los valores definidos.
  const table = capacityTables[boomLength.toString()];
  if (!table) {
    return {
      optimum: false,
      message: 'No se dispone de datos para el largo de pluma ingresado.',
      details: null
    };
  }

  // Se calcula la capacidad disponible para el radio ingresado mediante interpolación.
  const capacityAvailable = interpolateCapacity(table, radio);
  if (capacityAvailable === undefined) {
    return {
      optimum: false,
      message: 'El radio ingresado está fuera del rango disponible para este largo de pluma.',
      details: null
    };
  }

  // Convertir el peso de la carga de kg a toneladas
  const loadWeightT = loadWeight / 1000;

  // Se determina si el movimiento es óptimo comparando el peso convertido con la capacidad.
  const optimum = loadWeightT <= capacityAvailable;
  const configInfo = `${capacityAvailable.toFixed(1)} t disponible para este radio`;

  return {
    optimum,
    message: optimum
      ? `Movimiento óptimo`
      : `Movimiento no óptimo`,
    details: {
      capacityAvailable,
      loadWeightT
    }
  };
}