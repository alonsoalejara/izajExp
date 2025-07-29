import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import RenderForma from '../utils/render/renderForma';
import RenderCG from '../utils/render/renderCG';
import { validateCarga } from '../utils/validation/validateCarga';
import { calculateGeometry } from '../utils/calculateGeometry';

const SetupCarga = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [peso, setPeso] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const [altura, setAltura] = useState('');
  const [diametro, setDiametro] = useState('');
  const [forma, setForma] = useState('');
  const [isFormaVisible, setIsFormaVisible] = useState(false);
  const [carga, setCarga] = useState({ peso: '', largo: '', ancho: '', alto: '', forma: '', diametro: '' });
  const [errors, setErrors] = useState({});

  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    if (route.params) {
      setPlanData(route.params);
    }
  }, [route.params]);

  const handleInputChange = (field, value) => {
    setCarga((prev) => ({ ...prev, [field]: value }));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateInputs = () => {
    const newErrors = validateCarga(peso, largo, ancho, altura, forma, diametro);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuar = () => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const largoNum = parseFloat(largo);
    const anchoNum = parseFloat(ancho);
    const diametroNum = parseFloat(diametro);

    let cargaData = {
      peso: pesoNum,
      alto: alturaNum,
      largo: largoNum,
      ancho: anchoNum,
      diametro: diametroNum,
      forma: forma,
    };

    const navigateToNextScreen = () => {
      if (validateInputs()) {
        const allDataToSend = {
          planData: planData,
          setupCargaData: cargaData,
        };
        navigation.navigate('SetupGrua', allDataToSend);
      }
    };

    if (forma !== 'Cilindro' && largo === ancho && ancho === altura && largo !== '') {
      Alert.alert(
        "Dimensiones de un cubo detectadas",
        "Las dimensiones ingresadas corresponden a un cubo. ¿Desea cambiar la forma a 'Cuadrado'?",
        [
          {
            text: "No",
            onPress: navigateToNextScreen,
            style: "cancel"
          },
          {
            text: "Sí",
            onPress: () => {
              setForma("Cuadrado");
              handleInputChange('forma', "Cuadrado");
              cargaData = {
                ...cargaData,
                forma: "Cuadrado",
                largo: alturaNum,
                ancho: alturaNum,
                diametro: 0,
              };
              navigateToNextScreen();
            }
          }
        ]
      );
    } else {
      navigateToNextScreen();
    }
  };

  const altoLabel = forma === 'Cilindro' ? 'altura' : forma === 'Cuadrado' ? 'lado' : 'alto';

  const geometry = calculateGeometry(
    forma,
    altura,
    largo,
    ancho,
    diametro
  );

  const cg = geometry?.cg;
  const { d1x, d2x, d1y, d2y, d1z, d2z } = geometry?.dimensions || { d1x: 0, d2x: 0, d1y: 0, d2y: 0, d1z: 0, d2z: 0 };
  
  let isCylinderVertical = false;
  if (forma === 'Cilindro' && parseFloat(altura) > parseFloat(diametro)) {
      isCylinderVertical = true;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Components.Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
          <View style={styles.titleContainer}>
            <Text style={[styles.sectionTitle, { top: 5 }]}>Carga</Text>
          </View>
          <View style={[styles.container, { flexGrow: 1 }]}>
            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione forma:</Text>
            </View>
            {errors.forma && (
              <Text style={[styles.errorText, { marginTop: -17, top: 12, left: -0.4 }]}>{errors.forma}</Text>
            )}
            <Components.ConfigButton
              placeholder="Configurar Forma"
              value={forma || ''}
              onPress={() => setIsFormaVisible(true)}
              style={[{ width: 315 }, errors.forma && { borderColor: 'red', borderWidth: 3, borderRadius: 10 }]}
            />
            {forma === 'Cilindro' && (
              <Text style={styles.labelText}>
                Ingrese el peso (ton) y el {altoLabel} (m) de la carga:
              </Text>
            )}
            {forma !== 'Cilindro' && (
              <Text style={styles.labelText}>
                Ingrese el peso (ton) y el {altoLabel} (m) de la carga:
              </Text>
            )}

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
                  placeholder={forma === 'Cilindro' ? 'Altura' : altoLabel.charAt(0).toUpperCase() + altoLabel.slice(1)}
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

            {forma !== 'Cilindro' && forma !== 'Cuadrado' && (
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
            {forma === 'Cilindro' && (
              <View style={styles.inputWrapper}>
                <Text style={[styles.labelText, { top: -8 }]}>Ingrese el diámetro (m):</Text>
                {errors.diametro && <Text style={styles.errorText}>{errors.diametro}</Text>}
                <Components.NumericInput
                  value={diametro}
                  onChangeText={(value) => {
                    setDiametro(value);
                    handleInputChange('diametro', value);
                  }}
                  placeholder="Diámetro del cilindro"
                  onEndEditing={() => {
                    const cleanedValue = diametro.trim();
                    setDiametro(cleanedValue);
                    handleInputChange('diametro', cleanedValue);
                  }}
                  editable={!!forma}
                  style={[{ width: 320 }, errors.diametro && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 }]}
                />
              </View>
            )}
            {geometry && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 10 }}>
                <View style={{ flex: 1 }}>
                  <View style={{ alignItems: 'flex-start' }}>
                    <Text style={{ fontWeight: 'bold' }}>Centro de gravedad:</Text>
                    <Text>
                      X: {cg.cgX.toFixed(1)} | Y: {cg.cgY.toFixed(1)} | Z: {cg.cgZ.toFixed(1)}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 20 }}>
                  <Text style={{ fontWeight: 'bold' }}>Dimensiones:</Text>
                  {forma === 'Cilindro' ? (
                    <>
                      <Text>{isCylinderVertical ? `Altura: ${parseFloat(altura).toFixed(1)} m` : `Largo: ${parseFloat(altura).toFixed(1)} m`}</Text>
                      <Text>Diámetro: {parseFloat(diametro).toFixed(1)} m</Text>
                    </>
                  ) : (
                    <>
                      <Text>Largo: {parseFloat(largo).toFixed(1)} m</Text>
                      <Text>Ancho: {parseFloat(ancho).toFixed(1)} m</Text>
                      <Text>Altura: {parseFloat(altura).toFixed(1)} m</Text>
                    </>
                  )}
                </View>
              </View>
            )}
            <View style={[styles.visualizationCargaContainer, { marginBottom: 40, marginTop: 20 }]}>
              <RenderForma
                forma={carga.forma}
                dimensiones={{
                  largo: isCylinderVertical ? parseFloat(diametro) : parseFloat(altura),
                  ancho: isCylinderVertical ? parseFloat(diametro) : parseFloat(diametro),
                  profundidad: isCylinderVertical ? parseFloat(altura) : parseFloat(diametro),
                  isCylinderVertical: isCylinderVertical
                }}
              />
            </View>
            {forma !== '' && (
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'left', top: -30 }}>
                    Visualización de la carga de lado y de frente:
                </Text>
            )}
            <RenderCG forma={forma} isCylinderVertical={isCylinderVertical} />
            <View style={[styles.buttonContainer, { right: 40, marginTop: 15 }]}>
              <Components.Button
                label="Volver"
                onPress={() => navigation.goBack()}
                isCancel
                style={[styles.button, { backgroundColor: 'transparent', marginRight: -50 }]}
              />
              <Components.Button
                label="Continuar"
                onPress={handleContinuar}
                style={[
                  styles.button,
                  { width: '50%', right: 45 },
                ]}
              />
            </View>
            <BS.BSForma
              isVisible={isFormaVisible}
              onClose={() => setIsFormaVisible(false)}
              onSelect={(selectedForma) => {
                setForma(selectedForma);
                handleInputChange('forma', selectedForma);
                if (selectedForma !== 'Cilindro') {
                    setDiametro('');
                    handleInputChange('diametro', '');
                } else {
                    setLargo('');
                    setAncho('');
                    handleInputChange('largo', '');
                    handleInputChange('ancho', '');
                }
              }}
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SetupCarga;