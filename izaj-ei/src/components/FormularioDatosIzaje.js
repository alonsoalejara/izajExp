import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/SetupIzajeStyles';

const FormularioDatosIzaje = ({ radioIzaje, radioMontaje, setRadioIzaje, setRadioMontaje }) => (
  <View style={styles.formSection}>
    <Text style={styles.formTitle}>Configurar Datos de Izaje</Text>

    {/* Radio de Izaje */}
    <Text>Radio de Izaje:</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese valor (en metros)"
        keyboardType="numeric"
        value={radioIzaje}
        onChangeText={setRadioIzaje}
      />
      <Text style={styles.unitText}>m.</Text>
    </View>

    {/* Radio de Montaje */}
    <Text>Radio de Montaje:</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese valor (en metros)"
        keyboardType="numeric"
        value={radioMontaje}
        onChangeText={setRadioMontaje}
      />
      <Text style={styles.unitText}>m.</Text>
    </View>
  </View>
);

export default FormularioDatosIzaje;
