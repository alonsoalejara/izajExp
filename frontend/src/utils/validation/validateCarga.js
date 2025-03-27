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

  // Validación para el peso (siempre requerido)
  if (!peso) {
    newErrors.peso = 'Campo obligatorio';
  } else {
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

  // Validación para el alto (siempre se muestra, aunque cambia el label según la forma)
  if (!alto) {
    newErrors.alto = 'Campo obligatorio';
  } else {
    if (invalidFormatRegex.test(cleanedAlto)) {
      newErrors.alto = 'Formato inválido';
    } else if (!decimalRegex.test(cleanedAlto)) {
      newErrors.alto = 'Max. un decimal';
    } else if (isZero(cleanedAlto)) {
      newErrors.alto = 'No puede ser 0';
    } else if (startsWithZeroRegex.test(cleanedAlto)) {
      newErrors.alto = '0 inválido al inicio';
    }
  }

  // Validar largo y ancho solo si la forma NO es Cilindro ni Cuadrado
  if (forma !== 'Cilindro' && forma !== 'Cuadrado') {
    if (!largo) {
      newErrors.largo = 'Campo obligatorio';
    } else {
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
      if (invalidFormatRegex.test(cleanedAncho)) {
        newErrors.ancho = 'Formato inválido';
      } else if (!decimalRegex.test(cleanedAncho)) {
        newErrors.ancho = 'Max. un decimal';
      } else if (isZero(cleanedAncho)) {
        newErrors.ancho = 'No puede ser 0';
      } else if (startsWithZeroRegex.test(cleanedAncho)) {
        newErrors.ancho = '0 inválido al inicio';
      }
    }
  }

  if (!forma) {
    newErrors.forma = 'Campo obligatorio';
  }

  return newErrors;
};
