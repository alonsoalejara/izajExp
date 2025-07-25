import React, { useRef, useEffect } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const NumericInput = ({
  value,
  onChangeText,
  placeholder,
  style,
  onEndEditing,
  editable = true,
  showControls = false,
  showClearButton = true,
  keyboardType = "numeric" // Propiedad keyboardType con valor por defecto
}) => {

  const intervalRef = useRef(null);
  const currentValueRef = useRef(parseInt(value) || 0);

  useEffect(() => {
    currentValueRef.current = parseInt(value) || 0;
  }, [value]);

  const handleClear = () => {
    onChangeText('');
  };

  const handleIncrement = () => {
    let newValue = currentValueRef.current + 1;
    currentValueRef.current = newValue;
    onChangeText(newValue.toString());
  };

  const handleDecrement = () => {
    let newValue = currentValueRef.current - 1;
    if(newValue < 0) newValue = 0;
    currentValueRef.current = newValue;
    onChangeText(newValue.toString());
  };

  const startChanging = (changeFunction) => {
    changeFunction();
    intervalRef.current = setInterval(() => {
      changeFunction();
    }, 100);
  };

  const stopChanging = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <View style={[styles.inputWrapper, style]}>
      <TextInput
        style={[styles.input, { textAlign: 'center' }]}
        placeholder={placeholder}
        placeholderTextColor="#aaaaaa"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType} // Usa la prop keyboardType
        onEndEditing={onEndEditing}
        editable={editable}
      />

      {showControls && (
        <View style={styles.controls}>
          <TouchableOpacity
            onPressIn={() => startChanging(handleIncrement)}
            onPressOut={stopChanging}
            disabled={!editable}
          >
            <Icon name="chevron-up" size={25} color={editable ? "#ccc" : "#aaa"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPressIn={() => startChanging(handleDecrement)}
            onPressOut={stopChanging}
            disabled={!editable}
          >
            <Icon name="chevron-down" size={25} color={editable ? "#ccc" : "#aaa"} />
          </TouchableOpacity>
        </View>
      )}

      {showClearButton && value !== '' && (
        <TouchableOpacity onPress={handleClear} style={styles.clearIcon}>
          <Icon name="close-circle" size={20} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: 150,
    top: 2,
    height: 57.5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  input: {
    height: 50,
    fontSize: 18,
    color: '#333',
    flex: 0,
    paddingRight: 20,
    textAlignVertical: 'center',
  },

  clearIcon: {
    position: 'absolute',
    right: 10,
  },

  controls: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 110,
  },
});

export default NumericInput;