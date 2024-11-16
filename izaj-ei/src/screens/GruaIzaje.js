import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, PanResponder } from 'react-native';
import GruaIllustration from '../components/GruaIllustration';
import PlanoCartesiano from '../components/PlanoCartesiano';

export default function GruaIzaje() {
  const [brazoAngle, setBrazoAngle] = useState(25);
  const [intervalId, setIntervalId] = useState(null);

  // Función para redondear el ángulo a dos decimales
  const roundToTwoDecimals = (angle) => {
    if (isNaN(angle)) return 0; // Si el valor no es un número, devolver 0
    return parseFloat(angle.toFixed(2)); // Redondear a dos decimales
  };

  // PanResponder para detectar el arrastre del brazo
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const deltaX = gestureState.dx; // Desplazamiento horizontal
      let newAngle = brazoAngle + deltaX * 0.1; // Ajusta la sensibilidad del arrastre
      newAngle = Math.min(Math.max(newAngle, 25), 65); // Limitar entre 25° y 65°
      setBrazoAngle(roundToTwoDecimals(newAngle)); // Redondear antes de actualizar el estado
    },
    onPanResponderRelease: () => {
      clearInterval(intervalId);
      setIntervalId(null);
    },
  });

  const rotateBrazoForward = () => {
    setBrazoAngle((prevAngle) => {
      const newAngle = prevAngle < 65 ? prevAngle + 1 : prevAngle;
      return roundToTwoDecimals(newAngle); // Redondear antes de actualizar el estado
    });
  };

  const rotateBrazoBackward = () => {
    setBrazoAngle((prevAngle) => {
      const newAngle = prevAngle > 25 ? prevAngle - 1 : prevAngle;
      return roundToTwoDecimals(newAngle); // Redondear antes de actualizar el estado
    });
  };

  const handleLongPress = (direction) => {
    const newIntervalId = setInterval(() => {
      setBrazoAngle((prevAngle) => {
        let newAngle = prevAngle;

        if (direction === 'forward' && prevAngle < 65) {
          newAngle = prevAngle + 1;
        } else if (direction === 'backward' && prevAngle > 25) {
          newAngle = prevAngle - 1;
        }

        return Math.min(Math.max(roundToTwoDecimals(newAngle), 25), 65);
      });
    }, 100);

    setIntervalId(newIntervalId);
  };

  const handlePressOut = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Plano Cartesiano */}
      <PlanoCartesiano />

      {/* Ilustración de la grúa */}
      <View
        style={{ position: 'absolute', left: 20, alignItems: 'flex-start' }}
        {...panResponder.panHandlers} // Conectar el PanResponder
      >
        <GruaIllustration brazoAngle={brazoAngle} gruaPosX={0} gruaPosY={0} />
      </View>

      <View style={{ position: 'absolute', bottom: 80 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Ángulo del Brazo: {brazoAngle}°
        </Text>
      </View>

      <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20 }}>
        <TouchableOpacity
          onPress={rotateBrazoBackward}
          onLongPress={() => handleLongPress('backward')}
          onPressOut={handlePressOut}
          style={{
            padding: 10,
            backgroundColor: brazoAngle === 25 ? 'gray' : '#007bff',
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          disabled={brazoAngle === 25}
        >
          <Text style={{ color: 'white' }}>Retroceder Brazo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={rotateBrazoForward}
          onLongPress={() => handleLongPress('forward')}
          onPressOut={handlePressOut}
          style={{
            padding: 10,
            backgroundColor: brazoAngle === 65 ? 'gray' : '#007bff',
            borderRadius: 5,
            marginHorizontal: 5,
          }}
          disabled={brazoAngle === 65}
        >
          <Text style={{ color: 'white' }}>Avanzar Brazo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
