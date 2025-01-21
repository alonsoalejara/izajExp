import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
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
    bottom: '84%',
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
  // Estilos de la sección de contenido
  section: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  // Estilos para los botones
  inputButton: {
    backgroundColor: '#ddd',
    paddingVertical: 16,
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    marginHorizontal: 10,
    marginTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputButtonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '400',
  },
  icon: {
    marginLeft: 10,  // Espacio entre el texto y el ícono
  },

  // Estilos para los inputs y contenedores
  input: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
    marginLeft: 14,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  unitText: {
    fontSize: 18,
    color: '#666',
    marginLeft: 6,
  },
  // Estilos adicionales
  cardDetail: {
    fontSize: 15,
    color: '#000',
    marginTop: -10,
    marginBottom: 10,
  },
  // Estilos para los modales y configuraciones
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 8,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default styles;
