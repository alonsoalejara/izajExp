import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConfigButton = ({ placeholder, value, onPress, disabled, width, align, style }) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : null} 
      style={[
        styles.inputButton,
        { width: width || 'auto', alignSelf: align || 'flex-start' },
        style,
      ]}
    >
      <View style={styles.inputButtonContent}>
        <Text style={[styles.value, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Icon name="caret-down" size={20} color="#ccc" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  inputButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 15,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 14,
    marginBottom: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputButtonText: {
    fontSize: 18,
    fontWeight: '400',
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  value: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  placeholder: {
    fontSize: 18,
    color: '#bbb',
    flex: 1,
  },
};

export default ConfigButton;
