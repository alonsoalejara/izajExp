import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RenderGrid = ({ boomLength }) => {
  const totalColumns = 11;
  const totalRows = 12;
  const squareSize = 30;
  const initialYValues = [33.5, 26.9, 24.3, 19.8, 15.2, 10.5];

  // Resto de la lógica para crear la cuadrícula y los ejes...
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

  const axisY = [];
  const step = (totalRows - 1) / (initialYValues.length - 1);

  initialYValues.forEach((value, index) => {
    const rowPosition = Math.round(step * index);
    let topPosition = rowPosition * squareSize + squareSize / 2;

    if (value === 33.5) {
      topPosition -= 5;
    } else if (value === 26.9) {
      topPosition -= 20;
    } else if (value === 24.3) {
      topPosition -= 36;
    } else if (value === 19.8) {
      topPosition -= 80;
    } else if (value === 15.2) {
      topPosition -= 95;
    } else if (value === 10.5) {
      topPosition -= 110;
    }

    axisY.push(
      <Text
        key={`y-${index}`}
        style={[
          styles.axisLabelY,
          {
            top: topPosition,
            right: -165,
            fontSize: 10,
          },
        ]}
      >
        {value} m
      </Text>
    );
  });

  
  let rightPosition = 105;
  const boomLengthNum = parseFloat(boomLength) || 0;

  switch (boomLengthNum) {
    case 10.5:
      rightPosition = 188;
      break;
    case 15.2:
      rightPosition = 188;
      break;
    case 19.8:
      rightPosition = 188;
      break;
    case 24.3:
      rightPosition = 190;
      break;
    case 26.9:
      rightPosition = 189;
      break;
    case 33.5:
      rightPosition = 160;
      break;
    default:
      rightPosition = 105;
      break;
  }

  return (
    <View style={[styles.grid, { right: rightPosition }]}>
      {squares}
      {axisX}
      {axisY}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    position: 'relative',
    top: -244,
    width: 200,
    height: 400,
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
    bottom: 15,
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