import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles/ModalStyles';
import getApiUrl from '../../../utils/apiUrl';

const ModalEditSetupIzaje = ({ isVisible, onClose, setupIzaje, onUpdate }) => {
  const [largoPluma, setLargoPluma] = useState(setupIzaje ? setupIzaje.datos.largoPluma : '');
  const [contrapeso, setContrapeso] = useState(setupIzaje ? setupIzaje.datos.contrapeso : '');
  const [pesoEquipo, setPesoEquipo] = useState(setupIzaje ? setupIzaje.cargas.pesoEquipo : '');
  const [pesoGancho, setPesoGancho] = useState(setupIzaje ? setupIzaje.cargas.pesoGancho : '');
  const [radioTrabajoMax, setRadioTrabajoMax] = useState(setupIzaje ? setupIzaje.cargas.radioTrabajoMax : '');
  const [capacidadLevante, setCapacidadLevante] = useState(setupIzaje ? setupIzaje.cargas.capacidadLevante : '');
  const [aparejos, setAparejos] = useState(setupIzaje ? setupIzaje.aparejos : [{ descripcion: '', cantidad: '', pesoUnitario: '', pesoTotal: '' }]);
  const [usuario, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('usuarioId');
      setUserId(storedUserId);
    };

    getUserId();

    if (setupIzaje) {
      setLargoPluma(setupIzaje.datos.largoPluma);
      setContrapeso(setupIzaje.datos.contrapeso);
      setPesoEquipo(setupIzaje.cargas.pesoEquipo);
      setPesoGancho(setupIzaje.cargas.pesoGancho);
      setRadioTrabajoMax(setupIzaje.cargas.radioTrabajoMax);
      setCapacidadLevante(setupIzaje.cargas.capacidadLevante);
      setAparejos(setupIzaje.aparejos || []);
    }
  }, [setupIzaje]);

  const handleUpdate = async () => {
    if (!usuario) {
      alert('El ID del usuario no está disponible.');
      return;
    }

    const totalAparejosPeso = aparejos.reduce((acc, aparejo) => acc + Number(aparejo.pesoTotal), 0);

    const updatedSetupIzaje = {
      usuario, 
      aparejos: aparejos.map(({ descripcion, cantidad, pesoUnitario, pesoTotal }) => ({
        descripcion, 
        cantidad: Number(cantidad), 
        pesoUnitario: Number(pesoUnitario), 
        pesoTotal: Number(pesoTotal),
      })),
      datos: {
        largoPluma: Number(largoPluma),
        contrapeso: Number(contrapeso),
      },
      cargas: {
        pesoEquipo: Number(pesoEquipo),
        pesoAparejos: totalAparejosPeso,
        pesoGancho: Number(pesoGancho),
        pesoTotal: Number(pesoEquipo) + Number(pesoGancho) + totalAparejosPeso,
        radioTrabajoMax: Number(radioTrabajoMax),
        capacidadLevante: Number(capacidadLevante),
        porcentajeUtilizacion: 0,  // Porcentaje de utilización (esto se puede ajustar)
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

      const response = await fetch(getApiUrl(`setupIzaje/${setupIzaje._id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedSetupIzaje),
      });

      const data = await response.json();
      if (response.ok) {
        onUpdate(updatedSetupIzaje);
        onClose();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert('Hubo un error al actualizar el plan de izaje.');
    }
  };

  const handleAparejoChange = (index, field, value) => {
    const updatedAparejos = [...aparejos];
    updatedAparejos[index][field] = value;
    if (field === 'pesoUnitario' || field === 'cantidad') {
      updatedAparejos[index].pesoTotal = updatedAparejos[index].cantidad * updatedAparejos[index].pesoUnitario;
    }
    setAparejos(updatedAparejos);
  };

  const addAparejo = () => {
    setAparejos([...aparejos, { descripcion: '', cantidad: '', pesoUnitario: '', pesoTotal: '' }]);
  };

  const removeAparejo = (index) => {
    const updatedAparejos = aparejos.filter((_, i) => i !== index);
    setAparejos(updatedAparejos);
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

          {/* Lista de aparejos */}
          <Text style={styles.label}>Aparejos:</Text>
          <FlatList
            data={aparejos}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.aparejoContainer}>
                <TextInput
                  style={styles.optionButton}
                  placeholder="Descripción"
                  value={item.descripcion}
                  onChangeText={(text) => handleAparejoChange(index, 'descripcion', text)}
                />
                <TextInput
                  style={styles.optionButton}
                  placeholder="Cantidad"
                  value={item.cantidad}
                  onChangeText={(text) => handleAparejoChange(index, 'cantidad', text)}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.optionButton}
                  placeholder="Peso Unitario"
                  value={item.pesoUnitario}
                  onChangeText={(text) => handleAparejoChange(index, 'pesoUnitario', text)}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.optionButton}
                  placeholder="Peso Total"
                  value={item.pesoTotal.toString()}
                  editable={false}
                />
                <TouchableOpacity onPress={() => removeAparejo(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

          <TouchableOpacity onPress={addAparejo} style={styles.addButton}>
            <Text style={styles.addButtonText}>Agregar Aparejo</Text>
          </TouchableOpacity>

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

export default ModalEditSetupIzaje;