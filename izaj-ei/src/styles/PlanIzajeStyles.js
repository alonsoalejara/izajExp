import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    contentContainer: {
      padding: 20,
    },
    section: {
      marginBottom: 30,
      padding: 10,
      backgroundColor: '#1a1a1a',
      borderRadius: 10,
    },
    sectionTitle: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 10,
      fontWeight: 'bold',
    },
    label: {
      color: '#aaa',
      marginBottom: 5,
      fontSize: 14,
    },
    input: {
      backgroundColor: '#333',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      color: 'white',
    },
    result: {
      fontSize: 16,
      color: 'red',
      marginTop: 5,
    },
    formula: {
      fontSize: 12,
      color: '#fff',
      marginTop: 10,
    },
  });

export default styles;