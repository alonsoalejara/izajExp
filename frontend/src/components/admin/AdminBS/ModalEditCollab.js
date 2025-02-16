import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import styles from '../../../styles/BottomSheetStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EditCollab from './EditCollab/EditCollab.index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ModalEditColaborador = ({ isVisible, onClose, colaborador }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setTelefono] = useState('');
  const [specialty, setEspecialidad] = useState('');
  const [activeTab, setActiveTab] = useState(null); 
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (colaborador) {
      setId(colaborador._id || ''); 
      setNombre(colaborador.nombre || '');
      setApellido(colaborador.apellido || '');
      setRut(colaborador.rut || '');
      setEmail(colaborador.email || '');
      setTelefono(colaborador.phone || '');
      setEspecialidad(colaborador.specialty || '');
    }
  }, [colaborador]);

  return (
    <Modal transparent={true} visible={isVisible} animationType="none">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.bottomSheet, { height: SCREEN_HEIGHT * 0.8, top: 180, transform: [{ translateY }] }]}>
        <View style={styles.dragLine}></View>

        {activeTab === 'NameTab' ? (
          <EditCollab.NameTab
            id={id}
            nombre={nombre}
            setNombre={setNombre}
            apellido={apellido}
            setApellido={setApellido}
            rut={rut}
            email={email}
            phone={phone}
            specialty={specialty}
            onBack={() => setActiveTab(null)}
          />
        ) : activeTab === 'PersonalTab' ? (
          <EditCollab.PersonalTab
            id={id}
            nombre={nombre}
            apellido={apellido}
            rut={rut}
            setRut={setRut}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setTelefono={setTelefono}
            specialty={specialty}
            onBack={() => setActiveTab(null)}
          />
        ) : activeTab === 'SpecialtyTab' ? ( 
          <EditCollab.SpecialtyTab
            specialty={specialty}
            setEspecialidad={setEspecialidad}
            onBack={() => setActiveTab(null)}
          />
        ) : (
          <>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={onClose}>
                <Icon name="keyboard-arrow-left" size={40} color="#000" />
              </TouchableOpacity>
              <Text style={[styles.titleText, { fontSize: 18, left: 55 }]}>Editar colaborador</Text>
            </View>

            {/* Foto de perfil y nombre */}
            <View style={styles.profileContainer}>
              <Image 
                source={require('../../../../assets/blank-user-image.png')} 
                style={styles.profileImage} 
              />
              <Text style={styles.profileName}>{`${nombre} ${apellido}`}</Text>
            </View>

            {/* Botones */}
            <View style={styles.roundedButtonContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.topButton]} 
                onPress={() => setActiveTab('NameTab')}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.actionButtonText}>Nombre y apellido</Text>
                  <Icon name="chevron-right" size={24} color="#333" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => setActiveTab('PersonalTab')}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.actionButtonText}>Datos personales</Text>
                  <Icon name="chevron-right" size={24} color="#333" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.bottomButton]} 
                onPress={() => setActiveTab('SpecialtyTab')}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.actionButtonText}>Especialidad</Text>
                  <Icon name="chevron-right" size={24} color="#333" />
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Animated.View>
    </Modal>
  );
};

export default ModalEditColaborador;
