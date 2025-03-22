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

  visualizationCargaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
  },
  visualizationGruaContainer: {
    marginTop: 20,
    flex: 0,
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  // Render de plano cartesiano
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gruaOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
  // Aparejos
  selectedManiobraContainer: {
    minHeight: 50, // Asegura un tamaño mínimo
    paddingVertical: 5, // Agrega espacio interno
    justifyContent: 'center', // Centra el contenido si es más corto
  },
  selectedManiobraText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginVertical: 5,
  },
  
});

export default styles;
