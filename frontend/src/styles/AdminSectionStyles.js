import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
      /* Secciones */
      section: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 10,
        paddingBottom: 55,
        marginLeft: 37,
      },
      contentContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '70%',
        marginTop: 50,
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: 'transparent',
      },
      scrollContainer: {
        flex: 1,
      },
      labelText: {
        fontWeight: '600',
      },
      buttonContainerCard: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center', // Centra los botones en lugar de separarlos
        gap: 0, // Espaciado entre botones (opcional)
      },
      actionButton: {
        width: 120,
        backgroundColor: '#ee0000',
        paddingVertical: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      actionButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
      },
      card: {
        backgroundColor: '#fff',
        padding: 16,
        width: '89%',
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      cardDetail: {
        fontSize: 15,
        color: '#777',
        marginTop: 8,
        marginBottom: 0,
      },
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
      },
      cardSubtitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 10,
        marginBottom: 10,
      },
      /* Titulo */
      titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: -15,
        marginBottom: -20,
        width: '100%',
      },       
      profileCircle: {
        width: 80,
        height: 80,
        borderRadius: 45,
        overflow: 'hidden',
        top: 40,
        backgroundColor: '#ff8383',
      },
      profileImage: {
        width: '70%', 
        height: '70%',
        left: 12,
        top: 11, 
        resizeMode: 'cover',
      },
      
});

export default styles;
