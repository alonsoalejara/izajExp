export const validateCarga = (peso, largo, ancho, alto) => {
  let newErrors = {};

  // Función para eliminar las unidades
  const removeUnits = (value) => value.replace(/[^\d.]/g, '');

  // Expresión regular para verificar el formato (número con máximo un decimal)
  const decimalRegex = /^\d+(\.\d{1})?$/;

  // Expresión regular para verificar punto al inicio o múltiples puntos
  const invalidFormatRegex = /^(\.|\d*\.\d*\.\d*)$/;

  // Expresión regular para verificar si el número comienza con 0 (y no tiene punto después de ese 0)
  const startsWithZeroRegex = /^0(?!\.)/;

  // Función para verificar si el valor es 0
  const isZero = (value) => value === '0' || value === 0;

  // Eliminar unidades (kg, m, etc.) antes de validar
  const cleanedPeso = removeUnits(peso);
  const cleanedLargo = removeUnits(largo);
  const cleanedAncho = removeUnits(ancho);
  const cleanedAlto = removeUnits(alto);

  // Validación para el peso
  if (invalidFormatRegex.test(cleanedPeso)) {
    newErrors.peso = 'Formato inválido';
  } else if (!decimalRegex.test(cleanedPeso)) {
    newErrors.peso = 'Max. un decimal';
  } else if (isZero(cleanedPeso)) {
    newErrors.peso = 'El peso no puede ser 0';
  } else if (startsWithZeroRegex.test(cleanedPeso)) {
    newErrors.peso = 'No puede ser 0';
  }
  
  // Validación para el largo
  if (invalidFormatRegex.test(cleanedLargo)) {
    newErrors.largo = 'Formato inválido';
  } else if (!decimalRegex.test(cleanedLargo)) {
    newErrors.largo = 'Max. un decimal';
  } else if (isZero(cleanedLargo)) {
    newErrors.largo = 'No puede ser 0';
  } else if (startsWithZeroRegex.test(cleanedLargo)) {
    newErrors.largo = '0 inválido al inicio';
  }
  
  // Validación para el ancho
  if (invalidFormatRegex.test(cleanedAncho)) {
    newErrors.ancho = 'Formato inválido';
  } else if (ancho && !decimalRegex.test(cleanedAncho)) {
    newErrors.ancho = 'Max. un decimal';
  } else if (startsWithZeroRegex.test(cleanedAncho)) {
    newErrors.ancho = 'No puede ser 0';
  } else if (isZero(cleanedAncho)) {
    newErrors.ancho = '0 inválido al inicio';
  }
  
  // Validación para el alto
  if (invalidFormatRegex.test(cleanedAlto)) {
    newErrors.alto = 'Formato inválido';
  } else if (alto && !decimalRegex.test(cleanedAlto)) {
    newErrors.alto = 'Max. un decimal';
  } else if (isZero(cleanedAlto)) {
    newErrors.alto = '0 inválido al inicio';
  } else if (startsWithZeroRegex.test(cleanedAlto)) {
    newErrors.alto = 'No puede ser 0';
  }
  
  return newErrors;
};
