import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../styles/ModalStyles';
import getApiUrl from '../../utils/apiUrl';

const ModalEditCrane = ({ isVisible, onClose, setupIzaje, onUpdate }) => {
  const [largoPluma, setLargoPluma] = useState(setupIzaje ? setupIzaje.datos.largoPluma : '');
  const [contrapeso, setContrapeso] = useState(setupIzaje ? setupIzaje.datos.contrapeso : '');
  const [pesoEquipo, setPesoEquipo] = useState(setupIzaje ? setupIzaje.cargas.pesoEquipo : '');
  const [pesoAparejos, setPesoAparejos] = useState(setupIzaje ? setupIzaje.cargas.pesoAparejos : '');
  const [pesoGancho, setPesoGancho] = useState(setupIzaje ? setupIzaje.cargas.pesoGancho : '');
  const [pesoTotal, setPesoTotal] = useState(setupIzaje ? setupIzaje.cargas.pesoTotal : '');
  const [radioTrabajoMax, setRadioTrabajoMax] = useState(setupIzaje ? setupIzaje.cargas.radioTrabajoMax : '');
  const [capacidadLevante, setCapacidadLevante] = useState(setupIzaje ? setupIzaje.cargas.capacidadLevante : '');
  const [porcentajeUtilizacion, setPorcentajeUtilizacion] = useState(setupIzaje ? setupIzaje.cargas.porcentajeUtilizacion : '');

  useEffect(() => {
    if (setupIzaje) {
      setLargoPluma(setupIzaje.datos.largoPluma);
      setContrapeso(setupIzaje.datos.contrapeso);
      setPesoEquipo(setupIzaje.cargas.pesoEquipo);
      setPesoAparejos(setupIzaje.cargas.pesoAparejos);
      setPesoGancho(setupIzaje.cargas.pesoGancho);
      setPesoTotal(setupIzaje.cargas.pesoTotal);
      setRadioTrabajoMax(setupIzaje.cargas.radioTrabajoMax);
      setCapacidadLevante(setupIzaje.cargas.capacidadLevante);
      setPorcentajeUtilizacion(setupIzaje.cargas.porcentajeUtilizacion);
    }
  }, [setupIzaje]);

  const handleUpdate = async () => {
    const updatedSetupIzaje = {
      datos: {
        largoPluma,
        contrapeso
      },
      cargas: {
        pesoEquipo: Number(pesoEquipo),
        pesoAparejos: Number(pesoAparejos),
        pesoGancho: Number(pesoGancho),
        pesoTotal: Number(pesoTotal),
        radioTrabajoMax: Number(radioTrabajoMax),
        capacidadLevante: Number(capacidadLevante),
        porcentajeUtilizacion: Number(porcentajeUtilizacion)
      }
    };

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        alert('No autorizado. Por favor, inicie sesión nuevamente.');
        return;
      }

      if (!setupIzaje._id) {
        alert('Error: ID de configuración de izaje no válido.');
        return;
      }

      const response = await axios.put(getApiUrl(`setupIzaje/${setupIzaje._id}`), updatedSetupIzaje, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }
      });

      if (response.status === 200) {
        onUpdate(updatedSetupIzaje);
        onClose();
      } else {
        console.error('Error al actualizar:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al actualizar el plan de izaje.');
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Plan de Izaje</Text>

          <Text style={styles.label}>Largo de la Pluma (m):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese largo de la pluma"
            value={largoPluma}
            onChangeText={setLargoPluma}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Contrapeso (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese contrapeso"
            value={contrapeso}
            onChangeText={setContrapeso}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Peso del Equipo (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese peso del equipo"
            value={pesoEquipo}
            onChangeText={setPesoEquipo}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Peso de los Aparejos (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese peso de los aparejos"
            value={pesoAparejos}
            onChangeText={setPesoAparejos}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Peso del Gancho (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese peso del gancho"
            value={pesoGancho}
            onChangeText={setPesoGancho}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Peso Total (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese peso total"
            value={pesoTotal}
            onChangeText={setPesoTotal}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Radio de Trabajo Máximo (m):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese radio de trabajo máximo"
            value={radioTrabajoMax}
            onChangeText={setRadioTrabajoMax}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Capacidad de Levante (kg):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese capacidad de levante"
            value={capacidadLevante}
            onChangeText={setCapacidadLevante}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Porcentaje de Utilización:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese porcentaje de utilización"
            value={porcentajeUtilizacion}
            onChangeText={setPorcentajeUtilizacion}
            keyboardType="numeric"
          />

          <TouchableOpacity onPress={handleUpdate} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Actualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditCrane;