import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ label, onPress, isCancel, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, isCancel && styles.cancelButtonText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ee0000',
    paddingVertical: 13,
    marginBottom: 18,
    marginLeft: 55,
    width: 250,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#ee0000',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Button;
