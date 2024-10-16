import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import icon from './assets/EI-Montajes.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={icon} style={{ width: 305, height: 130 }} />
      <Text>App de Plan de Izaje.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
