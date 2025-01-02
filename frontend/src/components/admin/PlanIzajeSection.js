import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/AdminPanelStyles';

const PlanIzajeSection = ({ planesIzaje, handlePlanPress, selectedPlan }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Planes de Izaje</Text> 
      {planesIzaje.map((plan) => (
        <View key={plan.id} style={styles.card}>
          <TouchableOpacity onPress={() => handlePlanPress(plan.id)}>
            <Text style={styles.cardTitle}>Plan ID: {plan.id}</Text> 
            <Text style={styles.cardDetail}>
              <Text style={styles.labelText}>Responsable: </Text>{plan.responsable}
            </Text>
          </TouchableOpacity>
          {selectedPlan === plan.id && (
            <View style={styles.cardExpandedDetails}> 
              <Text style={styles.cardSubtitle}>Datos de grúa:</Text>
              <Text style={styles.cardDetail}>
                <Text style={styles.labelText}>Largo de Pluma: </Text>{plan.datosGenerales.largoPluma} m
              </Text>
              <Text style={styles.cardDetail}>
                <Text style={styles.labelText}>Contrapeso: </Text>{plan.datosGenerales.contrapeso} toneladas
              </Text>

              <Text style={styles.cardSubtitle}>Aparejos:</Text>
              {plan.aparejos.map((aparejo, index) => (
                <View key={index} style={styles.cardItem}>
                  <Text style={styles.cardDetail}>
                    <Text style={styles.labelText}>Aparejo: </Text>{aparejo.descripcion}
                  </Text>
                  <Text style={styles.cardDetail}>
                    <Text style={styles.labelText}>Cantidad: </Text>{aparejo.cantidad}
                  </Text>
                  <Text style={styles.cardDetail}>
                    <Text style={styles.labelText}>Peso Unitario: </Text>{aparejo.pesoUnitario} kg
                  </Text>
                  <Text style={styles.cardDetail}>
                    <Text style={styles.labelText}>Peso Total: </Text>{aparejo.pesoTotal} kg
                  </Text>
                </View>
              ))}

              <Text style={styles.cardSubtitle}>Cargas:</Text>
              <Text style={styles.cardDetail}>
                <Text style={styles.labelText}>Peso Equipo: </Text>{plan.cargas.pesoEquipo} kg
              </Text>
              <Text style={styles.cardDetail}>
                <Text style={styles.labelText}>Peso Unitario: </Text>{plan.cargas.pesoUnitario} kg
              </Text>
              <Text style={styles.cardDetail}>
                <Text style={styles.labelText}>Peso Total: </Text>{plan.cargas.pesoTotal} kg
              </Text>
              <Text style={styles.cardDetail}>
                <Text style={styles.labelText}>Radio Trabajo Máx: </Text>{plan.cargas.radioTrabajoMax} m
              </Text>
              <Text style={styles.cardDetail}>
                <Text style={styles.labelText}>Capacidad de Levante: </Text>{plan.cargas.capacidadLevante} toneladas
              </Text>
              <Text style={styles.cardDetail}>
                <Text style={styles.labelText}>% Utilización: </Text>{plan.cargas.porcentajeUtilizacion}%
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default PlanIzajeSection;
