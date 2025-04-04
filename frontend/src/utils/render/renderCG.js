import React from 'react';
import { View, Image } from 'react-native';

const RenderCG = ({ forma }) => {
  if (!forma) return null;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -33, marginBottom: 20 }}>
      {forma === 'Cilindro' && (
        <>
          <Image
            source={require('../../../assets/cg-rectangulo.png')}
            style={{ width: 150, height: 150, resizeMode: 'contain' }}
          />
          <Image
            source={require('../../../assets/cg-circulo.png')}
            style={{ width: 150, height: 150, resizeMode: 'contain' }}
          />
        </>
      )}
      {forma === 'Cuadrado' && (
        <>
          <Image
            source={require('../../../assets/cg-cuadrado.png')}
            style={{ width: 150, height: 150, resizeMode: 'contain' }}
          />
          <Image
            source={require('../../../assets/cg-cuadrado.png')}
            style={{ width: 150, height: 150, resizeMode: 'contain' }}
          />
        </>
      )}
      {forma === 'Rectángulo' && (
        <>
          <Image
            source={require('../../../assets/cg-rectangulo.png')}
            style={{ width: 150, height: 150, resizeMode: 'contain' }}
          />
          <Image
            source={require('../../../assets/cg-cuadrado.png')}
            style={{ width: 150, height: 150, resizeMode: 'contain' }}
          />
        </>
      )}
    </View>
  );
};

export default RenderCG;