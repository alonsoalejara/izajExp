import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const ModalStyles = StyleSheet.create({
  modalContainer: {
    ...CommonStyles.modalContainer,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    padding: 0,
    marginTop: 330,
    paddingHorizontal: 40,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    flex: 1,
  },
  dragLine: {
    width: 40,
    height: 4,
    backgroundColor: '#888',
    alignSelf: 'center',
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 6,
    marginHorizontal: -88,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: -15,
  },
  backIcon: {
    marginBottom: 0,
    marginLeft: -35,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    ...CommonStyles.textBold,
    fontSize: 18,
    marginBottom: 30,
    marginTop: 30,
    marginLeft: -25,
    textAlign: 'center',
    color: '#333',
    flex: 1,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#ddd',
    width: 370,
    marginTop: -25,
    marginBottom: 20,
    marginLeft: -35,
    marginRight: -35,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  optionButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginLeft: -25,
    color: '#333',
  },
   selectedOption: {
    borderWidth: 1,
    borderColor: '#ee0000',
    backgroundColor: '#ffb3b3',
  },
  optionText: {
    color: '#999',
    fontSize: 16,
  },
  selectedOptionText: {
    fontWeight: '500',
    color: '#ee0000', 
  },
  buttonText: {
    ...CommonStyles.buttonText,
  },
  placeholderText: {
    color: '#aaa',
  },
  closeButton: {
    ...CommonStyles.button,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  closeButtonText: {
    ...CommonStyles.text,
    color: '#ee0000',
    fontSize: 16,
  },
  saveButton: {
    ...CommonStyles.button,
    backgroundColor: '#ee0000',
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  picker: {
    backgroundColor: '#f5f5f5',
    color: '#000',
  },
    // Estilo para el contenedor del menú desplegable
    menuContainer: {
      position: 'absolute', // Se posiciona sobre otros elementos
      top: 336,  // Ajusta según el espacio disponible
      left: 20,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      zIndex: 999,  // Asegura que el menú esté sobre otros componentes
      maxHeight: 150, // Máxima altura del menú
    },

    // Estilo para el contenedor del menú desplegable
    menuContainerGrillete: {
      position: 'absolute', // Se posiciona sobre otros elementos
      top: 207,  // Ajusta según el espacio disponible
      left: 20,
      right: 20,
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      zIndex: 999,  // Asegura que el menú esté sobre otros componentes
      maxHeight: 150, // Máxima altura del menú
    },
    
    // Estilo para los ítems del menú desplegable
    menuItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    
    // Estilo para el texto dentro de cada ítem
    menuText: {
      fontSize: 16,
      color: '#333',
    },
  
    // Estilo para el ítem seleccionado
    selectedMenuItem: {
      backgroundColor: '#ee0000',  // Cambia el color de fondo cuando el ítem está seleccionado
    },
  
    // Estilo para el texto de un ítem seleccionado
    selectedMenuText: {
      color: '#fff',  // Cambia el color del texto cuando el ítem está seleccionado
    },
    modalDescription: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',  // Centrado para el mensaje
    },  
  
});

export default ModalStyles;
