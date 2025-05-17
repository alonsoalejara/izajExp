import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  /* Secciones */
  section: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 3,
    marginLeft: 37,
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
    right: 80,
    alignItems: 'center',
  },
  multiButtonContainer: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  button: {
    backgroundColor: 'transparent',
    width: 70,
    paddingHorizontal: 10,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5, // Espacio entre botones
    marginBottom: 5,
  },
  // Cards
  card: {
    backgroundColor: '#fff',
    padding: 20,
    width: '89%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    left: 35,
  }
});

export default styles;