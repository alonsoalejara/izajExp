import React from 'react';
import { View } from 'react-native';

const GuardacaboEstrobo = () => {
  return (
    <View style={{ position: 'absolute', bottom: 40, left: 115, flexDirection: 'row', alignItems: 'center' }}>
      
      {/* 🔹 Derecho (Casquillo + Ojo) */}
      <View style={{ alignItems: 'center', left: 78 }}>
        {/* Ojo Derecho */}
        <View
          style={{
            width: 20,
            height: 23,
            backgroundColor: 'transparent',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderWidth: 4,
            top: 6,
            borderColor: '#CECECE',
            transform: [{ rotate: '-90deg' }],
          }}
        />
        {/* Casquillo Derecho */}
        <View
          style={{
            width: 13,
            height: 20,
            backgroundColor: '#00BFFF',
            borderRadius: 2,
            right: 17,
            bottom: 15,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            transform: [{ rotate: '90deg' }],
          }}
        />
      </View>

      {/* 🔹 Izquierdo (Casquillo + Ojo) */}
      <View style={{ alignItems: 'center', right: 70 }}>
        {/* Ojo Izquierdo */}
        <View
          style={{
            width: 20,
            height: 23,
            backgroundColor: 'transparent',
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderWidth: 4,
            top: 6,
            borderColor: '#CECECE',
            transform: [{ rotate: '90deg' }],
          }}
        />
        {/* Casquillo Izquierdo */}
        <View
          style={{
            width: 13,
            height: 20,
            backgroundColor: '#00BFFF',
            borderRadius: 2,
            left: 18,
            bottom: 15,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            transform: [{ rotate: '-90deg' }],
          }}
        />
      </View>


    </View>
  );
};

export default GuardacaboEstrobo;
