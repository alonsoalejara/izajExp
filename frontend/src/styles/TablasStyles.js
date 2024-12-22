import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

// Función reutilizable para estilos de celdas
const cellStyle = (padding = 8, textAlign = 'center', fontSize = 12) => ({
  padding,
  borderWidth: 1,
  borderColor: '#ccc',
  textAlign,
  backgroundColor: '#fff',
  fontSize,
});

const TablasStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  table: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: cellStyle(), // Estilo base para celdas
  headerCell: {
    ...cellStyle(8, 'center', 16),
    backgroundColor: '#eaeaea',
    fontWeight: 'bold',
  },
  descripcionColumn: {
    flex: 2,
    paddingLeft: 8,
    textAlign: 'left',
  },
  totalColumn: {
    flex: 5,
    backgroundColor: '#eaeaea',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 10,
  },
  numberColumn: {
    backgroundColor: '#cccccc',
    flex: 1.1,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 10,
    paddingRight: 4,
  },
  valueColumn: {
    flex: 1.1,
    textAlign: 'right',
    paddingRight: 4,
  },
  fullRow: {
    backgroundColor: '#eaeaea',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullRowText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    ...CommonStyles.button,
    backgroundColor: '#ee0000',
    marginVertical: 20,
  },
  buttonText: {
    ...CommonStyles.buttonText,
  },
});

export default TablasStyles;