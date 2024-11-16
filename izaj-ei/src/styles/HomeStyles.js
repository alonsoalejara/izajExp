import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      position: 'absolute',
      left: 0,
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    logo: {
      position: 'absolute',
      top: '40%',  // Centra verticalmente
      left: '34%', // Centra horizontalmente
      transform: [{ translateX: -100 }, { translateY: -200 }], // Ajuste para que esté perfectamente centrado
      width: '80%',
      height: '20%',
    },
    button: {
      position: 'absolute',
      bottom: 55,
      backgroundColor: 'red',
      paddingVertical: 15,
      paddingHorizontal: 100,
      borderRadius: 30,
    },
    buttonText: {
      fontFamily: 'Arial',  
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default styles;