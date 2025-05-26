import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { generarPDF } from '../utils/PDF/PDFGenerator';
import styles from '../styles/TablasStyles.js';
import Components from '../components/Components.index.js';
import { obtenerDatosTablas } from '../data/tablasData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApiUrl from '../utils/apiUrl';
import { calculateGeometry } from '../utils/calculateGeometry';

const Tablas = ({ route, navigation }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [supervisorNombre, setSupervisorNombre] = useState('');
  const [jefeAreaNombre, setJefeAreaNombre] = useState('');
  const [capatazNombre, setCapatazNombre] = useState('N/A');

  const { planData, setupCargaData, setupGruaData, setupAparejosData, setupRadioData } = route.params || {};

  console.log('Datos recibidos de SetupPlan.js:', {
    ...planData,
    supervisorId: planData?.supervisor?._id,
    jefeAreaId: planData?.jefeArea?._id,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (planData) {
        setNombreProyecto(planData.nombreProyecto || '');
        setSupervisorNombre(planData.supervisor?.nombreCompleto || '');
        setJefeAreaNombre(planData.jefeArea?.nombreCompleto || '');

        const userId = await AsyncStorage.getItem('usuarioId');

        if (userId) {
          try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!accessToken) {
              return;
            }

            const response = await fetch(getApiUrl(`user/${userId}`), {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
            });

            if (response.ok) {
              const userData = await response.json();
              if (userData && userData.nombre && userData.apellido) {
                setCapatazNombre(`${userData.nombre} ${userData.apellido}`);
              } else {
                setCapatazNombre('N/A');
              }
            } else {
              setCapatazNombre('N/A');
            }
          } catch (error) {
            setCapatazNombre('N/A');
          }
        }
      }
    };

    fetchUserData();
  }, [planData]);

  const combinedData = {
    ...setupCargaData,
    ...setupGruaData,
    ...setupRadioData,
    ...setupAparejosData,
    ...planData,
    pesoEquipo: setupGruaData?.pesoEquipo,
    pesoGancho: setupGruaData?.pesoGancho,
  };

  const geometry = calculateGeometry(
    combinedData.forma,
    combinedData.alto,
    combinedData.forma === 'Cilindro'
      ? combinedData.diametro
      : combinedData.largo,
    combinedData.ancho
  );

  const relX = geometry && combinedData.ancho
    ? ((geometry.cg.cgX / combinedData.ancho) * 100).toFixed(0)
    : null;
  const relY = geometry && combinedData.largo
    ? ((geometry.cg.cgY / combinedData.largo) * 100).toFixed(0)
    : null;
  const relZ = geometry && combinedData.alto
    ? ((geometry.cg.cgZ / combinedData.alto) * 100).toFixed(0)
    : null;

  const { datosTablaManiobra, datosTablaGrua, datosTablaPesoAparejos, datosTablaProyecto } = obtenerDatosTablas({
    ...combinedData,
    nombreCapataz: capatazNombre,
    supervisorId: planData?.supervisor?._id,
    jefeAreaId: planData?.jefeArea?._id,
  });

  const datosTablaXYZ = [
    {
      item: 1,
      descripcion: 'Medidas',
      X: `${combinedData.ancho} m`,
      Y: `${combinedData.largo} m`,
      Z: `${combinedData.alto} m`,
    },
    {
      item: 2,
      descripcion: 'CG',
      X: geometry ? `${geometry.cg.cgX.toFixed(1)} m` : 'N/A',
      Y: geometry ? `${geometry.cg.cgY.toFixed(1)} m` : 'N/A',
      Z: geometry ? `${geometry.cg.cgZ.toFixed(1)} m` : 'N/A',
    },
    {
      item: 3,
      descripcion: 'Posic. Relativa',
      X: relX !== null ? `${relX} %` : 'N/A',
      Y: relY !== null ? `${relY} %` : 'N/A',
      Z: relZ !== null ? `${relZ} %` : 'N/A',
    },
  ];

  const handlePDF = async () => {
    const rows = datosTablaPesoAparejos.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      cantidad: row.cantidad,
      pesoUnitario: parseFloat(row.pesoUnitario),
      pesoTotal: row.pesoTotal,
    }));

    const cargaRows = datosTablaManiobra.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      valor:
        typeof row.cantidad === 'object'
          ? `${row.cantidad.valor} ${row.cantidad.unidad}`
          : row.cantidad,
    }));

    const datosGruaRows = datosTablaGrua.map((row, index) => ({
      item: index + 1,
      descripcion: row.descripcion,
      valor: row.cantidad,
    }));

    const totalPesoAparejos = datosTablaPesoAparejos.reduce(
      (total, row) => total + parseFloat(row.pesoTotal.replace(' ton', '') || 0),
      0
    );

    const selectedGrua = combinedData.grua;

    await generarPDF(selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows, nombreProyecto);
  };

  const handleGuardar = async () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de guardar este plan de izaje?',
      [
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              const aparejos = datosTablaPesoAparejos.map(item => ({
                descripcion: item.descripcion,
                cantidad: item.cantidad,
                pesoUnitario: parseFloat(item.pesoUnitario),
                pesoTotal: parseFloat(item.pesoTotal.replace(' ton', '') || 0),
              }));

              const datos = {
                largoPluma:
                  parseFloat(combinedData.largoPluma) ||
                  parseFloat(datosTablaGrua.find(item => item.descripcion === 'Largo de pluma')?.cantidad) ||
                  0,
                contrapeso: parseFloat(combinedData.grua?.contrapeso) || 0,
              };

              const cargas = {
                pesoEquipo: datosTablaManiobra.find(item => item.descripcion === 'Peso elemento')?.cantidad.valor || 0,
                pesoAparejos: datosTablaManiobra.find(item => item.descripcion === 'Peso aparejos')?.cantidad.valor || 0,
                pesoGancho: datosTablaManiobra.find(item => item.descripcion === 'Peso gancho')?.cantidad.valor || 0,
                pesoCable: datosTablaManiobra.find(item => item.descripcion === 'Peso cable')?.cantidad?.valor || 'N/A',
                pesoTotal: datosTablaManiobra.find(item => item.descripcion === 'Peso total')?.cantidad.valor || 0,
                radioTrabajoMax: datosTablaManiobra.find(item => item.descripcion === 'Radio de trabajo máximo')?.cantidad.valor || 0,
                anguloTrabajo: datosTablaManiobra.find(item => item.descripcion === 'Ángulo de trabajo')?.cantidad || '0°',
                capacidadLevante: datosTablaManiobra.find(item => item.descripcion === 'Capacidad de levante')?.cantidad.valor || 0,
                porcentajeUtilizacion: datosTablaManiobra.find(item => item.descripcion === '% Utilización')?.cantidad.valor || 0,
              };

              const usuario =
                (combinedData.usuario && combinedData.usuario.toString()) ||
                (await AsyncStorage.getItem('usuarioId'));

              const finalData = {
                nombreProyecto,
                usuario,
                aparejos,
                datos,
                cargas,
                supervisor: planData?.supervisor?._id,
                jefeArea: planData?.jefeArea?._id,
                responsablesAdicionales: planData?.responsablesAdicionales?.map(resp => resp._id) || [],
                grua: setupGruaData?.grua?._id,
              };

              const accessToken = await AsyncStorage.getItem('accessToken');
              if (!accessToken) {
                alert('No autorizado. Por favor, inicie sesión nuevamente.');
                return;
              }

              const response = await fetch(getApiUrl('setupIzaje/'), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(finalData),
              });

              const data = await response.json();

              if (response.ok) {
                alert('Plan de izaje guardado exitosamente.');
                setIsSaved(true);
              } else {
                alert(`Error al guardar: ${data.message}`);
              }
            } catch (error) {
              console.error('Error al guardar el plan de izaje:', error);
              alert('Hubo un error al guardar el plan de izaje.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Components.Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tablas</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Datos:</Text>
      </View>
      <ScrollView style={styles.tableContainer}>
        <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />
        <Components.Tabla titulo="Aparejos" data={datosTablaPesoAparejos} />
        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Components.Button
          label="Volver"
          onPress={() => navigation.goBack()}
          isCancel={true}
          style={[styles.button, { backgroundColor: 'transparent' }]}
        />
        <Components.Button
          label={isSaved ? 'PDF' : 'Guardar'}
          onPress={isSaved ? handlePDF : handleGuardar}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default Tablas;