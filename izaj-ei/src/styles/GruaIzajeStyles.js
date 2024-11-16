import { StyleSheet } from 'react-native';

const GruaIzajeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',          // Color oscuro para el título
    textAlign: 'center',     // Centrado
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,     // Ajuste de padding para altura uniforme
    paddingHorizontal: 20,   // Mayor ancho de padding
    backgroundColor: '#007bff', // Azul para el botón
    borderRadius: 8,         // Bordes más redondeados
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,            // Sombra para efecto de elevación en Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',       // Negrita para destacar el texto
    textAlign: 'center',
  },
});

export default GruaIzajeStyles;
