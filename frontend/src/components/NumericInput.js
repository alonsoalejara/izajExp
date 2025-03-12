import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const NumericInput = ({ value, onChangeText, placeholder, style, onEndEditing, editable }) => {
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
    height: 60,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#333',
    width: 150,
    paddingLeft: 10,
    textAlignVertical: 'center',
  },
});

export default NumericInput;
