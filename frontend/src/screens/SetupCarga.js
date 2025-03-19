import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import RenderForma from '../utils/render/renderForma';
import { validateCarga } from '../utils/validation/validateCarga';
import { calculateCG } from '../utils/calculateCG';

const SetupCarga = () => {
  const navigation = useNavigation();
  const [peso, setPeso] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const [altura, setAltura] = useState('');
  const [forma, setForma] = useState('');
  const [isFormaVisible, setIsFormaVisible] = useState(false);
  const [carga, setCarga] = useState({
    peso: '',
    largo: '',
    ancho: '',
    alto: '',
    forma: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setCarga((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateInputs = () => {
    const newErrors = validateCarga(peso, largo, ancho, altura, forma);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNavigateToSetupGrua = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    let largoNum, anchoNum;
    if (forma === 'Cuadrado' || forma === 'Círculo') {
      largoNum = alturaNum;
      anchoNum = alturaNum;
    } else {
      largoNum = parseFloat(largo);
      anchoNum = parseFloat(ancho);
    }
    const cargaData = { 
      ...carga, 
      peso: pesoNum, 
      largo: largoNum, 
      ancho: anchoNum, 
      alto: alturaNum 
    };
    console.log("Datos que se están pasando a SetupGrua:", cargaData);
    if (largo === ancho && ancho === altura && largo !== '') {
      Alert.alert(
        "Dimensiones de un cubo detectadas",
        "Las dimensiones ingresadas corresponden a un cubo. ¿Desea cambiar la forma a 'Cuadrado'?",
        [
          {
            text: "No",
            onPress: () => {
              if (validateInputs()) {
                navigation.navigate('SetupGrua', { setupCargaData: cargaData });
              }
            },
            style: "cancel"
          },
          {
            text: "Sí",
            onPress: () => {
              setForma("Cuadrado");
              handleInputChange('forma', "Cuadrado");
              if (validateInputs()) {
                navigation.navigate('SetupGrua', { setupCargaData: cargaData });
              }
            }
          }
        ]
      );
    } else {
      if (validateInputs()) {
        navigation.navigate('SetupGrua', { setupCargaData: cargaData });
      }
    }
  };

  const altoLabel = forma === 'Círculo' ? 'diámetro' : forma === 'Cuadrado' ? 'lado' : 'alto';

  // Calcula el centro de gravedad usando la función importada.
  const cg = calculateCG(forma, altura, largo, ancho);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Cálculo de maniobras menores</Text>
          </View>
          <View style={[styles.container, { flexGrow: 1 }]}>
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione forma:</Text>
            </View>
            {errors.forma && (
              <Text style={[styles.errorText, { marginTop: -17, left: -0.4 }]}>{errors.forma}</Text>
            )}
            <Components.ConfigButton
              placeholder="Configurar Forma"
              value={forma || ''}
              onPress={() => setIsFormaVisible(true)}
              style={[{ width: 315 }, errors.forma && { borderColor: 'red', borderWidth: 3, borderRadius: 10 }]}
            />
            <Text style={styles.labelText}>
              Ingrese el peso y el {altoLabel} de la carga:
            </Text>
            <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
              <View style={styles.inputField}>
                {errors.peso && <Text style={styles.errorText}>{errors.peso}</Text>}
                <Components.NumericInput
                  value={peso}
                  onChangeText={(value) => {
                    setPeso(value);
                    handleInputChange('peso', value);
                  }}
                  placeholder="Peso de carga"
                  onEndEditing={() => {
                    const cleanedValue = peso.trim();
                    setPeso(cleanedValue);
                    handleInputChange('peso', cleanedValue);
                  }}
                  editable={!!forma}
                  style={[{ width: 150 }, errors.peso && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                />
              </View>
              <View style={styles.inputField}>
                {errors.alto && <Text style={styles.errorText}>{errors.alto}</Text>}
                <Components.NumericInput
                  value={altura}
                  onChangeText={(value) => {
                    setAltura(value);
                    handleInputChange('alto', value);
                  }}
                  placeholder={altoLabel.charAt(0).toUpperCase() + altoLabel.slice(1)}
                  onEndEditing={() => {
                    const cleanedValue = altura.trim();
                    setAltura(cleanedValue);
                    handleInputChange('alto', cleanedValue);
                  }}
                  editable={!!forma}
                  style={[{ width: 150 }, errors.alto && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                />
              </View>
            </View>
            {forma !== 'Círculo' && forma !== 'Cuadrado' && (
              <>
                <Text style={styles.labelText}>Ingrese el largo y ancho:</Text>
                <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
                  <View style={styles.inputField}>
                    {errors.largo && <Text style={styles.errorText}>{errors.largo}</Text>}
                    <Components.NumericInput
                      value={largo}
                      onChangeText={(value) => {
                        setLargo(value);
                        handleInputChange('largo', value);
                      }}
                      placeholder="Largo"
                      onEndEditing={() => {
                        const cleanedValue = largo.trim();
                        setLargo(cleanedValue);
                        handleInputChange('largo', cleanedValue);
                      }}
                      editable={!!forma}
                      style={[{ width: 150 }, errors.largo && { borderColor: 'red', top: -10, borderWidth: 3, borderRadius: 13 }]}
                    />
                  </View>
                  <View style={styles.inputField}>
                    {errors.ancho && <Text style={styles.errorText}>{errors.ancho}</Text>}
                    <Components.NumericInput
                      value={ancho}
                      onChangeText={(value) => {
                        setAncho(value);
                        handleInputChange('ancho', value);
                      }}
                      placeholder="Ancho"
                      onEndEditing={() => {
                        const cleanedValue = ancho.trim();
                        setAncho(cleanedValue);
                        handleInputChange('ancho', cleanedValue);
                      }}
                      editable={!!forma}
                      style={[{ width: 150 }, errors.ancho && { borderColor: 'red', top: -10, borderWidth: 3, borderRadius: 13 }]}
                    />
                  </View>
                </View>
              </>
            )}
            <Components.Button
              label="Continuar"
              onPress={handleNavigateToSetupGrua}
              style={{ marginTop: 15, marginBottom: 0, width: 330, left: -60 }}
            />
            <Text style={[styles.labelText, { marginTop: 15, marginBottom: 10 }]}>
              Visualización de forma:
            </Text>
            {cg && (
              <View style={{ marginTop: 5, marginBottom: 10, alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Centro de gravedad:</Text>
                <Text>
                  X: {cg.cgX.toFixed(2)} | Y: {cg.cgY.toFixed(2)} | Z: {cg.cgZ.toFixed(2)}
                </Text>
              </View>
            )}
            <View style={styles.visualizationCargaContainer}>
              <RenderForma
                forma={carga.forma}
                dimensiones={{
                  largo: carga.largo,
                  ancho: carga.ancho,
                  profundidad: carga.alto,
                }}
              />
            </View>
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
