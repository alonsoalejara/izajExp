import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import Components from '../components/Components.index';
import BS from '../components/bottomSheets/BS.index'; // Importar BottomSheets

const EditGrua = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Recibe el ID de la grúa y los datos de la grúa, además del callback
  const { gruaId, datos, onSaveGruaAndDatos } = route.params;

  // Estado para almacenar el objeto completo de la grúa seleccionada
  const [gruaData, setGruaData] = useState(null);
  // Estado para los datos editables de la grúa (largoPluma, contrapeso, gradoInclinacion)
  const [editableDatos, setEditableDatos] = useState(datos || {
    largoPluma: '', // Cambiado a string para el ConfigButton
    contrapeso: 0,
    gradoInclinacion: '',
    radioIzaje: 0,
    radioMontaje: 0,
  });
  const [errorGrua, setErrorGrua] = useState('');
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isLargoPlumaModalVisible, setLargoPlumaModalVisible] = useState(false); // Nuevo estado para el modal de Largo de Pluma

  // Efecto para cargar los detalles completos de la grúa cuando se monta el componente
  // o cuando gruaId cambia (si se pasa un ID inicial)
  useEffect(() => {
    async function fetchGruaDetails() {
      if (gruaId) {
        try {
          const token = await AsyncStorage.getItem('accessToken');
          const response = await fetch(getApiUrl(`grua/${gruaId}`), {
            headers: { Authorization: `Bearer ${token}` },
          });
          const json = await response.json();
          if (json?.data) {
            setGruaData(json.data);
            // Actualizar los campos de texto con los valores de la grúa seleccionada
            setEditableDatos(prev => ({
              ...prev,
              largoPluma: datos?.largoPluma || json.data.largoPluma || '', // Cargar largoPluma
              contrapeso: datos?.contrapeso || json.data.contrapeso || 0,
              gradoInclinacion: datos?.gradoInclinacion || json.data.gradoInclinacion || '',
              radioIzaje: datos?.radioIzaje || json.data.radioIzaje || 0,
              radioMontaje: datos?.radioMontaje || json.data.radioMontaje || 0,
            }));
          }
        } catch (error) {
          console.error("Error fetching grua details:", error);
          Alert.alert("Error", "No se pudo cargar los detalles de la grúa.");
        }
      }
    }
    fetchGruaDetails();
  }, [gruaId]); // Se ejecuta cuando gruaId cambia

  const handleChange = (value, field) => {
    setEditableDatos(prevDatos => ({
      ...prevDatos,
      [field]: value
    }));
  };

  const openModal = setter => setter(true);

  const handleSaveChanges = () => {
    // Validaciones
    if (!gruaData) {
      Alert.alert("Error de Validación", "Debe seleccionar una grúa.");
      return;
    }
    if (!editableDatos.largoPluma) {
      Alert.alert("Error de Validación", "Debe seleccionar el largo de pluma.");
      return;
    }

    // Llama al callback pasado desde EditPlan.js con el ID de la grúa seleccionada
    // y los datos editables de la grúa. El contrapeso y gradoInclinacion se toman de gruaData.
    if (onSaveGruaAndDatos) {
      onSaveGruaAndDatos(gruaData._id, {
        ...editableDatos,
        contrapeso: gruaData.contrapeso || 0, // Asegurar que el contrapeso sea el de la grúa seleccionada
        gradoInclinacion: editableDatos.gradoInclinacion || '', // Asegurar que el gradoInclinacion sea el editable
      });
    }
    navigation.goBack();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  // El botón de guardar solo se habilita si se ha seleccionado una grúa y el largo de pluma
  const isSaveDisabled = !gruaData || !editableDatos.largoPluma;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon name="keyboard-arrow-left" size={44} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Editar Grúa</Text>
        </View>

        <ScrollView style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Configurar grúa</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Seleccione grúa:</Text>
          </View>
          {errorGrua ? <Text style={styles.errorText}>{errorGrua}</Text> : null}
          <Components.ConfigButton
            label="Configurar Grúa"
            value={gruaData?.nombre || ''} // Muestra el nombre de la grúa seleccionada
            placeholder="Seleccionar grúa"
            onPress={() => openModal(setGruaModalVisible)}
            style={errorGrua ? { borderColor: 'red', borderWidth: 3, borderRadius: 10 } : {}}
          />
          <BS.BSGrua
            isVisible={isGruaModalVisible}
            onClose={() => setGruaModalVisible(false)}
            onSelect={selected => {
              setGruaData(selected);
              setErrorGrua('');
              // Actualizar los campos de texto con los valores de la nueva grúa seleccionada
              setEditableDatos(prev => ({
                ...prev,
                // Si la grúa es Terex RT555, el largo de pluma por defecto es '10.5 m'
                // de lo contrario, se puede dejar vacío o un valor predeterminado si es necesario.
                largoPluma: selected.nombre === "Terex RT555" ? '10.5 m' : (selected.largoPluma || ''),
                contrapeso: selected.contrapeso || 0, // Contrapeso de la grúa seleccionada
                gradoInclinacion: selected.gradoInclinacion || '',
                radioIzaje: selected.radioIzaje || 0,
                radioMontaje: selected.radioMontaje || 0,
              }));
            }}
          />

          {/* Nuevo ConfigButton para Largo de Pluma */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Largo de Pluma (m):</Text>
          </View>
          <Components.ConfigButton
            label="Largo de Pluma"
            value={editableDatos.largoPluma}
            placeholder="Seleccionar largo de pluma"
            onPress={() => openModal(setLargoPlumaModalVisible)}
            disabled={!gruaData} // Deshabilitar si no hay grúa seleccionada
            style={!gruaData ? { backgroundColor: '#e0e0e0', borderColor: '#ccc' } : {}}
          />
          <BS.BSLargoPluma
            isVisible={isLargoPlumaModalVisible}
            onClose={() => setLargoPlumaModalVisible(false)}
            onSelect={selectedLargoPluma => {
              handleChange(selectedLargoPluma, 'largoPluma');
            }}
          />


          {/* Contenedor para Radio de Izaje y Montaje en la misma línea */}
          <View style={styles.radiosContainer}>
            <View style={styles.radioInputWrapper}>
              <Text style={styles.label}>Radio de Izaje:</Text>
              <Components.NumericInput
                value={String(editableDatos.radioIzaje || '')}
                onChangeText={(text) => handleChange(parseFloat(text) || 0, 'radioIzaje')}
                placeholder="Izaje (m)"
                showControls={false}
                style={styles.input}
              />
            </View>

            <View style={styles.radioInputWrapper}>
              <Text style={styles.label}>Radio de Montaje:</Text>
              <Components.NumericInput
                value={String(editableDatos.radioMontaje || '')}
                onChangeText={(text) => handleChange(parseFloat(text) || 0, 'radioMontaje')}
                placeholder="Montaje (m)"
                showControls={false}
                style={styles.input}
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Datos de la Grúa</Text>
          {/* Se elimina el campo de Contrapeso del frontend */}
          {/* <Text style={styles.label}>Contrapeso (ton):</Text>
          <Text style={styles.readOnlyText}>
            {gruaData?.contrapeso !== undefined ? String(gruaData.contrapeso) : 'N/A'}
          </Text> */}

          {/* Se vuelve a agregar el TextInput para Grado de Inclinación */}
          <Text style={styles.label}>Grado de Inclinación:</Text>
          <TextInput
            style={styles.input}
            value={editableDatos.gradoInclinacion}
            onChangeText={(text) => handleChange(text, 'gradoInclinacion')}
            placeholder="Grado de Inclinación"
          />

          <View style={{ height: 100 }} />
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <Components.Button
            label="Volver"
            onPress={handleGoBack}
            isCancel={true}
            style={[styles.bottomButton, { backgroundColor: 'transparent', right: 50 }]}
          />
          <Components.Button
            label="Guardar"
            onPress={handleSaveChanges}
            disabled={isSaveDisabled}
            style={[
              styles.bottomButton, { right: 120 },
              isSaveDisabled ? { backgroundColor: '#cccccc' } : {},
            ]}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 32,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  readOnlyText: {
    fontSize: 16,
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#990000',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  inputWrapper: {
    marginTop: 15,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 8,
  },
  radiosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 5,
  },
  radioInputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomButton: {
    width: '48%',
  },
});

export default EditGrua;
