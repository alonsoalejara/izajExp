import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';

const Firma = ({ navigation }) => {
  const [signature, setSignature] = useState(null);
  const sign = useRef(null);

    const handleSave = () => {
        if (signature) {
             Alert.alert("Firma Guardada", "Firma guardada exitosamente");
            navigation.goBack();
        } else {
            Alert.alert("Error", "Por favor, dibuja tu firma antes de guardar.");
        }
    };

  const handleClear = () => {
    if (sign.current) {
      sign.current.clear();
      setSignature(null);
    }
  };

  return (
    <View style={firmaStyles.container}>
      {/* Botón para regresar */}
      <TouchableOpacity
        style={firmaStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="keyboard-arrow-left" size={30} color="#000" />
      </TouchableOpacity>

      <Text style={firmaStyles.title}>Firma</Text>
      <Text style={firmaStyles.subtitle}>Por favor, firma en el área designada.</Text>

      {/* Área de firma */}
      <View style={firmaStyles.signatureContainer}>
        <SignatureCanvas
          ref={sign}
          style={firmaStyles.signatureCanvas}
          penColor="#000"
          onOK={(img) => {setSignature(img.base64);}}
          onEmpty={() => {Alert.alert("Firma vacía", "No se ha detectado ninguna firma.");}}
          onClear={() => {setSignature(null);}}
        />
      </View>

      {/* Botones de acción */}
      <View style={firmaStyles.buttonContainer}>
        <Button
          label="Borrar"
          onPress={handleClear}
          style={{ width: '40%', backgroundColor: '#e5e7eb', marginRight: 0 }}
          textStyle={{ color: '#374151' }}
        />
        <Button
          label="Guardar"
          onPress={handleSave}
          style={{ width: '40%' }}
        />
      </View>

      {/* Botón Cancelar */}
      <Button
        label="Cancelar"
        onPress={() => navigation.goBack()}
        isCancel={true}
        style={{ backgroundColor: 'transparent', marginTop: 20, right: 20 ,alignSelf: 'center' }}
      />
    </View>
  );
};

// Adaptación de estilos de AddStyles.js
const firmaStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Cambiado para alinear al inicio
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 60, // Ajustado para dar espacio al botón de atrás
    marginBottom: 10,
    alignSelf: 'flex-start', // Alineado a la izquierda
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    alignSelf: 'flex-start', // Alineado a la izquierda

  },
  signatureContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#f8f8f8', // Color de fondo del área de firma
  },
  signatureCanvas: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    right: 45,
  },
  input: { // No se usa directamente, pero se deja por si se necesita en el futuro
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Firma;