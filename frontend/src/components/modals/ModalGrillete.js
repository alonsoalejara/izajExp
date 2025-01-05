import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import ModalStyles from '../../styles/ModalStyles';
import { grilleteOptions } from '../../data/grilleteData';

const ModalGrillete = ({ isVisible, onClose, onSelectCantidad, onSelectTipo }) => {
  const [cantidad, setCantidad] = useState('');
  const [tipo, setTipo] = useState('');
  const [peso, setPeso] = useState(null);
  const [errorCantidad, setErrorCantidad] = useState('')
  const [errorTipo, setErrorTipo] = useState('');
  const [cantidadBorderColor, setCantidadBorderColor] = useState('#ccc');
  const [tipoBorderColor, setTipoBorderColor] = useState('#ccc');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (cantidad === '') {
      setErrorCantidad('');
      setCantidadBorderColor('#ccc');
    } else if (!/^\d+$/.test(cantidad)) {
      setErrorCantidad('Ingrese un valor numérico válido');
      setCantidadBorderColor('#ff0000');
    } else if (cantidad <= 0) {
      setErrorCantidad('Ingrese un valor mayor a 0');
      setCantidadBorderColor('#ff0000');
    } else if (cantidad > 6) {
      setErrorCantidad('Son demasiados grilletes');
      setCantidadBorderColor('#ff0000');
    } else {
      setErrorCantidad('');
      setCantidadBorderColor('#ccc');
    }
  }, [cantidad]);

  const handleGuardar = () => {
    let hasError = false;
  
    if (!cantidad) {
      setErrorCantidad('Ingrese un valor');
      setCantidadBorderColor('#ff0000');
      hasError = true;
    }
  
    if (!tipo) {
      setErrorTipo('Seleccione un diámetro para grillete');
      setTipoBorderColor('#ff0000');
      hasError = true;
    }
  
    if (!hasError) {
      onSelectCantidad(cantidad);
      onSelectTipo({ tipo: tipo, peso: peso });
      onClose();
    }
  };
  

  const renderOption = ({ item }) => (
    <TouchableOpacity 
      style={[ModalStyles.menuItem, tipo === item.pulgada ? ModalStyles.selectedMenuItem : {}]}
      onPress={() => {
        setTipo(item.pulgada);
        setPeso(item.peso);
        setErrorTipo('');
        setTipoBorderColor('#ccc');
        setShowMenu(false);
      }}
    >
      <Text 
        style={[ModalStyles.menuText, tipo === item.pulgada ? ModalStyles.selectedMenuText : {}]}
      >
        {item.pulgada}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={ModalStyles.modalContainer}>
          <View style={ModalStyles.modalContent}>
            <Text style={ModalStyles.modalTitle}>Configuración Grillete</Text>

            <Text style={ModalStyles.label}>Ingrese la cantidad de grilletes</Text>
            <TextInput
              style={[ModalStyles.optionButton, { borderColor: cantidadBorderColor }]}
              placeholder="Cantidad de Grilletes"
              placeholderTextColor={ModalStyles.placeholderText.color}
              keyboardType="numeric"
              value={cantidad}
              onChangeText={(value) => {
                setCantidad(value);
                setErrorCantidad('');
                setCantidadBorderColor('#ccc');
              }}
            />
            {errorCantidad ? <Text style={{ color: '#ff0000', fontSize: 14 }}>{errorCantidad}</Text> : null}

            <Text style={ModalStyles.label}>Seleccione el tipo de grillete (pulg.)</Text>
            <TouchableOpacity
              style={[ModalStyles.optionButton, { borderColor: tipoBorderColor }]}
              onPress={() => setShowMenu(!showMenu)}
            >
              <Text>{tipo || 'Seleccione el diámetro'}</Text>
            </TouchableOpacity>
            {errorTipo ? <Text style={{ color: '#ff0000', fontSize: 14 }}>{errorTipo}</Text> : null}

            {showMenu && (
              <View style={ModalStyles.menuContainerGrillete}>
                <FlatList
                  data={grilleteOptions}
                  renderItem={renderOption}
                  keyExtractor={(item) => item.pulgada}
                />
              </View>
            )}

            <View style={ModalStyles.modalButtons}>
              <TouchableOpacity style={ModalStyles.closeButton} onPress={onClose}>
                <Text style={ModalStyles.closeButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={ModalStyles.saveButton} onPress={handleGuardar}>
                <Text style={ModalStyles.buttonText}>Seleccionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalGrillete;