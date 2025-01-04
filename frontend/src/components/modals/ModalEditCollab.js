import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from '../../styles/ModalStyles';
import validationUser from '../../utils/validationUser';
import { especialidades } from '../../data/especialidadesData';

const ModalAddCollab = ({ isVisible, onClose, onSave, colaborador }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (colaborador) {
      setNombre(colaborador.nombre || '');
      setApellido(colaborador.apellido || '');
      setRut(colaborador.rut || '');
      setEmail(colaborador.email || '');
      setTelefono(colaborador.phone || '');
      setEspecialidad(colaborador.specialty || '');
    }
  }, [colaborador, isVisible]);

  const handleSave = () => {
    const newErrors = {};

    // Usamos las funciones del objeto validationUser
    validationUser.validarNombre(nombre, setNombre, (error) => newErrors.nombre = error);
    validationUser.validarApellido(apellido, setApellido, (error) => newErrors.apellido = error);
    validationUser.validarRut(rut, setRut, (error) => newErrors.rut = error);
    validationUser.validarEmail(email, setEmail, (error) => newErrors.email = error);
    validationUser.validarTelefono(telefono, setTelefono, (error) => newErrors.telefono = error);

    if (!especialidad) newErrors.especialidad = 'Seleccione una especialidad';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const colaboradorEditado = {
        nombre,
        apellido,
        rut,
        phone: telefono,
        email,
        specialty: especialidad,
        roles: colaborador ? colaborador.roles : [],
      };
      onSave(colaboradorEditado);
      onClose();
    }
  };

  const handleEspecialidadSelect = (item) => {
    setEspecialidad(item.value);
    setShowMenu(false);
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Añadir Colaborador</Text>
          <Text style={styles.label}>Nombre(s):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese nombre(s) del colaborador"
            value={nombre}
            onChangeText={setNombre}
          />
          {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

          <Text style={styles.label}>Apellido(s):</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese apellido(s) del colaborador"
            value={apellido}
            onChangeText={setApellido}
          />
          {errors.apellido && <Text style={styles.errorText}>{errors.apellido}</Text>}

          <Text style={styles.label}>RUT:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese RUT del colaborador"
            value={rut}
            onChangeText={setRut}
          />
          {errors.rut && <Text style={styles.errorText}>{errors.rut}</Text>}

          <Text style={styles.label}>Correo Electrónico:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese correo electrónico"
            value={email}
            onChangeText={setEmail}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={styles.optionButton}
            placeholder="Ingrese teléfono"
            value={telefono}
            onChangeText={setTelefono}
          />
          {errors.telefono && <Text style={styles.errorText}>{errors.telefono}</Text>}

          <Text style={styles.label}>Especialidad</Text>
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Text>{especialidad || 'Selecciona una especialidad'}</Text>
          </TouchableOpacity>
          {errors.especialidad && <Text style={styles.errorText}>{errors.especialidad}</Text>}

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

export default ModalAddCollab;