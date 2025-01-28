import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 120,
  },
  contentContainer: {
    padding: 0,
  },
  sectionTitle: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 20,
    marginBottom: 0,
  },
  icon: {
    marginLeft: 10,
  },
  // Contenedor
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -5,
    height: 80,
  },
});

export default styles;
