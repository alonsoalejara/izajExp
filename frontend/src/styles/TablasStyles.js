import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    top: 133,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Titulo de cada tabla
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginVertical: 10,
  },
  labelContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
    textAlign: 'left',
    top: 130,
  },
  // Contenedor de todas las tablas
  tableContainer: {
    backgroundColor: '#fff',
    top: 50,
    marginHorizontal: 0,
    marginVertical: 95,
  },
  // Contenedor de cada tabla
  tableSection: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  // Header de tabla
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#dd0000',
    paddingVertical: 10,
    borderRadius: 5,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 40,
    right: 30,
    marginHorizontal: 30,
    marginVertical: 20,
    gap: -35,
  },
  button: {
    width: '45%',
    backgroundColor: '#ee0000',
  },
});

export default styles;
