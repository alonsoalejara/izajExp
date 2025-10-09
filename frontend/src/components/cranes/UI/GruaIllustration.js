import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import RT555 from '../../cranes/RT555/RT555.index';

// 📍 Posiciones de la grúa según largo de pluma
const plumaPositionMap = {
  '10.5 m': { left: 40, top: 0 },
  '15.2 m': { left: 30, top: 34 },
  '19.8 m': { left: 10, top: -10 },
  '24.3 m': { left: -30, top: -80 },
  '26.9 m': { left: -40, top: -110 },
  '33.5 m': { left: 50, top: -120 },
};

export default function GruaIllustration({
  style,
  alturaType,
  inclinacion = 75,
  radioTrabajoMaximo,
  largoPluma,
}) {
  const gruaPositionStyle = plumaPositionMap[largoPluma] || {};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.box, style]}>
          <View style={[styles.gruaContainer, gruaPositionStyle]}>
            {/* 🏗️ Partes de la grúa */}
            <RT555.BaseGrua />
            <RT555.RuedasGrua />
            <RT555.Boom
              alturaType={alturaType}
              inclinacion={inclinacion}
              radioTrabajoMaximo={radioTrabajoMaximo}
            />
            <RT555.CabinaGrua />
            <RT555.CraneHook
              alturaType={alturaType}
              inclinacion={inclinacion}
              radioTrabajoMaximo={radioTrabajoMaximo}
            />
            <RT555.Rigging
              alturaType={alturaType}
              inclinacion={inclinacion}
              radioTrabajoMaximo={radioTrabajoMaximo}
            />
            <RT555.CargaGrua
              alturaType={alturaType}
              inclinacion={inclinacion}
              radioTrabajoMaximo={radioTrabajoMaximo}
            />
            <RT555.AngleIndicator
              alturaType={alturaType}
              inclinacion={inclinacion}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 200,
    width: 200,
    top: 268,
    left: 30,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gruaContainer: {
    position: 'relative',
  },
});
