import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
      /* Secciones */
      section: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 10,
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
        justifyContent: 'space-around',
      },
      actionButton: {
        width: 120,
        backgroundColor: '#ff0000',
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
        color: '#000',
        marginTop: 0,
        marginBottom: 0,
      },
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff0000',
        marginBottom: 8,
      },
      cardSubtitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#ff0000',
        marginTop: 10,
        marginBottom: 10,
      },
});

export default styles;
