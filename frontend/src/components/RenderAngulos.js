import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RenderAngulos = ({ anguloSeleccionado, setAnguloSeleccionado }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 5, right: 25 }}>
    {['60', '45', '30'].map(angle => (
      <TouchableOpacity
        key={angle}
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => setAnguloSeleccionado(angle)}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#ee0000',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 5,
          }}
        >
          {anguloSeleccionado === angle && (
            <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#ee0000' }} />
          )}
        </View>
        <Text>{angle}°</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default RenderAngulos;