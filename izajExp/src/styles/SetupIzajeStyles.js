import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    marginBottom: 0,
  },
  grilleteInfo: {
    marginBottom: -60,
  },
  maniobraInfo: {
    marginBottom: -60,
  },
  formSection: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  formTitle: {
    ...CommonStyles.textBold,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: 10,
    color: '#333',
  },
  formTitleNoContainer: {
    ...CommonStyles.textBold,
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: -10,
    color: '#000',
    textAlign: 'center',
  },
  label: {
    ...CommonStyles.text,
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    ...CommonStyles.input,
    padding: 8,
    width: 220,
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  placeholderText: {
    color: '#aaa',
  },
  unitText: {
    ...CommonStyles.text,
    fontSize: 18,
    color: '#666',
    marginLeft: 6,
  },
  button: {
    ...CommonStyles.button,
    backgroundColor: '#ee0000',
    marginVertical: 10,
    marginBottom: 40,
  },
  buttonText: {
    ...CommonStyles.buttonText,
  },
  title: {
    ...CommonStyles.text,
    fontSize: 18,
    fontWeight: '500',
    marginTop: -20,
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
    ...CommonStyles.textBold,
    fontSize: 15,
    color: '#333',
  },
  maniobrasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
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
