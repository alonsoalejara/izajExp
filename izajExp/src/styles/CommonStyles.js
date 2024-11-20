import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
  // Tipografía general
  text: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#333',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCentered: {
    textAlign: 'center',
  },

  // Botones comunes
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
  },
  buttonDanger: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  // Contenedores básicos
  container: {
    flex: 1,
    backgroundColor: '#d5d5d5',
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  // Inputs comunes
  input: {
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },

  // Placeholder de inputs
  placeholderText: {
    color: '#aaa', // Placeholder gris claro
  },
});

export default CommonStyles;
