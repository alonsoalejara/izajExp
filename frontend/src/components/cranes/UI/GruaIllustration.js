import React from 'react'; 
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import RT555 from '../../cranes/RT555/RT555.index';

export default function GruaIllustration({ style, alturaType, inclinacion = 75, radioTrabajoMaximo }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={[styles.box, style]}>
          <View style={styles.gruaContainer}>
            <RT555.BaseGrua />
            <RT555.RuedasGrua />
            <RT555.Boom alturaType={alturaType} inclinacion={inclinacion} radioTrabajoMaximo={radioTrabajoMaximo} />
            <RT555.CabinaGrua />
            <RT555.CraneHook />
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
