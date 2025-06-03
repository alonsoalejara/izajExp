import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';
import TablasStyles from '../styles/TablasStyles';

const CollabTablas = ({ route }) => {
  const { setup } = route.params;
  const navigation = useNavigation();

  const getFullName = (person) => {
    if (!person) return 'N/A';
    const tieneNombre = person.nombre && person.nombre.trim() !== '';
    const tieneApellido = person.apellido && person.apellido.trim() !== '';

    if (tieneNombre && tieneApellido) {
      return `${person.nombre} ${person.apellido}`;
    }
    if (person.username && person.username.trim() !== '') {
      return person.username;
    }
    return 'N/A';
  };

  const datosTablaProyecto = [
    { item: 1, descripcion: 'Nombre Proyecto', nombre: setup.nombreProyecto || 'N/A' },
    { item: 2, descripcion: 'Capataz', nombre: getFullName(setup.capataz) },
    { item: 3, descripcion: 'Supervisor', nombre: getFullName(setup.supervisor) },
    { item: 4, descripcion: 'Jefe Área', nombre: getFullName(setup.jefeArea) },
  ];

  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: setup.grua?.nombre || 'N/A' },
    { descripcion: 'Largo de pluma', cantidad: setup.datos?.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: setup.datos?.gradoInclinacion || 'N/A' },
    { descripcion: 'Contrapeso', cantidad: `${setup.datos?.contrapeso || 0} ton` },
  ];

  const datosTablaAparejosIndividuales = setup.aparejos?.map((aparejo, index) => ({
    descripcionPrincipal: {
      item: index + 1,
      descripcion: aparejo.descripcion,
    },
    detalles: [
      { label: 'Largo', valor: `${aparejo.largo || 'N/A'} m` },
      { label: 'Peso', valor: `${aparejo.pesoUnitario || 'N/A'} ton` },
      { label: 'Tensión', valor: aparejo.tension || 'N/A' },
      { label: 'Grillete', valor: aparejo.grillete || 'N/A' },
      { label: 'Peso Grillete', valor: `${aparejo.pesoGrillete || 'N/A'} ton` },
    ],
  })) || [];

  const datosTablaManiobra = [
    { descripcion: 'Peso elemento', cantidad: `${setup.cargas?.pesoEquipo || 0} ton` },
    { descripcion: 'Peso aparejos', cantidad: `${setup.cargas?.pesoAparejos || 0} ton` },
    { descripcion: 'Peso gancho', cantidad: `${setup.cargas?.pesoGancho || 0} ton` },
    { descripcion: 'Peso cable', cantidad: `${setup.cargas?.pesoCable || 0} ton` },
    { descripcion: 'Peso total', cantidad: `${setup.cargas?.pesoTotal || 0} ton` },
    { descripcion: 'Radio de trabajo máximo', cantidad: `${setup.cargas?.radioTrabajoMax || 0} m` },
    { descripcion: 'Ángulo de trabajo', cantidad: `${setup.cargas?.anguloTrabajo || 0}` },
    { descripcion: 'Capacidad de levante', cantidad: `${setup.cargas?.capacidadLevante || 0} ton` },
    { descripcion: '% Utilización', cantidad: `${setup.cargas?.porcentajeUtilizacion || 0} %` },
  ];

  const datosTablaXYZ = [
    {
      item: 1,
      descripcion: 'Medidas',
      X: `${setup.centroGravedad?.xAncho || 'N/A'} m`,
      Y: `${setup.centroGravedad?.yLargo || 'N/A'} m`,
      Z: `${setup.centroGravedad?.zAlto || 'N/A'} m`,
    },
    {
      item: 2,
      descripcion: 'CG',
      X: `${setup.centroGravedad?.xCG || 'N/A'} m`,
      Y: `${setup.centroGravedad?.yCG || 'N/A'} m`,
      Z: `${setup.centroGravedad?.zCG || 'N/A'} m`,
    },
    {
      item: 3,
      descripcion: 'Posic. Relativa',
      X: `${setup.centroGravedad?.xPR || 'N/A'} %`,
      Y: `${setup.centroGravedad?.yPR || 'N/A'} %`,
      Z: `${setup.centroGravedad?.zPR || 'N/A'} %`,
    },
  ];

  return (
    <View style={[TablasStyles.container, { backgroundColor: '#fff' }]}>
      <Pressable 
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 50, left: 20, zIndex: 10 }}
      >
        <Icon name="keyboard-arrow-left" size={40} color="#000" />
      </Pressable>

      <View style={[TablasStyles.titleContainer, { top: 50 }]}>
        <Text style={TablasStyles.title}>Detalles del Plan de Izaje</Text>
      </View>

      <ScrollView style={[TablasStyles.tableContainer, { top: -40, paddingHorizontal: 5 }]}>
        <Components.Tabla titulo="Información del proyecto" data={datosTablaProyecto} />
        <Components.Tabla titulo="Información de la grúa" data={datosTablaGrua} />

        <Text style={[TablasStyles.sectionTitle, { left: 20 }]}>Aparejos</Text>
        {datosTablaAparejosIndividuales.map((aparejo, index) => (
          <View key={`aparejo-${index}`} style={TablasStyles.tableSection}>
            <View style={TablasStyles.tableHeader}>
              <Text style={[TablasStyles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Ítem</Text>
              <Text style={[TablasStyles.headerText, { flex: 2, textAlign: 'left' }]}>Descripción</Text>
            </View>
            <View style={[TablasStyles.row, { borderBottomWidth: 0 }]}>
              <Text style={[TablasStyles.cell, { flex: 1, textAlign: 'left', left: 10 }]}>{String(aparejo.descripcionPrincipal.item)}</Text>
              <Text style={[TablasStyles.cell, { flex: 2, textAlign: 'left' }]}>{String(aparejo.descripcionPrincipal.descripcion)}</Text>
            </View>

            <View style={[TablasStyles.tableSection, { marginTop: 10, marginHorizontal: 0 }]}>
              <View style={[TablasStyles.tableHeader, { backgroundColor: '#ffeeee' }]}>
                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 10 }]}>Largo</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 15 }]}>Peso</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 20 }]}>Tensión</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, color: '#dd0000', textAlign: 'left', left: 30 }]}>Grillete</Text>
                <Text style={[TablasStyles.headerText, { flex: 2, color: '#dd0000', textAlign: 'right', right: 10 }]}>Peso Grillete</Text>
              </View>
              <View style={[TablasStyles.row, { borderBottomWidth: 0 }]}>
                {aparejo.detalles.map((detail, detailIndex) => (
                  <Text key={`detail-${index}-${detailIndex}`} style={[TablasStyles.cell, { flex: 1, right: 5 }]}>
                    {String(detail.valor)}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        ))}

        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />
      </ScrollView>

      <Components.Button label="Enviar PDF" style={[TablasStyles.button, { width: '90%', top: -120, left: -35 }]} />
    </View>
  );
};

export default CollabTablas;
