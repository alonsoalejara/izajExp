export const validateCarga = (peso, largo, ancho, alto, forma) => {
  let newErrors = {};

  // Función para eliminar las unidades (se mantienen solo dígitos y puntos)
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

  // Validación para campos vacíos
  if (!peso) {
    newErrors.peso = 'Campo obligatorio';
  } else {
    // Validaciones adicionales para peso solo si se ingresó algo
    if (invalidFormatRegex.test(cleanedPeso)) {
      newErrors.peso = 'Formato inválido';
    } else if (!decimalRegex.test(cleanedPeso)) {
      newErrors.peso = 'Max. un decimal';
    } else if (isZero(cleanedPeso)) {
      newErrors.peso = 'El peso no puede ser 0';
    } else if (startsWithZeroRegex.test(cleanedPeso)) {
      newErrors.peso = 'No puede ser 0';
    }
  }

  if (!largo) {
    newErrors.largo = 'Campo obligatorio';
  } else {
    // Validaciones adicionales para largo solo si se ingresó algo
    if (invalidFormatRegex.test(cleanedLargo)) {
      newErrors.largo = 'Formato inválido';
    } else if (!decimalRegex.test(cleanedLargo)) {
      newErrors.largo = 'Max. un decimal';
    } else if (isZero(cleanedLargo)) {
      newErrors.largo = 'No puede ser 0';
    } else if (startsWithZeroRegex.test(cleanedLargo)) {
      newErrors.largo = '0 inválido al inicio';
    }
  }

  if (!ancho) {
    newErrors.ancho = 'Campo obligatorio';
  } else {
    // Validaciones adicionales para ancho solo si se ingresó algo
    if (invalidFormatRegex.test(cleanedAncho)) {
      newErrors.ancho = 'Formato inválido';
    } else if (!decimalRegex.test(cleanedAncho)) {
      newErrors.ancho = 'Max. un decimal';
    } else if (startsWithZeroRegex.test(cleanedAncho)) {
      newErrors.ancho = 'No puede ser 0';
    } else if (isZero(cleanedAncho)) {
      newErrors.ancho = '0 inválido al inicio';
    }
  }

  if (!alto) {
    newErrors.alto = 'Campo obligatorio';
  } else {
    // Validaciones adicionales para alto solo si se ingresó algo
    if (invalidFormatRegex.test(cleanedAlto)) {
      newErrors.alto = 'Formato inválido';
    } else if (!decimalRegex.test(cleanedAlto)) {
      newErrors.alto = 'Max. un decimal';
    } else if (isZero(cleanedAlto)) {
      newErrors.alto = '0 inválido al inicio';
    } else if (startsWithZeroRegex.test(cleanedAlto)) {
      newErrors.alto = 'No puede ser 0';
    }
  }

  if (!forma) {
    newErrors.forma = 'Campo obligatorio';
  }

  return newErrors;
};
