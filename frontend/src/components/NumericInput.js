import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const NumericInput = ({ value, onChangeText, placeholder, style }) => {
  return (
    <View style={[styles.inputWrapper, { marginBottom: 15 }, style]}>     
      <TextInput
        stysle={styles.input}  
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
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 10,
    marginLeft: 14,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    width: 100,
    marginLeft: -10,
    paddingVertical: 20,
    paddingLeft: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
  },

});

export default NumericInput;