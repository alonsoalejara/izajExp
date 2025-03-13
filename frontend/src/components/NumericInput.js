import React from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NumericInput = ({ value, onChangeText, placeholder, style, onEndEditing, editable }) => {
  const handleClear = () => {
    onChangeText(''); // Borra el contenido del input
  };

  return (
    <View style={[styles.inputWrapper, style]}>
      <TextInput
        style={[styles.input]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        onEndEditing={onEndEditing}
        editable={editable}
      />
      {/* Mostrar el icono 'X' solo si hay contenido en el input */}
      {value !== '' && (
        <TouchableOpacity onPress={handleClear} style={styles.clearIcon}>
          <Icon name="close-circle" size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 21,
    width: '50%',
  },

  input: {
    height: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#333',
    flex: 1,
    width: 150,
    paddingLeft: 10,
    textAlignVertical: 'center',
  },

  clearIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default NumericInput;
