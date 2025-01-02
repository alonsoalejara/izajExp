import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import ModalStyles from '../../styles/ModalStyles'; // Asegúrate de importar el archivo de estilos

const ModalGrillete = ({ isVisible, onClose, onSelectCantidad, onSelectTipo }) => {
  const [cantidad, setCantidad] = useState('');
  const [tipo, setTipo] = useState(''); // Inicia como vacío
  const [errorCantidad, setErrorCantidad] = useState(''); // Error específico para cantidad
  const [errorTipo, setErrorTipo] = useState(''); // Error específico para tipo
  const [cantidadBorderColor, setCantidadBorderColor] = useState('#ccc'); // Color del borde para cantidad
  const [tipoBorderColor, setTipoBorderColor] = useState('#ccc'); // Color del borde para tipo
  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar el menú desplegable
  const grilleteOptions = [
    '3/16', '1/4', '5/16', '3/8', '7/16', '1/2', '5/8', '3/4', '7/8', '1', 
    '1 1/8', '1 1/4', '1 3/8', '1 1/2'
  ];

  useEffect(() => {
    if (cantidad === '') {
      setErrorCantidad('');
      setCantidadBorderColor('#ccc');
    } else if (!/^\d+$/.test(cantidad)) { // Solo permite números enteros positivos
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
      onSelectTipo(tipo);
      onClose();
    }
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity 
      style={[
        ModalStyles.menuItem, 
        tipo === item ? ModalStyles.selectedMenuItem : {}
      ]}
      onPress={() => {
        setTipo(item);
        setErrorTipo(''); // Limpiar error al seleccionar
        setTipoBorderColor('#ccc');
        setShowMenu(false);
      }}
    >
      <Text 
        style={[
          ModalStyles.menuText, 
          tipo === item ? ModalStyles.selectedMenuText : {}
        ]}
      >
        {item}
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
                setErrorCantidad(''); // Limpiar error al escribir
                setCantidadBorderColor('#ccc');
              }}
            />
            {errorCantidad ? <Text style={{ color: '#ff0000', fontSize: 14 }}>{errorCantidad}</Text> : null}

            <Text style={ModalStyles.label}>Seleccione el tipo de grillete (pulg.)</Text>
            <TouchableOpacity
              style={[ModalStyles.optionButton, { borderColor: tipoBorderColor }]}
              onPress={() => setShowMenu(!showMenu)} // Muestra/oculta el menú desplegable
            >
              <Text>{tipo || 'Seleccione el diámetro'}</Text>
            </TouchableOpacity>
            {errorTipo ? <Text style={{ color: '#ff0000', fontSize: 14 }}>{errorTipo}</Text> : null}

            {showMenu && (
              <View style={ModalStyles.menuContainerGrillete}>
                <FlatList
                  data={grilleteOptions}
                  renderItem={renderOption}
                  keyExtractor={(item) => item}
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