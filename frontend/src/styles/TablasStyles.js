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
    paddingHorizontal: 5,
    paddingVertical: 130,
  },
  contentContainer: {
    padding: 0,
  },
  // Estilos para la sección superior con imagen, degradado y logo
  circleContainer: {
    width: 600,
    height: 550,
    borderRadius: 150,
    position: 'absolute',
    bottom: '85.5%',
    left: '37%',
    transform: [{ translateX: -250 }],
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '80%',
    height: '80%',
    top: 120,
    left: 15,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    top: 50,
    left: 112,
    width: 555,
    height: '100%',
    zIndex: 0,
  },
  logo: {
    position: 'absolute',
    top: '84%',
    left: '58.4%',
    transform: [{ translateX: -165 }],
    width: 200,
    height: 80,
    zIndex: 0,
  },
  /* Titulo de la pagina */
  title: {
    fontSize: 24,
    marginTop: 18,
    marginBottom: 40,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
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
  /* Botones */
  buttonContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 80,
    width: '100%',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
});

export default TablasStyles;
