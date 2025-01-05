import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/ModalStyles';
import getApiUrl from '../../utils/apiUrl';
const axios = require('axios/dist/browser/axios.cjs');
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalGrua = ({ isVisible, onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [gruas, setGruas] = useState([]);

  useEffect(() => {
    const fetchGruas = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        
        if (!accessToken) {
          console.error('No se encontró el token de acceso');
          return;
        }

        const apiUrl = getApiUrl('grua');
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.state === 'Success') {
          setGruas(response.data.data);
        } else {
          console.error('No se pudieron obtener las grúas');
        }
      } catch (error) {
        console.error('Error al obtener las grúas:', error);
      }
    };

    if (isVisible) {
      fetchGruas();
    }
  }, [isVisible]);

  const handleSelect = () => {
    if (!selected) {
      setError('Debe elegir una grúa para confirmar');
    } else {
      const selectedGrua = gruas.find(grua => grua._id === selected);
      onSelect(selectedGrua);
      setError('');
      onClose();
    }
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Seleccionar Grúa</Text>
          {error ? <Text style={{ color: '#ff0000', marginTop: -10 }}>{error}</Text> : null}
          {gruas.length === 0 ? (
            <Text>No se encontraron grúas disponibles.</Text>
          ) : (
            gruas.map((grua) => (
              <TouchableOpacity
                key={grua._id}
                style={[ 
                  styles.optionButton,
                  selected === grua._id ? styles.selectedOption : null,
                ]}
                onPress={() => {
                  setSelected(grua._id);
                  setError('');
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected === grua._id ? styles.selectedOptionText : null,
                  ]}
                >
                  {grua.nombre}
                </Text>
              </TouchableOpacity>
            ))
          )}
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSelect}>
              <Text style={styles.buttonText}>Seleccionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalGrua;
