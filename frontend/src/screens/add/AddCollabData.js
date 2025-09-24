import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/AddStyles';
import Components from '../../components/Components.index';

const AddCollabData = ({ navigation, route }) => {
  const { nombre, apellido } = route.params;

  const [rut, setRut] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  // Estados para los errores (se muestran solo al presionar "Siguiente")
  const [rutError, setRutError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleNext = () => {
    let hasError = false;

    // Validación de RUT: Formato 12345678-K (7 u 8 dígitos, guion y dígito o K)
    if (!/^\d{7,8}-[0-9Kk]$/.test(rut)) {
      setRutError('Usar formato XXXXXXXX-X');
      hasError = true;
    } else {
      setRutError('');
    }

    // Validación de teléfono: Formato +569XXXXXXXX
    if (!/^\+569\d{8}$/.test(telefono)) {
      setTelefonoError('Formato +569XXXXXXXX');
      hasError = true;
    } else {
      setTelefonoError('');
    }

    // Validación de email
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setEmailError('El correo electrónico no tiene el formato correcto');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (hasError) return;
    
    // Si no hay errores, avanzar a la siguiente pantalla
    const collabData = { nombre, apellido, rut, telefono, email };
    navigation.navigate('AddCollabSpecial', collabData);
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

      <Text style={styles.title}>¿Cuáles son los datos del colaborador?</Text>
      <Text style={styles.subtitle}>Ingrese el RUT y teléfono de contacto.</Text>

      {/* Agrupamos cada input en su propio contenedor para mostrar el error encima */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          {rutError ? <Text style={styles.errorText}>{rutError}</Text> : null}
          <TextInput
            style={[styles.input, rutError ? { ...styles.errorInput, marginTop: -4 } : {}]}
            placeholder="RUT"
            placeholderTextColor="#888"
            value={rut}
            onChangeText={setRut}
          />
        </View>

        <View style={{ flex: 1, marginLeft: 8, left: -8 }}>
          {telefonoError ? <Text style={styles.errorText}>{telefonoError}</Text> : null}
          <TextInput
            style={[styles.input, telefonoError ? { ...styles.errorInput, marginTop: -4 } : {}]}
            placeholder="Teléfono"
            placeholderTextColor="#888"
            value={telefono}
            onChangeText={setTelefono}
          />
        </View>
      </View>

      {emailError ? <Text style={[styles.errorText, { top: -10 }]}>{emailError}</Text> : null}
      <TextInput
        style={[styles.longInput, emailError ? { ...styles.errorInput, marginTop: -14 } : {}]}
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      {/* Botón Siguiente */}
      <Components.Button
        label="Siguiente"
        onPress={handleNext}
        style={{ width: '100%', marginTop: 5, right: 55 }}
      />

      {/* Botón Cancelar */}
      <Components.Button
        label="Cancelar inscripción"
        onPress={() => {
          navigation.pop(1);
          navigation.goBack();
        }}
        isCancel={true}
        style={{ backgroundColor: 'transparent', marginTop: 300, left: -12 }}
      />
    </View>
  );
};

export default AddCollabData;
