import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from '../../styles/ModalStyles';

const ModalEditarCollab = ({ isVisible, onClose, onSave, colaborador }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const especialidades = [
    { label: 'Estructura', value: 'Estructura' },
    { label: 'Obras Civiles', value: 'Obras Civiles' },
    { label: 'Piping', value: 'Piping' },
    { label: 'Mecánica', value: 'Mecánica' },
    { label: 'Eléctrica', value: 'Eléctrica' },
  ];

  // Cargar los datos del colaborador cuando el modal se abra
  useEffect(() => {
    if (colaborador) {
      setNombre(colaborador.nombre);
      setApellido(colaborador.apellido);
      setRut(colaborador.rut);
      setEmail(colaborador.email);
      setTelefono(colaborador.phone);
      setEspecialidad(colaborador.specialty);
    }
  }, [colaborador, isVisible]); // Dependiendo de 'colaborador' e 'isVisible'
  
  const handleSave = () => {
    if (nombre && apellido && rut && email && telefono && especialidad) {
      const colaboradorEditado = {
        nombre,
        apellido,
        rut,
        phone: telefono,
        email,
        specialty: especialidad,
        roles: colaborador ? colaborador.roles : [], // Mantener roles si están definidos
      };
    
      onSave(colaboradorEditado); // Llama a la función onSave para actualizar el colaborador
      onClose(); // Cierra el modal
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const handleEspecialidadSelect = (item) => {
    setEspecialidad(item.label); // Establece la especialidad seleccionada
    setShowMenu(false); // Cierra el menú después de seleccionar una opción
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Colaborador</Text>
          <Text style={styles.label}>Nombre(s):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese nombre(s) del colaborador"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="default"
            value={nombre}
            onChangeText={setNombre}
          />
          
          <Text style={styles.label}>Apellido(s):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese apellido(s) del colaborador"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="default"
            value={apellido}
            onChangeText={setApellido}
          />

          <Text style={styles.label}>RUT:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese RUT del colaborador"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="default"
            value={rut}
            onChangeText={setRut}
          />

          <Text style={styles.label}>Correo Electrónico:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese correo electrónico"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese teléfono"
            placeholderTextColor={styles.placeholderText.color}
            keyboardType="phone-pad"
            value={telefono}
            onChangeText={setTelefono}
          />

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
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalEditarCollab;
