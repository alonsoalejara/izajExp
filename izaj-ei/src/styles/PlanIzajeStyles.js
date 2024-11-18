import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco para modo claro
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#f5f5f5', // Fondo gris claro para las secciones
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333', // Texto oscuro
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#666', // Texto gris oscuro
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e0e0e0', // Fondo gris claro para inputs
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    color: '#333', // Texto oscuro
    width: '100%', // Ajustado a todo el ancho
  },
  result: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
  },
  formula: {
    fontSize: 12,
    color: '#333', // Texto oscuro para la fórmula
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ee0000', // Rojo
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff', // Texto blanco en el botón
    fontSize: 16,
  },
});

export default styles;
