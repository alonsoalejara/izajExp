import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 36,
    marginBottom: 0,
  },
  formSection: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    width: 220,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 0,
    borderColor: '#ccc',
    borderRadius: 0,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  placeholderText: {
    color: '#aaa',
  },
  unitText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#ee0000',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: -10,
    marginBottom: 5,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  optionButton: {
    padding: 20,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  maniobrasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  selectedOption: {
    backgroundColor: '#aa0000',
  },
  selectedOptionText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#ee0000',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#ee0000',
    padding: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  formMarginTop: {
    marginTop: 20,
  },
});

export default styles;
