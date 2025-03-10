import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import RT555 from '../../cranes/RT555/RT555.index';

// Componente de los cables de la grúa
function CablesGrua() {
  return (
    <View style={styles.cablesContainer}>
      <View style={styles.cable} />
      <View style={[styles.cable, { left: -376 }]} />
    </View>
  );
}

export default function GruaIllustration() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.box,
            {
              transform: [{ scale: 0.4 }],
              top: -200, // Ajusta la posición vertical aquí
              left: 11, // Ajusta la posición horizontal aquí
            },
          ]}
        >
          <View style={styles.gruaContainer}>
            <RT555.BaseGrua />
            <RT555.RuedasGrua />
            <CablesGrua />
            <RT555.BrazoGrua />
            <RT555.CabinaGrua />
            <RT555.GanchoGrua />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: 200,
    width: 200,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gruaContainer: {
    position: 'relative',
  },
  cablesContainer: {
    position: 'absolute',
    left: 16,
  },
  cable: {
    width: 1.5,
    height: 200,
    backgroundColor: '#0000aa',
    position: 'absolute',
    left: -364,
    bottom: 630,
  },
});
