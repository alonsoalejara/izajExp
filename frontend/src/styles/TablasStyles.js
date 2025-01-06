import { StyleSheet } from 'react-native';
import CommonStyles from './CommonStyles';

const cellStyle = (padding = 4.5, textAlign = 'center', fontSize = 12.7) => ({
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
    backgroundColor: '#fff',
    paddingHorizontal: 45,
    paddingTop: 36,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    marginBottom: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
    flex: 4.8,
    paddingLeft: 7,
    textAlign: 'left',
  },
  totalColumn: {
    flex: 6.3,
    backgroundColor: '#eaeaea',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 10,
  },
  valueColumn: {
    flex: 1.5,
    textAlign: 'right',
    fontSize: 13,
    paddingVertical: 10,
  },
  numberColumn: {
    backgroundColor: '#cccccc',
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 13,
    paddingVertical: 10,
  },
  fullRow: {
    backgroundColor: '#eaeaea',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullRowText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    ...CommonStyles.button,
    backgroundColor: '#ee0000',
    marginBottom: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    ...CommonStyles.buttonText,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    paddingBottom: 20,
  },
  horizontalButtonContainer: { /* Agrega este estilo */
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // Ajusta según el diseño
    marginVertical: 1,
  },
  smallButton: {
    ...CommonStyles.button,
    backgroundColor: '#ee0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10, // Espaciado entre botones
    marginBottom: 25, // Elimina margen inferior
  },
  
});

export default TablasStyles;
