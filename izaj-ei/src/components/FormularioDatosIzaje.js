import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/SetupIzajeStyles';

const FormularioDatosIzaje = ({ radioIzaje, radioMontaje, diametroCable, diametroGrillete, setRadioIzaje, setRadioMontaje, handleDiametroCableChange, setDiametroGrillete }) => (
  <View style={styles.formSection}>
    <Text style={styles.formTitle}>Configurar Datos de Izaje</Text>

    {/* Radio de Izaje */}
    <Text>Radio de Izaje:</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Valor"
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
        placeholder="Valor"
        keyboardType="numeric"
        value={radioMontaje}
        onChangeText={setRadioMontaje}
      />
      <Text style={styles.unitText}>m.</Text>
    </View>

    {/* Diámetro de Cable Nominal */}
    <Text>Diámetro de Cable Nominal:</Text>
    <TextInput
      style={styles.input}
      placeholder="Valor"
      keyboardType="numeric"
      value={diametroCable.valor}
      onChangeText={(text) => handleDiametroCableChange(text, diametroCable.unidad)}
    />
    <TouchableOpacity
      style={styles.unitButton}
      onPress={() => handleDiametroCableChange(diametroCable.valor, diametroCable.unidad === 'Pulgadas' ? 'Milímetros' : 'Pulgadas')}
    >
      <Text style={styles.unitButtonText}>{diametroCable.unidad}</Text>
    </TouchableOpacity>

    {/* Diámetro de Grillete */}
    <Text>Diámetro de Grillete:</Text>
    <TextInput
      style={styles.input}
      placeholder="Valor"
      keyboardType="numeric"
      value={diametroGrillete}
      onChangeText={setDiametroGrillete}
    />
    <Text>Unidad: Milímetros</Text>
  </View>
);

export default FormularioDatosIzaje;
