import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function PlanoCartesiano() {
  const gridSize = 20;  // Tamaño de cada celda en la cuadrícula
  const gridCountX = Math.floor(350 / gridSize); // Número de celdas horizontales según el ancho del contenedor
  const gridCountY = Math.floor(400 / gridSize); // Número de celdas verticales según el alto del contenedor

  // Función para renderizar las líneas de la cuadrícula
  const renderGrid = () => {
    let gridLines = [];
    
    // Dibujar las líneas verticales
    for (let i = 0; i <= gridCountX; i++) {
      gridLines.push(
        <View
          key={`vertical-${i}`}
          style={[styles.gridLine, {
            left: i * gridSize,
            height: '100%',
          }]}
        />
      );
    }

    // Dibujar las líneas horizontales
    for (let i = 0; i <= gridCountY; i++) {
      gridLines.push(
        <View
          key={`horizontal-${i}`}
          style={[styles.gridLine, {
            top: i * gridSize,
            width: '100%',
          }]}
        />
      );
    }

    return gridLines;
  };

  return (
    <View style={styles.container}>
      {/* Cuadrícula */}
      {renderGrid()}

      {/* Ejes X y Y */}
      <View style={styles.axisX} />
      <View style={styles.axisY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 45,
    left: 2,
    width: 350,
    height: 400,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 20,
  },
  axisX: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    backgroundColor: 'black',
    zIndex: 0, // Asegura que los ejes estén debajo de la grúa
  },
  axisY: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 1,
    height: '100%',
    backgroundColor: 'black',
    zIndex: 0, // Asegura que los ejes estén debajo de la grúa
  },
  gridLine: {
    position: 'absolute',
    borderColor: '#ddd',
    borderWidth: 0.5,
    zIndex: 0, // La cuadrícula debe estar detrás de la grúa
  },
});
