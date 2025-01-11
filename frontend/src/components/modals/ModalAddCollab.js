import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/ModalStyles';
import validationUser from '../../utils/validationUser';
import { especialidades } from '../../data/especialidadesData';
import getApiUrl from '../../utils/apiUrl';

const ModalCrearColaborador = ({ isVisible, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [nombreError, setNombreError] = useState('');
  const [apellidoError, setApellidoError] = useState('');
  const [rutError, setRutError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');

  const generarPassword = () => {
    return `${nombre.charAt(0).toUpperCase()}${apellido.charAt(0).toUpperCase()}${rut.replace('-', '').substring(0, 4)}`;
  };

  const handleSave = async () => {
    if (!nombreError && !apellidoError && !emailError && nombre && apellido && rut && email && telefono && especialidad) {
      const nuevoColaborador = {
        nombre,
        apellido,
        rut,
        phone: telefono,
        specialty: especialidad,
        email,
        roles: ['user'],
        password: generarPassword(),
      };
  
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          alert('No autorizado. Por favor, inicie sesión nuevamente.');
          return;
        }
  
        const response = await fetch(getApiUrl('user/'), { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(nuevoColaborador),
        });
  
        const data = await response.json();
        if (response.ok) {
          onSave(nuevoColaborador);
          onClose();
        } else {
          console.error('Error al guardar:', data);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al guardar el colaborador.');
      }
    }
  };

  const isSaveButtonEnabled = nombre && apellido && rut && email && telefono && especialidad && !nombreError && !apellidoError && !emailError && !rutError && !telefonoError;

  const handleEspecialidadSelect = (item) => {
    setEspecialidad(item.label);
    setShowMenu(false);
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Nuevo Colaborador</Text>

          <Text style={styles.label}>Nombre(s):</Text>
          <TextInput
            style={[styles.optionButton, nombreError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese nombre(s)"
            value={nombre}
            onChangeText={(text) => validationUser.validarNombre(text, setNombre, setNombreError)}
          />
          {nombreError ? <Text style={{ color: 'red' }}>{nombreError}</Text> : null}

          <Text style={styles.label}>Apellido(s):</Text>
          <TextInput
            style={[styles.optionButton, apellidoError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese apellido(s)"
            value={apellido}
            onChangeText={(text) => validationUser.validarApellido(text, setApellido, setApellidoError)}
          />
          {apellidoError ? <Text style={{ color: 'red' }}>{apellidoError}</Text> : null}

          <Text style={styles.label}>RUT:</Text>
          <TextInput
            style={[styles.optionButton, rutError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese RUT"
            value={rut}
            onChangeText={(text) => validationUser.validarRut(text, setRut, setRutError)}
          />
          {rutError ? <Text style={{ color: 'red' }}>{rutError}</Text> : null}

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={[styles.optionButton, emailError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese email"
            value={email}
            onChangeText={(text) => validationUser.validarEmail(text, setEmail, setEmailError)}
          />
          {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={[styles.optionButton, telefonoError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese teléfono"
            value={telefono}
            onChangeText={(text) => validationUser.validarTelefono(text, setTelefono, setTelefonoError)}
          />
          {telefonoError ? <Text style={{ color: 'red' }}>{telefonoError}</Text> : null}

          {/* Menu de especialidades */}
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.optionButton}>
            <Text>{especialidad || 'Seleccione especialidad'}</Text>
          </TouchableOpacity>
          {showMenu && (
            <FlatList
              data={especialidades}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleEspecialidadSelect(item)}>
                  <Text style={styles.optionButton}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value}
            />
          )}

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

export default ModalCrearColaborador;
