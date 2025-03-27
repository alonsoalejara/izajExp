export const calculateCG = (forma, altura, largo, ancho) => {
      if (!altura) return null;
      const altNum = parseFloat(altura);
      if (isNaN(altNum)) return null;
  
      let cgX, cgY, cgZ;
      if (forma === 'Cuadrado') {
        cgX = altNum / 2;
        cgY = altNum / 2;
        cgZ = altNum / 2;
      } else if (forma === 'Cilindro') {
        // Para el cilindro, se asume que "largo" es el diámetro de la base
        const diam = parseFloat(largo);
        if (isNaN(diam)) return null;
        cgX = diam / 2;
        cgY = diam / 2;
        cgZ = altNum / 2;
      } else if (forma === 'Rectángulo') {
        if (!largo || !ancho) return null;
        const largoNum = parseFloat(largo);
        const anchoNum = parseFloat(ancho);
        if (isNaN(largoNum) || isNaN(anchoNum)) return null;
        cgX = largoNum / 2;
        cgY = anchoNum / 2;
        cgZ = altNum / 2;
      } else {
        return null;
      }
      return { cgX, cgY, cgZ };
};
  