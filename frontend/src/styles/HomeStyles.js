import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const HomeStyles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '115%', 
    height: '115%', 
    resizeMode: 'cover', 
    position: 'absolute',
    top: -50,
    left: -19,
  },
  gradient: {
    position: 'absolute',
    top: -50,
    left: -20,
    width: '120%',
    height: '120%',
  },
  logo: {
    position: 'absolute',
    top: '20%',
    left: '-24%',
    alignSelf: 'center',
    width: 500,
    height: 140,
  },
  button: {
    ...CommonStyles.button,
    ...CommonStyles.buttonDanger,
    position: 'absolute',
    bottom: 55,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  buttonText: {
    ...CommonStyles.buttonText,
  },
});

export default HomeStyles;