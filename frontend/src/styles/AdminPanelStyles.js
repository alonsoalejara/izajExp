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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
    marginTop: 0,
    marginBottom: 0,
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
  labelText: {
    fontWeight: '600',
  },
});

export default styles;
