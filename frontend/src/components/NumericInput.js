import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const NumericInput = ({ value, onChangeText, placeholder, style }) => {
  return (
    <View style={[styles.inputWrapper, { marginBottom: 15 }, style]}>     
      <TextInput
        style={styles.input}  
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 21,
  },

  input: {
    backgroundColor: 'transparent',
    width: 150,
    marginLeft: 0,
    paddingVertical: 28,
    paddingLeft: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
  },

});

export default NumericInput;