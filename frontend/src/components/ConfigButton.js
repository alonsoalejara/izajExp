import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConfigButton = ({ label, value, onPress, width, align }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.inputButton, { width: width || 'auto', alignSelf: align || 'flex-start' }]} // Alineación flexible
      >
        <View style={styles.inputButtonContent}>
          <Text style={[styles.inputButtonText, { color: value ? 'black' : '#ccc' }]}>
            {value || label}
          </Text>
          <Icon name="caret-down" size={20} color="#ccc" style={styles.icon} />
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = {
    inputButton: {
      backgroundColor: '#fff',
      paddingVertical: 16,
      paddingHorizontal: 15,
      paddingBottom: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      marginTop: 15,
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
      color: '#666',
      fontSize: 18,
      fontWeight: '400',
    },
    icon: {
      marginLeft: 10,
    },
  };  
  
  export default ConfigButton;