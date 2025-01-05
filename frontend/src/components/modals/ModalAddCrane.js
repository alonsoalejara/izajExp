import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/ModalStyles'; 
import validationCrane from '../../utils/validationCrane';
import getApiUrl from '../../utils/apiUrl';

const ModalAddCrane = ({ isVisible, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [pesoEquipo, setPesoEquipo] = useState('');
  const [pesoGancho, setPesoGancho] = useState('');
  const [capacidadLevante, setCapacidadLevante] = useState('');
  const [largoPluma, setLargoPluma] = useState('');
  const [contrapeso, setContrapeso] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [pesoEquipoError, setPesoEquipoError] = useState('');
  const [pesoGanchoError, setPesoGanchoError] = useState('');
  const [capacidadLevanteError, setCapacidadLevanteError] = useState('');
  const [largoPlumaError, setLargoPlumaError] = useState('');
  const [contrapesoError, setContrapesoError] = useState('');

  const handleSave = async () => {
    if (
      !nombreError && !pesoEquipoError && !pesoGanchoError && !capacidadLevanteError &&
      !largoPlumaError && !contrapesoError && nombre && pesoEquipo && pesoGancho &&
      capacidadLevante && largoPluma && contrapeso
    ) {
      const nuevaGrua = {
        nombre,
        pesoEquipo,
        pesoGancho,
        capacidadLevante,
        largoPluma,
        contrapeso,
      };

      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          alert('No autorizado. Por favor, inicie sesión nuevamente.');
          return;
        }

        const response = await fetch(getApiUrl('grua/'), { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(nuevaGrua),
        });

        const data = await response.json();
        if (response.ok) {
          onSave(nuevaGrua);
          onClose();
        } else {
          console.error('Error al guardar:', data);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al guardar la grúa.');
      }
    }
  };

  const isSaveButtonEnabled =
    nombre && pesoEquipo && pesoGancho && capacidadLevante && largoPluma && contrapeso &&
    !nombreError && !pesoEquipoError && !pesoGanchoError && !capacidadLevanteError && !largoPlumaError && !contrapesoError;

    return (
      <Modal transparent={true} visible={isVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Nueva Grúa</Text>
   
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={[styles.optionButton, nombreError ? { borderColor: 'red' } : {}]}
              placeholder="Ingrese nombre"
              value={nombre}
              onChangeText={(text) => {
                validationCrane.validarNombre(text, setNombre, setNombreError);
              }}
            />
            {nombreError ? <Text style={{ color: 'red' }}>{nombreError}</Text> : null}
   
            <Text style={styles.label}>Peso del equipo (kg):</Text>
            <TextInput
              style={[styles.optionButton, pesoEquipoError ? { borderColor: 'red' } : {}]}
              placeholder="Ingrese peso del equipo"
              value={pesoEquipo}
              keyboardType="numeric"
              onChangeText={(text) => {
                validationCrane.validarPeso(text, setPesoEquipo, setPesoEquipoError);
              }}
            />
            {pesoEquipoError ? <Text style={{ color: 'red' }}>{pesoEquipoError}</Text> : null}
   
            <Text style={styles.label}>Peso del gancho (kg):</Text>
            <TextInput
              style={[styles.optionButton, pesoGanchoError ? { borderColor: 'red' } : {}]}
              placeholder="Ingrese peso del gancho"
              value={pesoGancho}
              keyboardType="numeric"
              onChangeText={(text) => {
                validationCrane.validarPesoGancho(text, setPesoGancho, setPesoGanchoError);
              }}
            />
            {pesoGanchoError ? <Text style={{ color: 'red' }}>{pesoGanchoError}</Text> : null}
   
            <Text style={styles.label}>Capacidad de levante (kg):</Text>
            <TextInput
              style={[styles.optionButton, capacidadLevanteError ? { borderColor: 'red' } : {}]}
              placeholder="Ingrese capacidad de levante"
              value={capacidadLevante}
              keyboardType="numeric"
              onChangeText={(text) => {
                validationCrane.validarCapacidadLevante(text, setCapacidadLevante, setCapacidadLevanteError);
              }}
            />
            {capacidadLevanteError ? <Text style={{ color: 'red' }}>{capacidadLevanteError}</Text> : null}
   
            <Text style={styles.label}>Largo de la pluma (m):</Text>
            <TextInput
              style={[styles.optionButton, largoPlumaError ? { borderColor: 'red' } : {}]}
              placeholder="Ingrese largo de la pluma"
              value={largoPluma}
              keyboardType="numeric"
              onChangeText={(text) => {
                validationCrane.validarLargoPluma(text, setLargoPluma, setLargoPlumaError);
              }}
            />
            {largoPlumaError ? <Text style={{ color: 'red' }}>{largoPlumaError}</Text> : null}
   
            <Text style={styles.label}>Contrapeso (ton):</Text>
            <TextInput
              style={[styles.optionButton, contrapesoError ? { borderColor: 'red' } : {}]}
              placeholder="Ingrese contrapeso"
              value={contrapeso}
              keyboardType="numeric"
              onChangeText={(text) => {
                validationCrane.validarContrapeso(text, setContrapeso, setContrapesoError);
              }}
            />
            {contrapesoError ? <Text style={{ color: 'red' }}>{contrapesoError}</Text> : null}
   
            <TouchableOpacity onPress={handleSave} disabled={!isSaveButtonEnabled} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
   
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
   );
};

export default ModalAddCrane;
