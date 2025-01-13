import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingVertical: 40,
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
        bottom: '92%',
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
        marginTop: 100,
        marginBottom: 30,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      /* Buscador */
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        borderWidth: 1,
        backgroundColor: '#ccc',
        borderColor: '#bbb',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 4,
        width: '80%',
        alignSelf: 'center',
      },
      searchIcon: {
        marginRight: 10,
      },
      searchInput: {
        flex: 1,
        height: 40,
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10,
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
        backgroundColor: 'red',
      },
    /* Contenedor para botón Crear*/
    actionContainer: {
      backgroundColor: 'transparent',
      marginTop: 20,
      marginBottom: 0,
      paddingRight: 175,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#ccc',
      position: 'relative',
    },   
    actionButton: {
      backgroundColor: '#ee0000',
      paddingVertical: 12,
      marginBottom: 15,
      width: 130,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100,
    },
    actionButtonText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center', 
    },
    /* Footer */
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: 10,
      marginBottom: -10,
      backgroundColor: 'transparent',
    },
    footerIcon: {
      flex: 1,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default styles;
