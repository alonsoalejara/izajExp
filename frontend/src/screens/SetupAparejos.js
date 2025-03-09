import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import Components from '../components/Components.index';

const SetupAparejos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { usuarioId } = route.params || {};

  const [isCantidadModalVisible, setCantidadModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);
  const [cantidadManiobra, setCantidadManiobra] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  const handleNavigateToSetupCarga = () => {
    navigation.navigate('SetupCarga');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, top: -10 }}>
        <Components.Header />
        <View style={[styles.titleContainer, { marginTop: 110 }]}>
          <Text style={styles.sectionTitle}>Configuración de aparejos</Text>
        </View>

        <View style={styles.container}>
          {/* Configurar Maniobra */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Maniobra: (cantidad y tipo)</Text>
          </View>

          <View style={styles.inputContainer}>
            <Components.ConfigButton
              label="Cantidad"
              value={cantidadManiobra ? `${cantidadManiobra}` : ""}
              onPress={() => openModal(setCantidadModalVisible)}
              width={150}
            />
            <Components.ConfigButton
              label="Tipo"
              value={eslingaOEstrobo ? `${eslingaOEstrobo}` : ""}
              onPress={() => openModal(setManiobraModalVisible)}
              width={150}
            />
          </View>

          {/* Configurar Grillete */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Grillete: (cantidad y tipo)</Text>
          </View>

          <View style={styles.inputContainer}>
            <Components.NumericInput
              label="Cantidad"
              value={cantidadGrilletes}
              onChangeText={setCantidadGrilletes}
              placeholder="Cantidad"
            />
            <Components.ConfigButton
              label="Grillete"
              value={tipoGrillete ? `Grill. de ${tipoGrillete}"` : ""}
              onPress={() => openModal(setGrilleteModalVisible)}
              width={150}
            />
          </View>

          <BS.BSGrillete
            isVisible={isGrilleteModalVisible}
            onClose={() => setGrilleteModalVisible(false)}
            onSelect={setTipoGrillete}
          />

          <BS.BSCantidad
            isVisible={isCantidadModalVisible}
            onClose={() => setCantidadModalVisible(false)}
            onSelect={setCantidadManiobra}
          />

          <BS.BSManiobra
            isVisible={isManiobraModalVisible}
            onClose={() => setManiobraModalVisible(false)}
            onSelect={setEslingaOEstrobo}
          />

          <Components.Button
            label="Continuar"
            onPress={handleNavigateToSetupCarga}
            style={{ marginTop: 280, marginBottom: 20, width: 330, left: -60 }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupAparejos;
