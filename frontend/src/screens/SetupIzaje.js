import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/SetupIzajeStyles';
import Modals from '../components/modals/Modal.index';
import getApiUrl from '../utils/apiUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { grilleteOptions } from '../data/grilleteData';

const SetupIzaje = () => {
  const navigation = useNavigation();

  const [isFormaModalVisible, setFormaModalVisible] = useState(false);
  const [isGruaModalVisible, setGruaModalVisible] = useState(false);
  const [isManiobraModalVisible, setManiobraModalVisible] = useState(false);
  const [isGrilleteModalVisible, setGrilleteModalVisible] = useState(false);

  const [grua, setGrua] = useState('');
  const [eslingaOEstrobo, setEslingaOEstrobo] = useState('');
  const [cantidadManiobra, setCantidadManiobra] = useState('');

  const [cantidadGrilletes, setCantidadGrilletes] = useState('');
  const [tipoGrillete, setTipoGrillete] = useState('');
  const [manipulaciones, setManipulaciones] = useState('');

  const openModal = (setModalVisible) => {
    setModalVisible(true);
  };

  const handleNavigateToSetupRadio = async () => {
    // Validación de los campos requeridos
    if (!grua || !cantidadGrilletes || !tipoGrillete || !eslingaOEstrobo || !cantidadManiobra) {
      setFormaModalVisible(true);
      return;
    }
  
    // Agregar los logs para verificar los datos antes de enviarlos
    console.log("Datos enviados a SetupRadio:");
    console.log("Grua:", grua);
    console.log("Eslinga o Estrobo:", eslingaOEstrobo);
    console.log("Cantidad de Maniobras:", cantidadManiobra);
    console.log("Cantidad de Grilletes:", cantidadGrilletes);
    console.log("Tipo de Grillete:", tipoGrillete);
  
    // Verificar si el aparejo ya existe
    const idAparejoExistente = await verificarAparejoExistente(grua, eslingaOEstrobo, cantidadManiobra, tipoGrillete, cantidadGrilletes);
  
    if (idAparejoExistente) {
      // Si el aparejo ya existe, navegar a SetupRadio con la ID del aparejo existente
      console.log("Aparejo ya existe con ID:", idAparejoExistente);
      navigation.navigate('SetupRadio', {
        idAparejo: idAparejoExistente,
      });
    } else {
      // Si no existe, enviar las solicitudes POST
      // Primero enviar Eslinga o Estrobo
      await enviarEslingaOEstrobo();
      // Luego enviar Grillete
      await enviarGrillete();
  
      // Después de enviar las solicitudes, navegar a SetupRadio con los datos necesarios
      navigation.navigate('SetupRadio', {
        grua: grua,
        eslingaOEstrobo: eslingaOEstrobo,
        cantidadManiobra: cantidadManiobra,
        tipoGrillete: tipoGrillete,
        cantidadGrilletes: cantidadGrilletes,
      });
    }
  };  
  
  // Función para verificar si el aparejo ya existe
  const verificarAparejoExistente = async (tipo, descripcion, cantidad) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('No se encontró el token de acceso');
        return null;
      }
  
      const apiUrl = getApiUrl('aparejos/');
  
      // Construir el query dependiendo del tipo (eslinga o grillete)
      const query = tipo === 'eslinga' ? `eslingaOEstrobo=${descripcion}&cantidadManiobra=${cantidad}` : `tipoGrillete=${descripcion}&cantidadGrilletes=${cantidad}`;
  
      // Realizar la búsqueda del aparejo
      const response = await fetch(`${apiUrl}?${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          return data[0].id; // Devolver el ID si el aparejo existe
        } else {
          return null; // No se encontró el aparejo
        }
      } else {
        const errorResponse = await response.json();
        console.error("Error al verificar el aparejo:", errorResponse);
        return null;
      }
    } catch (error) {
      console.error("Error de red al verificar el aparejo:", error);
      return null;
    }
  };

  // Función para enviar la primera solicitud POST (Eslinga o Estrobo)
  const enviarEslingaOEstrobo = async () => {
    const pesoUnitario = 26.8; // Peso unitario fijo para eslinga o estrobo
    const pesoTotal = pesoUnitario * parseInt(cantidadManiobra); // Cálculo del peso total

    const body = {
      descripcion: eslingaOEstrobo,
      cantidad: cantidadManiobra,
      pesoUnitario: pesoUnitario,
      pesoTotal: pesoTotal,
    };

    console.log('Enviando Eslinga o Estrobo con los siguientes datos:');
    console.log(body);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Access Token:', accessToken);

      if (!accessToken) {
        console.error('No se encontró el token de acceso');
        return;
      }

      const apiUrl = getApiUrl('aparejos/');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Eslinga o Estrobo enviado correctamente.");
      } else {
        const errorResponse = await response.json();
        console.error("Error al enviar Eslinga o Estrobo:", errorResponse);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  // Función para enviar la segunda solicitud POST (Grillete)
  const enviarGrillete = async () => {
    const selectedGrillete = grilleteOptions.find(option => option.pulgada === tipoGrillete);
    const pesoUnitario = selectedGrillete ? selectedGrillete.peso : 0;
    const pesoTotal = pesoUnitario * parseInt(cantidadGrilletes); // Cálculo del peso total

    const body = {
      descripcion: `Grillete ${tipoGrillete}`,
      cantidad: cantidadGrilletes,
      pesoUnitario: pesoUnitario,
      pesoTotal: pesoTotal,
    };

    console.log('Enviando Grillete con los siguientes datos:');
    console.log(body);

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('Access Token:', accessToken);

      if (!accessToken) {
        console.error('No se encontró el token de acceso');
        return;
      }

      const apiUrl = getApiUrl('aparejos/');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("Grillete enviado correctamente.");
      } else {
        const errorResponse = await response.json();
        console.error("Error al enviar Grillete:", errorResponse);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Contenido principal */}
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CÁLCULO MANIOBRAS MENORES</Text>
        </View>

        {/* Configurar Grúa */}
        <TouchableOpacity onPress={() => openModal(setGruaModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Grúa</Text>
        </TouchableOpacity>

        {/* Mostrar la grúa seleccionada */}
        <Text style={[styles.cardDetail, { marginBottom: 30 }]}>
          <Text style={styles.labelText}>Grúa seleccionada: {'\n'}</Text>{grua}
        </Text>
        <Modals.ModalGrua
          isVisible={isGruaModalVisible}
          onClose={() => setGruaModalVisible(false)}
          onSelect={(selectedGrua) => setGrua(selectedGrua.nombre)}
        />

        {/* Configurar Grillete */}
        <TouchableOpacity onPress={() => openModal(setGrilleteModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Grillete</Text>
        </TouchableOpacity>
        <Text style={[styles.cardDetail, { marginBottom: 10 }]}>
          <Text style={styles.labelText}>Cantidad de grilletes: {'\n'}</Text>{cantidadGrilletes}{'\n'}
        </Text>
        <Text style={styles.cardDetail}>
          <Text style={styles.labelText}>Tipo de grillete: {'\n'}</Text>
          {tipoGrillete ? `Grillete ${tipoGrillete}"` : ''}
        </Text>

        {/* Modal para seleccionar grillete */}
        <Modals.ModalGrillete
          isVisible={isGrilleteModalVisible}
          onClose={() => setGrilleteModalVisible(false)}
          onSelectCantidad={(cantidad) => {
            setCantidadGrilletes(cantidad);
            console.log("Cantidad de grilletes seleccionada:", cantidad);
          }}
          onSelectTipo={(tipoObj) => {
            setTipoGrillete(tipoObj.tipo);
          }}
        />

        {/* Configurar Maniobra */}
        <TouchableOpacity onPress={() => openModal(setManiobraModalVisible)} style={styles.button}>
          <Text style={styles.buttonText}>Configurar Maniobra</Text>
        </TouchableOpacity>
        <Text style={[styles.cardDetail, { marginBottom: 10 }]}>
          <Text style={styles.labelText}>Maniobra seleccionada: {'\n'}</Text>{eslingaOEstrobo}{'\n'}
        </Text>
        <Text style={styles.cardDetail}>
          <Text style={styles.labelText}>Cantidad: {'\n'}</Text>{cantidadManiobra}
        </Text>
        <Modals.ModalManiobra
          isVisible={isManiobraModalVisible}
          onClose={() => setManiobraModalVisible(false)}
          onSelect={({ tipo, cantidad }) => {
            setEslingaOEstrobo(tipo);
            setCantidadManiobra(cantidad);
            setManipulaciones(`${tipo} x ${cantidad}`);
          }}
        />
        
        {/* Botón para navegar a SetupRadio */}
        <TouchableOpacity style={[styles.button, { backgroundColor: '#0288D1' }]} onPress={handleNavigateToSetupRadio}>
          <Text style={styles.buttonText}>Confirmar Configuración</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SetupIzaje;
