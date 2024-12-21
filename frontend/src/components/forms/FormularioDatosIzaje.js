import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/SetupIzajeStyles';

const FormularioDatosIzaje = ({ radioIzaje, radioMontaje, setRadioIzaje, setRadioMontaje }) => (
  <View style={[styles.formSection, styles.formMarginTop]}>
    {/* Titulo de la configuración de radio */}
    <Text style={styles.formTitle}>Configuración de Radio</Text>

    {/* Radio de Izaje */}
    <Text style={styles.label}>Radio de Izaje:</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Metros"
        placeholderTextColor={styles.placeholderText.color}
        keyboardType="numeric"
        value={radioIzaje}
        onChangeText={setRadioIzaje}
      />
      <Text style={styles.unitText}>m.</Text>
    </View>

    {/* Radio de Montaje */}
    <Text style={styles.label}>Radio de Montaje:</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Metros"
        placeholderTextColor={styles.placeholderText.color}
        keyboardType="numeric"
        value={radioMontaje}
        onChangeText={setRadioMontaje}
      />
      <Text style={styles.unitText}>m.</Text>
    </View>
  </View>
);

export default FormularioDatosIzaje;