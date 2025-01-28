import { StyleSheet } from 'react-native';

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
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  /* Titulo de la pagina */
  titleContainer: {
    marginTop: 125,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    marginBottom: 15,
    alignItems: 'center',
  },
  table: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: cellStyle(),
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
    backgroundColor: '#ccc',
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
    backgroundColor: '#ddd',
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 13,
    paddingVertical: 10,
  },
  fullRow: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullRowText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  /* Botones */
  buttonContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 80,
    width: '100%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default TablasStyles;
