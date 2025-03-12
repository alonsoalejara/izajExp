import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';

const SetupCarga = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { setupGruaData, setupAparejosData } = route.params || {};

  const [forma, setForma] = useState('');
  const [material, setMaterial] = useState('');
  const [isFormaVisible, setIsFormaVisible] = useState(false);
  const [isMaterialVisible, setIsMaterialVisible] = useState(false);

  const handleNavigateToSetupGrua = () => {
    navigation.navigate('SetupGrua');
  };

  const handleNavigateToTablas = () => {
    console.log('SetupCarga: Datos enviados a Tablas:', {
      eslingaOEstrobo: setupAparejosData?.eslingaOEstrobo,
      cantidadManiobra: setupAparejosData?.cantidadManiobra,
      cantidadGrilletes: setupAparejosData?.cantidadGrilletes,
      tipoGrillete: setupAparejosData?.tipoGrillete,
      grua: setupGruaData?.grua,
      radioIzaje: setupGruaData?.radioIzaje,
      radioMontaje: setupGruaData?.radioMontaje,
      usuarioId: setupGruaData?.usuarioId,
      forma,
      material
    });

    navigation.navigate('Tablas', {
      eslingaOEstrobo: setupAparejosData?.eslingaOEstrobo,
      cantidadManiobra: setupAparejosData?.cantidadManiobra,
      cantidadGrilletes: setupAparejosData?.cantidadGrilletes,
      tipoGrillete: setupAparejosData?.tipoGrillete,
      grua: setupGruaData?.grua,
      radioIzaje: setupGruaData?.radioIzaje,
      radioMontaje: setupGruaData?.radioMontaje,
      usuarioId: setupGruaData?.usuarioId,
      forma,
      material
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Cálculo de maniobras menores</Text>
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

          {/* Botón Continuar */}
          <Components.Button
            label="Continuar"
            onPress={handleNavigateToSetupGrua}
            style={{ marginTop: 30, marginBottom: 30, width: 330, left: -60 }}
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
