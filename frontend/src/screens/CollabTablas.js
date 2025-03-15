import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Components from '../components/Components.index';

const CollabTablas = ({ route }) => {
  const { setup } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botón para regresar */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="keyboard-arrow-left" size={40} color="#000" style={{ right: -10, top: 50 }} />
      </TouchableOpacity>

      <Text style={[styles.title, { top: 18, left: 80 }]}>Detalles del Plan de Izaje</Text>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Información general del plan en tabla */}
        <Components.Tabla
          titulo="Información General"
          data={[
            { descripcion: 'Supervisor', cantidad: `${setup.usuario?.nombre} ${setup.usuario?.apellido}` },
            { descripcion: 'Especialidad', cantidad: setup.usuario?.specialty || 'No disponible' },
            { descripcion: 'Fecha de Creación', cantidad: setup.createdAt }
          ]}
        />

        {/* Datos del plan de izaje */}
        <Components.Tabla
          titulo="Datos del Plan de Izaje"
          data={[
            { descripcion: 'Largo de Pluma (m)', cantidad: setup.datos?.largoPluma },
            { descripcion: 'Contrapeso (toneladas)', cantidad: setup.datos?.contrapeso }
          ]}
        />

        {/* Cargas */}
        <Components.Tabla
          titulo="Cargas"
          data={[
            { descripcion: 'Peso del Equipo (kg)', cantidad: setup.cargas?.pesoEquipo },
            { descripcion: 'Peso de Aparejos (kg)', cantidad: setup.cargas?.pesoAparejos },
            { descripcion: 'Peso del Gancho (kg)', cantidad: setup.cargas?.pesoGancho },
            { descripcion: 'Peso Total (kg)', cantidad: setup.cargas?.pesoTotal },
            { descripcion: 'Radio de Trabajo Máximo (m)', cantidad: setup.cargas?.radioTrabajoMax },
            { descripcion: 'Capacidad de Levante (kg)', cantidad: setup.cargas?.capacidadLevante },
            { descripcion: 'Porcentaje de Utilización', cantidad: `${setup.cargas?.porcentajeUtilizacion}%` }
          ]}
        />

        {/* Aparejos */}
        <Components.Tabla
          titulo="Aparejos"
          data={setup.aparejos?.map((aparejo, index) => ({
            descripcion: aparejo.descripcion,
            cantidad: aparejo.cantidad,
            pesoUnitario: aparejo.pesoUnitario,
            pesoTotal: aparejo.pesoTotal
          })) || []}
        />

        {/* Botones */}
        <Components.Button label="Enviar PDF" style={[styles.button, { width: '90%', marginTop: 20, marginBottom: 20, left: -37 }]}></Components.Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 0,
    marginTop: 30,
    marginBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  }
});

export default CollabTablas;