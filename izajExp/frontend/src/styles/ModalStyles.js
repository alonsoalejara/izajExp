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
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    ...CommonStyles.textBold,
    fontSize: 18,
    marginBottom: 30,
    marginTop: 20,
    color: '#333',
    
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    marginTop: 8,
    color: '#333',
  },
   selectedOption: {
    backgroundColor: '#aa0000',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#f5f5f5', 
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
});

export default ModalStyles;
