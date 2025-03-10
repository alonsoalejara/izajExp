import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';

const SetupCarga = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { setupIzajeData, setupAparejosData } = route.params || {};

  const [forma, setForma] = useState('');
  const [material, setMaterial] = useState('');
  const [isFormaVisible, setIsFormaVisible] = useState(false);
  const [isMaterialVisible, setIsMaterialVisible] = useState(false);

  const handleNavigateToTablas = () => {
    console.log('-1. setupIzajeData:', setupIzajeData);
    console.log('-1. setupIzajeData.grua:', setupIzajeData?.grua);

    navigation.navigate('Tablas', {
      eslingaOEstrobo: setupAparejosData?.eslingaOEstrobo,
      cantidadManiobra: setupAparejosData?.cantidadManiobra,
      cantidadGrilletes: setupAparejosData?.cantidadGrilletes,
      tipoGrillete: setupAparejosData?.tipoGrillete,
      grua: setupIzajeData?.grua,
      radioIzaje: setupIzajeData?.radioIzaje,
      radioMontaje: setupIzajeData?.radioMontaje,
      usuarioId: setupIzajeData?.usuarioId,
      forma,
      material
    });
  };
  

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Configurar Carga</Text>
        </View>

        <View style={[styles.container, { flexGrow: 1 }]}>
          {/* Seleccionar Forma */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Seleccione forma:</Text>
          </View>

          <Components.ConfigButton
            label="Configurar Forma"
            value={forma}
            onPress={() => setIsFormaVisible(true)}
          />

          {/* Seleccionar Material */}
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Seleccione material:</Text>
          </View>

          <Components.ConfigButton
            label="Configurar Material"
            value={material}
            onPress={() => setIsMaterialVisible(true)}
          />

          <Components.Button
            label="Continuar"
            onPress={handleNavigateToTablas}
            style={{ marginTop: 280, marginBottom: 20, width: 330, left: -60 }}
          />
        </View>

        <BS.BSForma
          isVisible={isFormaVisible}
          onClose={() => setIsFormaVisible(false)}
          onSelect={(selectedForma) => setForma(selectedForma)}
        />

        <BS.BSMaterial
          isVisible={isMaterialVisible}
          onClose={() => setIsMaterialVisible(false)}
          onSelect={(selectedMaterial) => setMaterial(selectedMaterial)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupCarga;
