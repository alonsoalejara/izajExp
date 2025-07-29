export const calculateGeometry = (forma, altura, largo, ancho, diametro) => {
    const altNum = parseFloat(altura);
    const largoNum = parseFloat(largo);
    const anchoNum = parseFloat(ancho);
    const diamNum = parseFloat(diametro);

    if (!forma) return null;

    let cgX, cgY, cgZ;
    let d1x = 0, d2x = 0, d1y = 0, d2y = 0, d1z = 0, d2z = 0;

    if (forma === 'Cuadrado') {
        if (isNaN(altNum)) return null;
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
        if (isNaN(altNum) || isNaN(diamNum)) return null;
        // Cilindro acostado
        if (altNum > diamNum) {
            cgX = altNum / 2;
            cgY = 0;
            cgZ = diamNum / 2;

            const radio = diamNum / 2;
            d1x = altNum / 2;
            d2x = altNum / 2;
            d1y = radio;
            d2y = radio;
            d1z = radio;
            d2z = radio;
        // Cilindro de pie
        } else {
            cgX = 0;
            cgY = 0;
            cgZ = altNum / 2;

            const radio = diamNum / 2;
            d1x = radio;
            d2x = radio;
            d1y = radio;
            d2y = radio;
            d1z = altNum / 2;
            d2z = altNum / 2;
        }
    } else if (forma === 'Rectángulo' || forma === 'Paralelepípedo') {
        if (isNaN(altNum) || isNaN(largoNum) || isNaN(anchoNum)) return null;
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
