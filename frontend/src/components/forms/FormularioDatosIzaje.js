import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/SetupIzajeStyles';

const FormularioDatosIzaje = ({ radioIzaje, radioMontaje, setRadioIzaje, setRadioMontaje }) => (
  <View style={styles.section}>
    {/* Titulo de la configuración de radio */}
    <Text style={[styles.formTitle, { marginTop: 5, marginBottom: 15 }]}>CONFIGURACIÓN RADIO:</Text>

    {/* Radio de Izaje */}
    <Text style={styles.labelText}>Radio de Izaje:</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Ingresar en metros"
        placeholderTextColor={styles.placeholderText.color}
        keyboardType="numeric"
        value={radioIzaje}
        onChangeText={setRadioIzaje}
      />
      <Text style={styles.labelText}>  mts.</Text>
    </View>

    {/* Radio de Montaje */}
    <Text style={styles.labelText}>Radio de Montaje:</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Ingresar en metros"
        placeholderTextColor={styles.placeholderText.color}
        keyboardType="numeric"
        value={radioMontaje}
        onChangeText={setRadioMontaje}
      />
      <Text style={styles.labelText}>  mts.</Text>
    </View>
  </View>
);

export default FormularioDatosIzaje;