const calculations = {
    calculateGrossLoad: (hookWeight, toolsWeight, loadWeight, otherWeights) => {
        return hookWeight + toolsWeight + loadWeight + otherWeights;
    },
    calculateUtilization: (grossLoad, maxCapacity) => {
        if (maxCapacity === 0) return 0; // Evitar división por cero
        return (grossLoad / maxCapacity) * 100;
    },
    calculateRadiusDifference: (radioIzaje, radioMontaje) => {
        return Math.abs(radioIzaje - radioMontaje);
    },
    calculateSafetyFactor: (grossLoad, maxCapacity) => {
        if (grossLoad === 0) return 0; // Evitar división por cero
        return maxCapacity / grossLoad;
    },
    calculateManiobraCapacity: (cantidadManiobra, tipoManiobra) => {
        const factor = tipoManiobra === "eslinga" ? 1.5 : 1.2; // Ejemplo de factores según el tipo
        return cantidadManiobra * factor;
    },
};

export default calculations;