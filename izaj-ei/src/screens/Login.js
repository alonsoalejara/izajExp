import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      // Lógica de autenticación (aquí iría la validación real)
      navigation.navigate('SetupIzaje');
    } else {
      alert('Por favor, ingrese ambos campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido/a</Text>
      
      {/* Campo de usuario */}
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />

      {/* Campo de contraseña */}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón de inicio de sesión */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Enlace para registrarse */}
      <TouchableOpacity onPress={() => alert('Redirigir a la pantalla de registro')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#333',
    marginBottom: 15,
    borderRadius: 5,
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});