import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/AdminPanelStyles';

const PlanIzajeSection = ({ planesIzaje, handlePlanPress, selectedPlan }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Planes de Izaje</Text> 
      {planesIzaje.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <TouchableOpacity onPress={() => handlePlanPress(plan.id)}>
            <Text style={styles.planTitle}>Plan ID: {plan.id}</Text> 
            {/* Nuevo campo Responsable */}
            <Text style={styles.planResponsable}>Responsable: {plan.responsable}</Text> 
          </TouchableOpacity>
          {selectedPlan === plan.id && (
            <View style={styles.planExpandedDetails}> 
              {/* Datos de grúa */}
              <Text style={styles.expandedTitle}>Datos de grúa:</Text>
              <Text style={styles.boldText}>Largo de Pluma: {plan.datosGenerales.largoPluma} m</Text>
              <Text style={styles.boldText}>Contrapeso: {plan.datosGenerales.contrapeso} toneladas</Text>

              {/* Aparejos */}
              <Text style={styles.expandedTitle}>Aparejos:</Text>
              {plan.aparejos.map((aparejo, index) => (
                <View key={index} style={styles.aparejoItem}>
                  <Text style={styles.boldText}>Descripción: {aparejo.descripcion}</Text>
                  <Text style={styles.boldText}>Cantidad: {aparejo.cantidad}</Text>
                  <Text style={styles.boldText}>Peso Unitario: {aparejo.pesoUnitario} kg</Text>
                  <Text style={styles.boldText}>Peso Total: {aparejo.pesoTotal} kg</Text>
                </View>
              ))}

              {/* Cargas */}
              <Text style={styles.expandedTitle}>Cargas:</Text>
              <Text style={styles.boldText}>Peso Equipo: {plan.cargas.pesoEquipo} kg</Text>
              <Text style={styles.boldText}>Peso Unitario: {plan.cargas.pesoUnitario} kg</Text>
              <Text style={styles.boldText}>Peso Total: {plan.cargas.pesoTotal} kg</Text>
              <Text style={styles.boldText}>Radio Trabajo Máx: {plan.cargas.radioTrabajoMax} m</Text>
              <Text style={styles.boldText}>Capacidad de Levante: {plan.cargas.capacidadLevante} toneladas</Text>
              <Text style={styles.boldText}>% Utilización: {plan.cargas.porcentajeUtilizacion}%</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default PlanIzajeSection;
