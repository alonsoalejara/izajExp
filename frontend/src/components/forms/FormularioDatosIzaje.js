import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../../styles/SetupIzajeStyles';

const FormularioDatosIzaje = ({ radioIzaje, radioMontaje, setRadioIzaje, setRadioMontaje }) => {
  const [errorRadioIzaje, setErrorRadioIzaje] = useState(''); // Estado para error en Radio de Izaje
  const [errorRadioMontaje, setErrorRadioMontaje] = useState(''); // Estado para error en Radio de Montaje

  // Función para validar los valores
  const validarValor = (valor, setError) => {
    if (valor === '') {
      setError(''); // No mostrar error si el campo está vacío
      return;
    }
    
    const regex = /^\d+(\.\d{1,2})?$/; // Solo números positivos con hasta dos decimales usando punto
    if (!regex.test(valor) || parseFloat(valor) < 1) {
      setError('Ingrese un valor numérico válido.');
    } else {
      setError(''); // Limpia el error si el valor es válido
    }
  };

  return (
    <View style={styles.section}>
      {/* Titulo de la configuración de radio */}
      <Text style={[styles.formTitle, { marginTop: 5, marginBottom: 15 }]}>
        CONFIGURACIÓN RADIO:
      </Text>

      {/* Radio de Izaje */}
      <Text style={styles.labelText}>Radio de Izaje:</Text>
      {errorRadioIzaje ? (
        <Text style={{ color: '#ff0000', marginBottom: 0 }}>{errorRadioIzaje}</Text>
      ) : null}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Ingresar en metros"
          placeholderTextColor={styles.placeholderText.color}
          keyboardType="numeric"
          value={radioIzaje}
          onChangeText={(text) => {
            setRadioIzaje(text);
            validarValor(text, setErrorRadioIzaje); // Valida el valor ingresado
          }}
        />
        <Text style={styles.labelText}>  mts.</Text>
      </View>

      {/* Radio de Montaje */}
      <Text style={styles.labelText}>Radio de Montaje:</Text>
      {errorRadioMontaje ? (
        <Text style={{ color: '#ff0000', marginBottom: 0 }}>{errorRadioMontaje}</Text>
      ) : null}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Ingresar en metros"
          placeholderTextColor={styles.placeholderText.color}
          keyboardType="numeric"
          value={radioMontaje}
          onChangeText={(text) => {
            setRadioMontaje(text);
            validarValor(text, setErrorRadioMontaje);
          }}
        />
        <Text style={styles.labelText}>  mts.</Text>
      </View>

    </View>
  );
};

export default FormularioDatosIzaje;
