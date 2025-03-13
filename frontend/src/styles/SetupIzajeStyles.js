import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Iconos
  icon: {
    marginLeft: 10,
  },
  // Contenedores
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  contentContainer: {
    padding: 0,
  },
  titleContainer: {
    backgroundColor: 'white',
    marginTop: 100,
    top: 15,
    marginVertical: 0,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 3,
    height: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, 
    marginVertical: 20,
  },
  // Titulos y textos
  sectionTitle: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 31,
    marginBottom: 15,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    marginBottom: 0,
  },
  // Visualización de forma para SetupCarga.js
  shapeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1,
  },

  visualizationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
  },
  // Errores
  inputField: {
    width: 150,
    marginBottom: 5, // Espacio entre el error y el input
  },
  errorText: {
    top: 13,
    left: 1,
    color: 'red',
    fontSize: 16,
    marginBottom: 3, // Espacio entre el error y el input
  },
});

export default styles;
