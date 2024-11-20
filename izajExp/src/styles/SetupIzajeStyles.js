import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    marginBottom: 0, // Específico para este diseño
  },
  formSection: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  formTitle: {
    ...CommonStyles.textBold,
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  label: {
    ...CommonStyles.text,
    fontSize: 18,
    color: '#666', // Específico para este diseño
    marginBottom: 10,
  },
  input: {
    ...CommonStyles.input,
    padding: 8, // Ajuste específico
    width: 220,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  placeholderText: {
    color: '#aaa',
  },
  unitText: {
    ...CommonStyles.text,
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  button: {
    ...CommonStyles.button,
    backgroundColor: '#ee0000', // Color rojo específico
    marginVertical: 10,
    marginBottom: 40,
  },
  buttonText: {
    ...CommonStyles.buttonText,
  },
  title: {
    ...CommonStyles.text,
    fontSize: 18,
    fontWeight: '300',
    marginTop: -10,
    marginBottom: 5,
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
    ...CommonStyles.textBold,
    fontSize: 15,
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
    ...CommonStyles.text,
    color: '#fff',
  },
  formMarginTop: {
    marginTop: 20,
  },
});

export default styles;
