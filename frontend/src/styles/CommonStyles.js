import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
  // Tipografía general
  text: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#333', // Texto oscuro
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCentered: {
    textAlign: 'center',
  },

  // Título general
  title: {
    fontSize: 24, // Más destacado
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Cambiado a texto oscuro
  },

  // Botones comunes
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5, // Cambiado a 5 para bordes más suaves
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#ee0000', // Rojo
  },
  buttonDanger: {
    backgroundColor: '#f44336', // Rojo claro
  },
  buttonText: {
    color: '#fff', // Texto blanco en el botón
    fontWeight: '600',
    fontSize: 16,
  },

  // Contenedores básicos
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente para modal
  },

  // Secciones
  section: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#f5f5f5', // Fondo gris claro para las secciones
    borderRadius: 10, // Bordes redondeados de 10
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333', // Texto oscuro
    marginBottom: 10,
    fontWeight: 'bold',
  },

  // Inputs comunes
  input: {
    backgroundColor: '#e0e0e0', // Fondo gris claro
    borderWidth: 1,
    borderColor: '#ccc', // Borde gris claro
    borderRadius: 5, // Bordes redondeados
    padding: 10,
    fontSize: 16,
    color: '#333', // Texto oscuro
    marginLeft: -3,
    width: '100%', // Ajustado a todo el ancho
  },

  // Placeholder de inputs
  placeholderText: {
    color: '#aaa', // Placeholder gris claro
  },

  // Resultado
  result: {
    fontSize: 16,
    color: 'red', // Color rojo para resultado
    marginTop: 5,
  },

  // Fórmula
  formula: {
    fontSize: 12,
    color: '#333', // Texto oscuro para la fórmula
    marginTop: 10,
  },
});

export default CommonStyles;
