import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  contentContainer: {
    padding: 0,
  },
  titleContainer: {
    backgroundColor: 'white',
    marginTop: 100,
    top: 15,
    marginVertical: 0,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  sectionTitle: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 31,
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
