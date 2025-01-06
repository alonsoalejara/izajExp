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
  const [pesoAparejos1] = useState(setupIzaje ? setupIzaje.aparejos[0].pesoUnitario : '');
  const [cantidadAparejos1, setCantidadAparejos1] = useState(setupIzaje ? setupIzaje.aparejos[0].cantidad : '');
  const [pesoAparejos2] = useState(setupIzaje ? setupIzaje.aparejos[1].pesoUnitario : '');
  const [cantidadAparejos2, setCantidadAparejos2] = useState(setupIzaje ? setupIzaje.aparejos[1].cantidad : '');
  const [pesoGancho, setPesoGancho] = useState(setupIzaje ? setupIzaje.cargas.pesoGancho : '');
  const [radioTrabajoMax, setRadioTrabajoMax] = useState(setupIzaje ? setupIzaje.cargas.radioTrabajoMax : '');
  const [capacidadLevante, setCapacidadLevante] = useState(setupIzaje ? setupIzaje.cargas.capacidadLevante : '');

  const calcularPesoTotalAparejos1 = cantidadAparejos1 * pesoAparejos1;
  const calcularPesoTotalAparejos2 = cantidadAparejos2 * pesoAparejos2;
  const pesoTotalAparejos = calcularPesoTotalAparejos1 + calcularPesoTotalAparejos2;
  const porcentajeUtilizacion = 0;

  useEffect(() => {
    if (setupIzaje) {
      setLargoPluma(setupIzaje.datos.largoPluma);
      setContrapeso(setupIzaje.datos.contrapeso);
      setPesoEquipo(setupIzaje.cargas.pesoEquipo);
      setPesoGancho(setupIzaje.cargas.pesoGancho);
      setRadioTrabajoMax(setupIzaje.cargas.radioTrabajoMax);
      setCapacidadLevante(setupIzaje.cargas.capacidadLevante);
    }
  }, [setupIzaje]);

  const handleUpdate = async () => {

    const updatedSetupIzaje = {
      aparejos: [
        {
          descripcion: 'Estrobo',
          cantidad: Number(cantidadAparejos1),
          pesoUnitario: Number(pesoAparejos1),
          pesoTotal: calcularPesoTotalAparejos1,
        },
        {
          descripcion: 'Grillete',
          cantidad: Number(cantidadAparejos2),
          pesoUnitario: Number(pesoAparejos2),
          pesoTotal: calcularPesoTotalAparejos2,
        },
      ],
      datos: {
        largoPluma,
        contrapeso,
      },
      cargas: {
        pesoEquipo: Number(pesoEquipo),
        pesoAparejos: pesoTotalAparejos,
        pesoGancho: Number(pesoGancho),
        pesoTotal: pesoTotalAparejos + Number(pesoGancho) + Number(pesoEquipo),  // Total de los pesos
        radioTrabajoMax: Number(radioTrabajoMax),
        capacidadLevante: Number(capacidadLevante),
        porcentajeUtilizacion,  // Se mantiene como 0
      },
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
        },
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

          {/* Campos de entrada */}
          <Text style={styles.label}>Largo de la Pluma (m):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese largo de la pluma"
            value={largoPluma}
            onChangeText={setLargoPluma}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Contrapeso (ton):</Text>
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

          <Text style={styles.label}>Cantidad de Aparejos 1:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese cantidad"
            value={cantidadAparejos1}
            onChangeText={setCantidadAparejos1}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Cantidad de Aparejos 2:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese cantidad"
            value={cantidadAparejos2}
            onChangeText={setCantidadAparejos2}
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

          {/* Botones de acción */}
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
