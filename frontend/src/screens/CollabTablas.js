import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
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
    { descripcion: 'Nombre Proyecto', cantidad: setup.nombreProyecto || 'N/A' },
    { descripcion: 'Capataz', cantidad: getFullName(setup.capataz) },
    { descripcion: 'Supervisor', cantidad: getFullName(setup.supervisor) },
    { descripcion: 'Jefe Área', cantidad: getFullName(setup.jefeArea) },
  ];

  const datosTablaGrua = [
    { descripcion: 'Grúa', cantidad: setup.grua?.nombre || 'N/A' }, // Corrected: setup.grua?.nombre
    { descripcion: 'Largo de pluma', cantidad: setup.datos?.largoPluma || 'N/A' },
    { descripcion: 'Grado de inclinación', cantidad: setup.datos?.anguloInclinacion || 'N/A' },
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
    { descripcion: 'Peso elemento', cantidad: { valor: setup.cargas?.pesoEquipo || 0, unidad: 'ton' } },
    { descripcion: 'Peso aparejos', cantidad: { valor: setup.cargas?.pesoAparejos || 0, unidad: 'ton' } },
    { descripcion: 'Peso gancho', cantidad: { valor: setup.cargas?.pesoGancho || 0, unidad: 'ton' } },
    { descripcion: 'Peso cable', cantidad: { valor: setup.cargas?.pesoCable || 0, unidad: 'ton' } },
    { descripcion: 'Peso total', cantidad: { valor: setup.cargas?.pesoTotal || 0, unidad: 'ton' } },
    { descripcion: 'Radio de trabajo máximo', cantidad: { valor: setup.cargas?.radioTrabajoMax || 0, unidad: 'm' } },
    { descripcion: 'Ángulo de trabajo', cantidad: setup.cargas?.anguloTrabajo || '0°' },
    { descripcion: 'Capacidad de levante', cantidad: { valor: setup.cargas?.capacidadLevante || 0, unidad: 'ton' } },
    { descripcion: '% Utilización', cantidad: { valor: setup.cargas?.porcentajeUtilizacion || 0, unidad: '%' } },
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
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={{ 
          right: 320, 
          top: 50, 
          position: 'absolute', 
          zIndex: 1 
        }}>
        <Icon name="keyboard-arrow-left" size={40} color="#000" />
      </TouchableOpacity>

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
                <Text style={[TablasStyles.headerText, { flex: 1, textAlign: 'left', left: 10, color: '#dd0000' }]}>Largo</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, textAlign: 'left', left: 18, color: '#dd0000' }]}>Peso</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, textAlign: 'left', left: 20, color: '#dd0000' }]}>Tensión</Text>
                <Text style={[TablasStyles.headerText, { flex: 1, textAlign: 'left', left: 28, color: '#dd0000' }]}>Grillete</Text>
                <Text style={[TablasStyles.headerText, { flex: 2, textAlign: 'right', right: 5, color: '#dd0000' }]}>Peso Grillete</Text>
              </View>
              <View style={[TablasStyles.row, { borderBottomWidth: 0 }]}>
                {aparejo.detalles.map((detail, detailIndex) => (
                  <Text key={`detail-${index}-${detailIndex}`} style={[TablasStyles.cell, { flex: 1, top: -10, right: -7 }]}>
                    {String(detail.valor)}
                  </Text>
                ))}
              </View>
            </View>
            <View style={{ marginTop: -10 }} />
          </View>
        ))}
        <Components.Tabla titulo="Datos de la maniobra" data={datosTablaManiobra} />
        <Components.Tabla titulo="Cálculo de centro de gravedad:" data={datosTablaXYZ} />
      </ScrollView>

      <Components.Button label="Enviar PDF" style={[TablasStyles.button, { width: '90%', top: -120, left: -35 }]}></Components.Button>
    </View>
  );
};

export default CollabTablas;