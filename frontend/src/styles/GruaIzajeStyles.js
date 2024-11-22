import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const GruaIzajeStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...CommonStyles.text,
    ...CommonStyles.textBold,
    fontSize: 24,
  },
  button: {
    ...CommonStyles.button,
    ...CommonStyles.buttonPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default GruaIzajeStyles;
