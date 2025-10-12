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
    marginBottom: 18,
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
      alignItems: 'flex-end',
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
    top: 5,
    marginBottom: -3, // Espacio entre el error y el input
  },
  errorText: {
    top: -12,
    left: 1,
    color: 'red',
    fontSize: 16,
  },
  // Aparejos
  selectedManiobraContainer: {
    minHeight: 50, // Asegura un tamaño mínimo
    paddingVertical: 5, // Agrega espacio interno
    justifyContent: 'center', // Centra el contenido si es más corto
  },
  selectedManiobraText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginVertical: 0,
  },
  configButton: {
    marginTop: 14,
  },
  eslingaImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  numericInput: {
    width: '100%',
    top: 25,
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#eee',
  },
  grilleteCantidadInput: {
    width: '50%',
    height: '77%',
    top: 30,
    backgroundColor: '#fff',
  },
  grilleteTipoButton: {
    width: '48%',
    top: 25,
    backgroundColor: '#fff',
  },
  volverButton: {
    backgroundColor: 'transparent',
    marginRight: -50,
  },
  continuarButton: {
    width: '97%',
  },
  // Estilos para la sección de responsables adicionales en SetupPlan.js
  responsablesAdicionalesContainer: {
    marginTop: 0,
  },
  responsableAdicionalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 5,
    marginBottom: 10,
  },
  responsableAdicionalInfo: {
    flexDirection: 'column',
  },
  responsableAdicionalNombre: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  responsableAdicionalRol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eliminarIcon: {
    marginLeft: 10,
  },
  agregarResponsableBoton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 0,
    left: -153,
    alignItems: 'center',
  },
  agregarResponsableInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  agregarResponsableBotones: {
    marginTop: 30,
    top: 15,
    left: -60,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  continuarButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 50,
    alignItems: 'center',
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#00aa00',
  },
  illustrationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageWrapper: {
    width: '100%', // O el ancho que desees para el contenedor
    height: 250,  // Altura fija, puedes ajustarla
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ff00', // Ejemplo de color de fondo para visualizar
  },
  craneImage: {
    top: 0,
    right: 10,
    width: '150%', // La imagen ocupa todo el ancho del contenedor padre (imageWrapper)
    height: '150%',// La imagen ocupa toda la altura del contenedor padre
    resizeMode: 'contain',
  },
});

export default styles;