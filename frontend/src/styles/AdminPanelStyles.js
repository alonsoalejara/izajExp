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
    marginBottom: 10,
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
  collaboratorCard: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  collaboratorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  collaboratorDetails: {
    fontSize: 14,
    color: '#555',
  },
  gruaCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gruaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 8,
  },
  gruaDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
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
  buttonGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginLeft: 10,
  },
  gruaDetails: {
    marginTop: 10,
    paddingLeft: 10,
  },
  planCard: {
    backgroundColor: '#e8f0fe',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  planDetails: {
    fontSize: 14,
    color: '#555',
  },
  planExpandedDetails: {
    marginTop: 10,
    paddingLeft: 10,
  },
  expandedTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  aparejoItem: {
    marginBottom: 10,
  },
  appearedText: {
    fontSize: 14,
    color: '#555',
  },
  // Nuevos estilos para negrita en "Aparejos", "Descripción" y "Cargas"
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  planResponsable: {
    fontSize: 14,
    color: '#333',  // Puedes elegir el color que prefieras
    marginBottom: 8,  // Un pequeño margen para separación
  },
});

export default styles;