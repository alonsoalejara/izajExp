import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import RenderForma from '../utils/renderForma';

const SetupCarga = () => {
  const navigation = useNavigation();
  const [peso, setPeso] = useState('');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [forma, setForma] = useState('');
  const [isFormaVisible, setIsFormaVisible] = useState(false);
  const [carga, setCarga] = useState({
    peso: '',
    largo: '',
    ancho: '',
    alto: '',
    forma: '',
  });

  const handleInputChange = (field, value) => {
    setCarga({ ...carga, [field]: value });
  };

  const handleNavigateToSetupGrua = () => {
    navigation.navigate('SetupGrua');
  };

  const largoLabel = forma === 'Círculo' ? 'diámetro' : forma === 'Cuadrado' ? 'lado' : 'largo';
  const largoPlaceholder = forma === 'Círculo' ? 'Diámetro' : forma === 'Cuadrado' ? 'Lado' : 'Largo';

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Cálculo de maniobras menores</Text>
          </View>

          <View style={[styles.container, { flexGrow: 1 }]}>
            {/* Visualización de forma */}
            <Text style={[styles.labelText, { marginTop: 15, marginBottom: 10 }]}>Visualización de forma:</Text>

            {/* Condicional para mostrar las siglas */}
            {forma === 'Círculo' ? (
              <Text style={{ marginBottom: 15 }}>D: Diámetro</Text>
            ) : (
              <>
                <Text>A: Ancho</Text>
                <Text>L: Largo</Text>
                <Text style={{ marginBottom: 15 }}>P: Profundidad</Text>
              </>
            )}

            <View style={styles.visualizationContainer}>
              <RenderForma
                forma={carga.forma}
                dimensiones={{
                  largo: carga.largo,
                  ancho: carga.ancho,
                  profundidad: carga.alto, // Utiliza el campo 'alto' como profundidad
                }}
              />
            </View>

            <Text style={styles.labelText}>Ingrese el peso (kg) y el {largoLabel} (m) de la carga:</Text>

            <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
              {/* Peso de la carga */}
              <Components.NumericInput
                value={peso}
                onChangeText={(value) => {
                  setPeso(value);
                  handleInputChange('peso', value);
                }}
                placeholder="Peso de carga"
                onEndEditing={() => {
                  if (peso && !peso.includes('kg')) {
                    setPeso(peso + ' kg');
                    handleInputChange('peso', peso + ' kg');
                  }
                }}
                style={{ width: 150 }}
              />

              {/* Dimensiones */}
              <Components.NumericInput
                value={largo}
                onChangeText={(value) => {
                  setLargo(value);
                  handleInputChange('largo', value);
                }}
                placeholder={largoPlaceholder}
                onEndEditing={() => {
                  if (largo && !largo.includes('m')) {
                    setLargo(largo + ' m');
                    handleInputChange('largo', largo + ' m');
                  }
                }}
                style={{ width: 150 }}
              />
            </View>

            {/* Este inputContainer solo se muestra si no es "Círculo" ni "Cuadrado" */}
            {forma !== 'Círculo' && forma !== 'Cuadrado' && (
              <>
                <Text style={styles.labelText}>Ingrese el ancho (m) y profundidad (m):</Text>

                <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                  <Components.NumericInput
                    value={ancho}
                    onChangeText={(value) => {
                      setAncho(value);
                      handleInputChange('ancho', value);
                    }}
                    placeholder="Ancho"
                    onEndEditing={() => {
                      if (ancho && !ancho.includes('m')) {
                        setAncho(ancho + ' m');
                        handleInputChange('ancho', ancho + ' m');
                      }
                    }}
                    style={{ width: 150 }}
                  />
                  <Components.NumericInput
                    value={alto}
                    onChangeText={(value) => {
                      setAlto(value);
                      handleInputChange('alto', value);
                    }}
                    placeholder="Alto"
                    onEndEditing={() => {
                      if (alto && !alto.includes('m')) {
                        setAlto(alto + ' m');
                        handleInputChange('alto', alto + ' m');
                      }
                    }}
                    style={{ width: 150 }}
                  />
                </View>
              </>
            )}

            {/* Seleccionar Forma */}
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione forma:</Text>
            </View>

            <Components.ConfigButton
              label="Configurar Forma"
              value={forma}
              onPress={() => setIsFormaVisible(true)}
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
            onSelect={(selectedForma) => {
              setForma(selectedForma);
              handleInputChange('forma', selectedForma);
            }}
          />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupCarga;
