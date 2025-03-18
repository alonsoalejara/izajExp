import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RenderGrid = () => {
  const totalColumns = 11; // Número de columnas
  const totalRows = 12; // Número de filas
  const squareSize = 30; // Tamaño de cada cuadrado

  // Los valores específicos para el eje Y (invertidos)
  const initialYValues = [33.5, 26.9, 24.3, 19.8, 15.2, 10.5];

  // Crear la cuadrícula
  const squares = [];
  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalColumns; col++) {
      squares.push(
        <View
          key={`${row}-${col}`}
          style={[styles.square, { left: col * squareSize, top: row * squareSize }]}
        />
      );
    }
  }

  // Eje X invertido (muestra 3 m, 6 m, …, 33 m)
  const axisX = [];
  for (let i = totalColumns - 1; i >= 0; i--) {
    axisX.push(
      <Text
        key={`x-${i}`}
        style={[styles.axisLabelX, { left: i * squareSize + squareSize / 2 }]}
      >
        {`${(totalColumns - i) * 3} m`}
      </Text>
    );
  }

  // Crear los números del eje Y
  const axisY = [];
  const step = (totalRows - 1) / (initialYValues.length - 1); // Paso calculado entre los valores de Y

  initialYValues.forEach((value, index) => {
    const rowPosition = Math.round(step * index); // Calculamos la posición de cada valor en el eje Y

    let topPosition = rowPosition * squareSize + squareSize / 2; // Posición base

    // Usamos if-else para mover cada valor por separado
    if (value === 33.5) {
      topPosition -= 5; // Mueve 33.5 hacia abajo
    } else if (value === 26.9) {
      topPosition -= 20; // Mueve 26.9 hacia arriba
    } else if (value === 24.3) {
      topPosition -= 36; // Mueve 24.3 hacia abajo
    } else if (value === 19.8) {
      topPosition -= 80; // Mueve 19.8 hacia arriba
    } else if (value === 15.2) {
      topPosition -= 95; // Mueve 15.2 hacia abajo
    } else if (value === 10.5) {
      topPosition -= 110; // Mueve 10.6 hacia arriba
    }

    axisY.push(
      <Text
        key={`y-${index}`}
        style={[
          styles.axisLabelY,
          {
            top: topPosition,
            right: -165, // Puedes mover este valor según necesites (por ejemplo, para ajustarlo más a la derecha o izquierda)
            fontSize: 10,
          },
        ]}
      >
        {value} m
      </Text>
    );
  });

  return (
    <View style={styles.grid}>
      {squares}
      {axisX}
      {axisY}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    position: 'relative',
    top: -1,
    right: 215,
    width: 200, // Ancho total para la cuadrícula (espacio para los números externos)
    height: 400, // Alto total para la cuadrícula
    marginTop: 0,
    marginLeft: 0,
    backgroundColor: 'transparent',
  },
  square: {
    position: 'absolute',
    width: 31,
    height: 30,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  axisLabelX: {
    position: 'absolute',
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    bottom: 15, // Los números del eje X estarán debajo de la cuadrícula
    marginLeft: -20,
    transform: [{ translateX: -10 }],
  },
  axisLabelY: {
    position: 'absolute',
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    transform: [{ translateY: -15 }],
  },
});

export default RenderGrid;
