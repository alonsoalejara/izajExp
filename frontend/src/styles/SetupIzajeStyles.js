import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 36,
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
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formTitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  formTitleNoContainer: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: -10,
    color: '#000',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#ee0000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 3,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  labelText: {
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 15,
    color: '#000',
    marginTop: -10,
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ff0000',
    marginTop: 10,
    marginBottom: 10,
  },
  cardItem: {
    marginTop: 10,
    marginBottom: 10,
  },
  actionButton: {
    width: 120,
    backgroundColor: '#ff0000',
    paddingVertical: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#e0e0e0', // Fondo gris claro para inputs
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
    color: '#333', // Texto oscuro
    width: '90%', // Ajustado a todo el ancho
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 10,
    marginVertical: 15,
  },
  placeholderText: {
    color: '#aaa',
  },
  unitText: {
    fontSize: 18,
    color: '#666',
    marginLeft: 6,
  },
  formSection: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formMarginTop: {
    marginTop: 20,
  },
  maniobrasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
  },
});

export default styles;
