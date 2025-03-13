import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import styles from '../styles/SetupIzajeStyles';
import BS from '../components/bottomSheets/BS.index';
import RenderForma from '../utils/renderForma';
import { validateCarga } from '../utils/validateCarga';

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
    const newErrors = validateCarga(peso, largo, ancho, alto);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNavigateToSetupGrua = () => {
    if (largo === ancho && ancho === alto && largo !== '') {
      Alert.alert(
        "Dimensiones de un cubo detectadas",
        "Las dimensiones ingresadas corresponden a un cubo. ¿Desea cambiar la forma a 'Cuadrado'?",
        [
          {
            text: "No",
            onPress: () => {
              // Continúa con la navegación si el usuario no desea cambiar
              if (validateInputs()) {
                navigation.navigate('SetupGrua');
              }
            },
            style: "cancel"
          },
          {
            text: "Sí",
            onPress: () => {
              // Cambia la forma a "Cuadrado" y continua
              setForma("Cuadrado");
              handleInputChange('forma', "Cuadrado");
              if (validateInputs()) {
                navigation.navigate('SetupGrua');
              }
            }
          }
        ]
      );
    } else {
      // Continúa con la navegación si las dimensiones no son iguales
      if (validateInputs()) {
        navigation.navigate('SetupGrua');
      }
    }
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
            <Text style={[styles.labelText, { marginTop: 15, marginBottom: 10 }]}>Visualización de forma:</Text>
            <View style={styles.visualizationContainer}>
              <RenderForma
                forma={carga.forma}
                dimensiones={{
                  largo: carga.largo,
                  ancho: carga.ancho,
                  profundidad: carga.alto,
                }}
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.labelText}>Seleccione forma:</Text>
            </View>

            <Components.ConfigButton
              label="Configurar Forma"
              value={forma}
              onPress={() => setIsFormaVisible(true)}
            />

            <Text style={styles.labelText}>Ingrese el peso (kg) y el {largoLabel} (m) de la carga:</Text>
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
                    // Eliminar cualquier instancia de "k" sola o con espacios
                    let cleanedValue = peso.replace(/\s*k$/, '').replace('k', '');
                  
                    // Si el valor no contiene "kg", se agrega al final.
                    if (cleanedValue && !cleanedValue.includes('kg')) {
                      const valueWithUnit = cleanedValue + ' kg';
                      setPeso(valueWithUnit);
                      handleInputChange('peso', valueWithUnit);
                    }
                  }}
                
                  editable={!!forma}
                  style={[
                    { width: 150 },
                    errors.peso && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 },
                  ]}
                />
              </View>

              <View style={styles.inputField}>
                {errors.largo && <Text style={styles.errorText}>{errors.largo}</Text>}
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
                  editable={!!forma}
                  style={[
                    { width: 150 },
                    errors.largo && { borderColor: 'red', top: -8, borderWidth: 3, borderRadius: 13 },
                  ]}
                />
              </View>
            </View>

            {forma !== 'Círculo' && forma !== 'Cuadrado' && (
              <>
                <Text style={styles.labelText}>Ingrese el ancho (m) y profundidad (m):</Text>
                <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
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
                        if (ancho && !ancho.includes('m')) {
                          setAncho(ancho + ' m');
                          handleInputChange('ancho', ancho + ' m');
                        }
                      }}                  
                      editable={!!forma}
                      style={[
                        { width: 150 },
                        errors.ancho && { borderColor: 'red', top: -10, borderWidth: 3, borderRadius: 13 },
                      ]}
                    />
                  </View>

                  <View style={styles.inputField}>
                    {errors.alto && <Text style={styles.errorText}>{errors.alto}</Text>}
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
                      editable={!!forma}
                      style={[
                        { width: 150 },
                        errors.alto && { borderColor: 'red', top: -10, borderWidth: 3, borderRadius: 13 },
                      ]}
                    />
                  </View>
                </View>
              </>
            )}

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
