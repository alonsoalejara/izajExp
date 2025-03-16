import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AddStyles';
import Button from '../../components/Button';

const AddCollabName = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  // Estados de error
  const [nombreError, setNombreError] = useState('');
  const [apellidoError, setApellidoError] = useState('');

  const handleNext = () => {
    let hasError = false;

    // Validación de nombre
    const trimmedNombre = nombre.trim();
    if (nombre === '' || trimmedNombre === '' || nombre.startsWith(' ')) {
      setNombreError('El nombre no puede estar vacío ni iniciar con espacios.');
      hasError = true;
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ,\s-]+$/.test(trimmedNombre)) {
      setNombreError('No se aceptan números o caracteres especiales.');
      hasError = true;
    } else {
      setNombreError('');
    }

    // Validación de apellido
    const trimmedApellido = apellido.trim();
    if (apellido === '' || trimmedApellido === '' || apellido.startsWith(' ')) {
      setApellidoError('El apellido no puede estar vacío ni iniciar con espacios.');
      hasError = true;
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ,\s-]+$/.test(trimmedApellido)) {
      setApellidoError('No se aceptan números o caracteres especiales.');
      hasError = true;
    } else {
      setApellidoError('');
    }

    if (hasError) return;

    navigation.navigate('AddCollabData', { nombre, apellido });
  };

  return (
    <View style={styles.container}>
      {/* Botón para regresar */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="keyboard-arrow-left" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>¿Cómo se llama el colaborador?</Text>
      <Text style={[styles.subtitle, { top: -5 }]}>Ingrese nombre(s) y apellido(s).</Text>

      {/* Cada input en su contenedor para el error */}
      <View style={{ marginBottom: 0 }}>
        {nombreError ? <Text style={styles.errorText}>{nombreError}</Text> : null}
        <TextInput
          style={[styles.input, nombreError ? { ...styles.errorInput, marginTop: -2 } : {}]}
          placeholder="Nombre"
          placeholderTextColor="#888"
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View style={{ marginBottom: 0, marginTop: 10 }}>
        {apellidoError ? <Text style={[styles.errorText, { marginBottom: -13, marginTop: -26 }]}>{apellidoError}</Text> : null}
        <TextInput
          style={[styles.input, apellidoError ? { ...styles.errorInput, marginTop: 14 } : {}]}
          placeholder="Apellido"
          placeholderTextColor="#888"
          value={apellido}
          onChangeText={setApellido}
        />
      </View>

      {/* Botón Siguiente */}
      <Button
        label="Siguiente"
        onPress={handleNext}
        style={{ width: '100%', marginTop: 5, right: 55 }}
      />

      {/* Botón Cancelar */}
      <Button
        label="Cancelar inscripción"
        onPress={() => navigation.goBack()}
        isCancel={true}
        style={{ backgroundColor: 'transparent', marginTop: 388, left: -12 }}
      />
    </View>
  );
};

export default AddCollabName;
