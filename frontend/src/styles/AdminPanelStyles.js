import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 0,
  },
  
  /* Header */
  fixedHeader: {
    backgroundColor: 'transparent',
    marginTop: 30,
  },
      /* Imagen */
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
        left: 0,
        width: '100%',
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
      /* Titulo */
      sectionTitle: {
        fontSize: 26,
        color: '#333',
        marginTop: 120,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      /* Botones selector de sección */
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
        width: '80%',
        alignSelf: 'center',
      },
      button: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 3,
        position: 'relative',
      },
      buttonText: {
        color: '#bbb',
        fontSize: 18,
        fontWeight: 'bold',
      },
      line: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        backgroundColor: '#cc0000',
      },
    /* Contenedor para botón Crear*/
    createButtonContainer: {
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
});

export default styles;
