export const validateCarga = (peso, largo, ancho, alto, forma) => {
  let newErrors = {};

  // Chequeo de negativos en todos los campos (sin retornos tempranos)
  const rawPeso  = parseFloat(peso);
  const rawAlto  = parseFloat(alto);
  const rawLargo = parseFloat(largo);
  const rawAncho = parseFloat(ancho);

  if (peso && !isNaN(rawPeso) && rawPeso < 0) {
    newErrors.peso = 'No acepta negativos';
  }
  if (alto && !isNaN(rawAlto) && rawAlto < 0) {
    newErrors.alto = 'No acepta negativos';
  }
  if (forma !== 'Cilindro' && forma !== 'Cuadrado') {
    if (largo && !isNaN(rawLargo) && rawLargo < 0) {
      newErrors.largo = 'No acepta negativos';
    }
    if (ancho && !isNaN(rawAncho) && rawAncho < 0) {
      newErrors.ancho = 'No acepta negativos';
    }
  }

  // Función para eliminar las unidades
  const removeUnits = (value) => value.replace(/[^\d.]/g, '');
  const cleanedPeso  = removeUnits(peso);
  const cleanedAlto  = removeUnits(alto);
  const cleanedLargo = removeUnits(largo);
  const cleanedAncho = removeUnits(ancho);

  const decimalRegex       = /^\d+(\.\d{1})?$/;
  const invalidFormatRegex = /^(\.|\d*\.\d*\.\d*)$/;
  const startsWithZeroRegex= /^0(?!\.)/;
  const isZero             = (v) => v === '0' || v === 0;

  // Validación peso
  if (!peso) {
    newErrors.peso = newErrors.peso || 'Campo obligatorio';
  } else {
    if (invalidFormatRegex.test(cleanedPeso)) {
      newErrors.peso = newErrors.peso || 'Formato inválido';
    } else if (!decimalRegex.test(cleanedPeso)) {
      newErrors.peso = newErrors.peso || 'Max. un decimal';
    } else if (isZero(cleanedPeso)) {
      newErrors.peso = newErrors.peso || 'No puede ser 0';
    } else if (startsWithZeroRegex.test(cleanedPeso)) {
      newErrors.peso = newErrors.peso || 'No puede empezar con 0';
    } else if (parseFloat(cleanedPeso) > 9) {
      newErrors.peso = newErrors.peso || 'Límite superado';
    }
  }

  // Validación alto
  if (!alto) {
    newErrors.alto = newErrors.alto || 'Campo obligatorio';
  } else {
    if (invalidFormatRegex.test(cleanedAlto)) {
      newErrors.alto = newErrors.alto || 'Formato inválido';
    } else if (!decimalRegex.test(cleanedAlto)) {
      newErrors.alto = newErrors.alto || 'Max. un decimal';
    } else if (isZero(cleanedAlto)) {
      newErrors.alto = newErrors.alto || 'No puede ser 0';
    } else if (startsWithZeroRegex.test(cleanedAlto)) {
      newErrors.alto = newErrors.alto || '0 inválido al inicio';
    }
  }

  // Validación largo y ancho (cuando aplicable)
  if (forma !== 'Cilindro' && forma !== 'Cuadrado') {
    if (!largo) {
      newErrors.largo = newErrors.largo || 'Campo obligatorio';
    } else {
      if (invalidFormatRegex.test(cleanedLargo)) {
        newErrors.largo = newErrors.largo || 'Formato inválido';
      } else if (!decimalRegex.test(cleanedLargo)) {
        newErrors.largo = newErrors.largo || 'Max. un decimal';
      } else if (isZero(cleanedLargo)) {
        newErrors.largo = newErrors.largo || 'No puede ser 0';
      } else if (startsWithZeroRegex.test(cleanedLargo)) {
        newErrors.largo = newErrors.largo || '0 inválido al inicio';
      }
    }

    if (!ancho) {
      newErrors.ancho = newErrors.ancho || 'Campo obligatorio';
    } else {
      if (invalidFormatRegex.test(cleanedAncho)) {
        newErrors.ancho = newErrors.ancho || 'Formato inválido';
      } else if (!decimalRegex.test(cleanedAncho)) {
        newErrors.ancho = newErrors.ancho || 'Max. un decimal';
      } else if (isZero(cleanedAncho)) {
        newErrors.ancho = newErrors.ancho || 'No puede ser 0';
      } else if (startsWithZeroRegex.test(cleanedAncho)) {
        newErrors.ancho = newErrors.ancho || '0 inválido al inicio';
      }
    }
  }

  if (!forma) {
    newErrors.forma = 'Campo obligatorio';
  }

  return newErrors;
};
