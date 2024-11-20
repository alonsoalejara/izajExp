import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const ModalStyles = StyleSheet.create({
  modalContainer: {
    ...CommonStyles.modalContainer,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Opacidad específica para este modal
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    ...CommonStyles.textBold,
    fontSize: 18,
    marginBottom: 30,
    color: '#333',
  },
  optionButton: {
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  placeholderText: {
    color: '#aaa', // Define aquí el color del placeholder
  },
  closeButton: {
    ...CommonStyles.button,
    backgroundColor: '#f5f5f5', // Fondo claro
    padding: 10,
  },
  closeButtonText: {
    ...CommonStyles.text,
    color: '#ee0000', // Texto rojo
    fontSize: 16,
  },
  saveButton: {
    ...CommonStyles.button,
    backgroundColor: '#ee0000', // Fondo rojo específico
    padding: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ModalStyles;
