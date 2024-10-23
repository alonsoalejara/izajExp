import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import icon from './assets/EI-Montajes.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={icon} style={{
        width: 200, 
        height: 100,
        resizeMode: 'contain',
        }} />
      <Text style={{color: 'white'}}>App de Plan de Izaje.</Text>
      <StatusBar style="light" />
      <Button 
        title="Pulsa aquí" 
        onPress = {() => alert('Hola amigos!')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
