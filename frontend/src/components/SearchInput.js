import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SearchInput = ({ placeholder, onChangeText, value }) => {
    return (
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder || 'Buscar...'}
          placeholderTextColor="#aaa"
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    /* Buscador */
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,
      borderWidth: 1,
      backgroundColor: '#fff',
      borderColor: '#ddd',
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
  });
  
  export default SearchInput;