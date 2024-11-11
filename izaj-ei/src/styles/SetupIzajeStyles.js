import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  shapeSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  shapeOption: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  selectedShape: {
    backgroundColor: '#4CAF50', // Color cuando está seleccionado
    borderColor: '#388E3C',
  },
  unselectedShape: {
    backgroundColor: '#FFF',
    borderColor: '#BDBDBD',
  },
  shapeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedShapeText: {
    color: '#fff',
  },
  unselectedShapeText: {
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, // Reducido margen
  },
  input: {
    width: '80%', // Reducido para permitir espacio para las unidades
    padding: 8,   // Reducido padding
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    borderColor: '#ccc',
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitButton: {
    backgroundColor: '#E0E0E0',
    padding: 5,   // Reducido padding
    borderRadius: 5,
    marginLeft: 10,
  },
  unitText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  confirmButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#888',
  },
  pulgText: {
    fontSize: 16,
    color: '#000',
  },

  // Estilos adicionales
  shapeSelectionButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc', // Color gris cuando el botón está deshabilitado
  },
  enabledButton: {
    backgroundColor: '#4CAF50',  // Color verde cuando el botón está habilitado
  },

  // Nueva sección de unidades
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },

  input: {
    width: '70%',  // Reducido aún más el ancho
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },

  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',  // Alinea verticalmente los inputs y las unidades
  },

  unitButton: {
    marginLeft: 10,
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
  },

  unitText: {
    fontSize: 16,
  },

  // Modal para Maniobras
  maniobraModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  maniobraModalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  maniobraModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  maniobraOption: {
    padding: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 5,
  },
  maniobraOptionText: {
    fontSize: 16,
  },
  maniobraConfirmButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginTop: 10,
  },
  maniobraConfirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  maniobraCloseButton: {
    marginTop: 10,
  },
  maniobraCloseButtonText: {
    color: '#888',
  },

  // Botón para abrir el modal de maniobras
  openManiobraModalButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  openManiobraModalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
