import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RenderGrid = ({ boomLength }) => {
  const totalColumns = 11;
  const totalRows = 12;
  const squareSize = 30;
  const initialYValues = [33.5, 26.9, 24.3, 19.8, 15.2, 10.5];

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
  let topGridPosition = -2;
  const boomLengthNum = parseFloat(boomLength) || 0;

  switch (boomLengthNum) {
    case 10.5:
      rightPosition = 50;
      topGridPosition = -1;
      break;
    case 15.2:
      rightPosition = 52;
      topGridPosition = 6;
      break;
    case 19.8:
      rightPosition = 56;
      topGridPosition = -2; 
      break;
    case 24.3:
      rightPosition = 64;
      topGridPosition = -18;
      break;
    case 26.9:
      rightPosition = 65;
      topGridPosition = -23;  
      break;
    case 33.5:
      rightPosition = 48;
      topGridPosition = -25;
      break;
    default:
      rightPosition = 50;
      topGridPosition = -1;
      break;
  }

  return (
    <View style={[styles.grid, { right: rightPosition, top: topGridPosition }]}>
      {squares}
      {axisX}
      {axisY}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    position: 'relative',
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