import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../../../styles/BottomSheetStyles';

const SpecialtyTab = ({ specialty, setEspecialidad, onBack }) => {
  return (
    <>
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="keyboard-arrow-left" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Especialidad</Text>
      </View>
      <View style={styles.roundedInputContainer}>
        <View style={[styles.inputWrapper, styles.inputTop]}>
          <Text style={styles.inputLabel}>Especialidad</Text>
          <TextInput style={styles.input} value={specialty} onChangeText={setEspecialidad} />
        </View>
      </View>
    </>
  );
};

export default SpecialtyTab;
