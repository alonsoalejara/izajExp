import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';
import { useRoute } from '@react-navigation/native';

const Firma = ({ navigation }) => {
  const route = useRoute();
  const { onSave, firma: existingFirma } = route.params || {};
  const [firma, setFirma] = useState(existingFirma || null);
  const sign = useRef(null);

  const handleSave = () => {
    if (sign.current) {
      sign.current.readSignature();
    }
  };

  const handleOK = (base64) => {
    setFirma(base64);
    onSave(base64);
    Alert.alert('Firma Guardada', 'Firma guardada exitosamente');
    navigation.goBack();
  };

  const handleClear = () => {
    if (sign.current) {
      sign.current.clearFirma();
      setFirma(null);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="keyboard-arrow-left" size={40} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Firma</Text>
      <Text style={styles.subtitle}>Por favor, firma en el área designada.</Text>

      <View style={styles.signatureContainer}>
        <SignatureCanvas
          ref={sign}
          style={styles.signatureCanvas}
          penColor="#000"
          dataURL={existingFirma ? `data:image/png;base64,${existingFirma}` : null}
          autoClear={false}
          onOK={handleOK}
          onEmpty={() => Alert.alert('Firma vacía', 'No se ha detectado ninguna firma.')}
          onClear={() => setFirma(null)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          label="Limpiar"
          onPress={handleClear}
          style={{ width: '40%', backgroundColor: '#e5e7eb' }}
          textStyle={{ color: '#374151' }}
        />
        <Button
          label="Guardar"
          onPress={handleSave}
          style={{ width: '40%' }}
        />
      </View>

      <Button
        label="Cancelar"
        onPress={() => navigation.goBack()}
        isCancel
        style={{ width: '100%', marginTop: 10, backgroundColor: 'white', left: -20, fontSize: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 10,
    zIndex: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 90,
    alignSelf: 'flex-start'
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  signatureContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
    marginBottom: 20
  },
  signatureCanvas: { flex: 1, width: '100%', height: '100%' },
  buttonContainer: {
    left: -45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default Firma;
