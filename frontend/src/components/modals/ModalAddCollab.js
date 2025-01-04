import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de que AsyncStorage esté instalado
import styles from '../../styles/ModalStyles';

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

  const especialidades = [
    { label: 'Estructura', value: 'Estructura' },
    { label: 'Obras Civiles', value: 'Obras Civiles' },
    { label: 'Piping', value: 'Piping' },
    { label: 'Mecánica', value: 'Mecánica' },
    { label: 'Eléctrica', value: 'Eléctrica' },
  ];

  const getApiUrl = () => (
    Platform.OS === 'android' 
      ? 'http://10.0.2.2:3000/api/user/' 
      : 'http://192.168.1.84:3000/api/user/'
  );

  const validarEmail = (text) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmail(text);
    if (text === '') {
      setEmailError('');
    } else if (!emailPattern.test(text)) {
      setEmailError('El correo electrónico no tiene el formato correcto');
    } else {
      setEmailError('');
    }
  };

  const validarNombre = (text) => {
    const trimmedText = text.trim();
    setNombre(text);
    if (text === '') {
      setNombreError('');
    } else if (text.startsWith(' ')) {
      setNombreError('No puede comenzar con espacios.');
    } else if (trimmedText === '') {
      setNombreError('El nombre no puede contener solo espacios.');
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ,\s-]+$/.test(trimmedText)) {
      setNombreError('No se aceptan números/caracteres especiales.');
    } else {
      setNombreError('');
    }
  };

  const validarApellido = (text) => {
    const trimmedText = text.trim();
    setApellido(text);
    if (text === '') {
      setApellidoError('');
    } else if (text.startsWith(' ')) {
      setApellidoError('No puede comenzar con espacios.');
    } else if (trimmedText === '') {
      setApellidoError('El apellido no puede contener solo espacios.');
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ,\s-]+$/.test(trimmedText)) {
      setApellidoError('No se aceptan número/caracter especial.');
    } else {
      setApellidoError('');
    }
  };

  const validarRut = (text) => {
    const rutPattern = /^\d{7,8}-[0-9Kk]{1}$/;
    setRut(text);
    if (text === '') {
      setRutError('');
    } else if (!rutPattern.test(text)) {
      setRutError('El RUT no tiene el formato correcto (ej: 12345678-K)');
    } else {
      setRutError('');
    }
  };

  const validarTelefono = (text) => {
    const telefonoPattern = /^\+569\d{8}$/;
    setTelefono(text);
    if (text === '') {
      setTelefonoError('');
    } else if (!telefonoPattern.test(text)) {
      setTelefonoError('Debe tener el formato +569XXXXXXXX');
    } else {
      setTelefonoError('');
    }
  };

  const generarPassword = () => {
    // Genera la contraseña a partir de la primera letra del nombre, apellido y los primeros 4 dígitos del RUT
    const password = `${nombre.charAt(0).toUpperCase()}${apellido.charAt(0).toUpperCase()}${rut.replace('-', '').substring(0, 4)}`;
    return password;
  };

  const handleSave = async () => {
    // Verificar si todos los campos están completos y sin errores
    if (!nombreError && !apellidoError && !emailError && nombre && apellido && rut && email && telefono && especialidad) {
      const nuevoColaborador = {
        nombre,
        apellido,
        rut,
        phone: telefono,
        specialty: especialidad,
        email,
        roles: ['user'],
        password: generarPassword(), // Generar la contraseña
      };
  
      try {
        // Obtener el token de AsyncStorage
        const accessToken = await AsyncStorage.getItem('accessToken');
        console.log('Token:', accessToken);
  
        if (!accessToken) {
          console.error('No se encontró el token.');
          alert('No autorizado. Por favor, inicie sesión nuevamente.');
          return;
        }
  
        // Verificar el formato del token
        const tokenPattern = /^[A-Za-z0-9-._~+\/]+=*$/; // Regex básico para verificar si el token tiene el formato adecuado
        if (!tokenPattern.test(accessToken)) {
          console.error('El token JWT está mal formado.');
          alert('Token JWT malformado. Por favor, inicie sesión nuevamente.');
          return;
        }
  
        // Enviar la solicitud POST
        const response = await fetch(getApiUrl(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Agregar el token al encabezado
          },
          body: JSON.stringify(nuevoColaborador),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log('Colaborador guardado con éxito:', data);
          onSave(nuevoColaborador);
          onClose();
        } else {
          console.error('Error al guardar el colaborador:', data);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al guardar el colaborador. Intente nuevamente.');
      }
    }
  };

  // Validar si el botón de guardar debe estar habilitado
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
            placeholder="Ingrese nombre(s) del colaborador"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="default"
            value={nombre}
            onChangeText={setNombre}
            onBlur={() => validarNombre(nombre)}
          />
          {nombreError ? <Text style={{ color: 'red' }}>{nombreError}</Text> : null}

          <Text style={styles.label}>Apellido(s):</Text>
          <TextInput
            style={[styles.optionButton, apellidoError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese apellido(s) del colaborador"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="default"
            value={apellido}
            onChangeText={setApellido}
            onBlur={() => validarApellido(apellido)}
          />
          {apellidoError ? <Text style={{ color: 'red' }}>{apellidoError}</Text> : null}

          <Text style={styles.label}>RUT (Sin puntos y con guión):</Text>
          <TextInput
            style={[styles.optionButton, rutError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese RUT del colaborador"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="default"
            value={rut}
            onChangeText={setRut}
            onBlur={() => validarRut(rut)}
          />
          {rutError ? <Text style={{ color: 'red' }}>{rutError}</Text> : null}

          <Text style={styles.label}>Correo Electrónico:</Text>
          <TextInput
            style={[styles.optionButton, emailError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese correo electrónico"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onBlur={() => validarEmail(email)}
          />
          {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

          <Text style={styles.label}>N° Teléfono:</Text>
          <TextInput
            style={[styles.optionButton, telefonoError ? { borderColor: 'red' } : {}]}
            placeholder="Ingrese teléfono"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
            onBlur={() => validarTelefono(telefono)}
          />
          {telefonoError ? <Text style={{ color: 'red' }}>{telefonoError}</Text> : null}

          <Text style={styles.label}>Especialidad</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Text>{especialidad || 'Selecciona una especialidad'}</Text>
          </TouchableOpacity>

          {showMenu && (
            <View style={styles.menuContainer}>
              <FlatList
                data={especialidades}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => handleEspecialidadSelect(item)}
                  >
                    <Text style={styles.menuText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, !isSaveButtonEnabled ? { backgroundColor: 'gray' } : {}]}
              onPress={handleSave}
              disabled={!isSaveButtonEnabled}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCrearColaborador;
