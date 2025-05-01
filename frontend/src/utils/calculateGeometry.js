// utils/calculateGeometry.js
export const calculateGeometry = (forma, altura, largo, ancho) => {
  if (!altura) return null;
  const altNum = parseFloat(altura);
  if (isNaN(altNum)) return null;

  let cgX, cgY, cgZ;
  let d1x = 0, d2x = 0, d1y = 0, d2y = 0, d1z = 0, d2z = 0;

  if (forma === 'Cuadrado') {
    // Se asume que 'altura' representa el lado del cubo.
    cgX = altNum / 2;
    cgY = altNum / 2;
    cgZ = altNum / 2;
    d1x = altNum / 2;
    d2x = altNum / 2;
    d1y = altNum / 2;
    d2y = altNum / 2;
    d1z = altNum / 2;
    d2z = altNum / 2;
  } else if (forma === 'Cilindro') {
    // Para el cilindro se recibe el diámetro en el parámetro "largo"
    const diam = parseFloat(largo);
    if (isNaN(diam)) return null;
    cgX = diam / 2;
    cgY = diam / 2;
    cgZ = altNum / 2;
    const radio = diam / 2;
    d1x = radio;
    d2x = radio;
    d1y = radio;
    d2y = radio;
    d1z = cgZ;
    d2z = altNum - cgZ;
  } else if (forma === 'Rectángulo' || forma === 'Paralelepípedo') {
    // Se asume que se ingresan largo y ancho reales para la carga
    if (!largo || !ancho) return null;
    const largoNum = parseFloat(largo);
    const anchoNum = parseFloat(ancho);
    if (isNaN(largoNum) || isNaN(anchoNum)) return null;
    cgX = largoNum / 2;
    cgY = anchoNum / 2;
    cgZ = altNum / 2;
    d1x = cgX;
    d2x = largoNum - cgX;
    d1y = cgY;
    d2y = anchoNum - cgY;
    d1z = cgZ;
    d2z = altNum - cgZ;
  } else {
    return null;
  }

  return {
    cg: { cgX, cgY, cgZ },
    dimensions: { d1x, d2x, d1y, d2y, d1z, d2z },
  };
};