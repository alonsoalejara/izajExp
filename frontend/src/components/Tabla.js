import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/TablasStyles';

const Tabla = ({ titulo, data }) => {
  return (
    <View style={styles.tableSection}>
      <Text style={styles.sectionTitle}>{titulo}</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Ítem</Text>
        <Text style={[styles.headerText, { flex: 2, textAlign: 'left' }]}>Descripción</Text>
        <Text style={[
          styles.headerText,
          { flex: 1, right: 10, textAlign: titulo === "Aparejos" ? "center" : "right" }
        ]}>
          Cantidad
        </Text>

        {/* Agregar columnas de peso SOLO para la tabla de Aparejos */}
        {titulo === "Aparejos" && (
          <>
            <Text style={[styles.headerText, { flex: 1, textAlign: 'right', right: 10 }]}>Peso unit.</Text>
            <Text style={[styles.headerText, { flex: 1, textAlign: 'right', right: 10 }]}>Peso total</Text>
          </>
        )}
      </View>

      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, { flex: 1, textAlign: 'left', left: 10 }]}>{index + 1}</Text>
          <Text style={[styles.cell, { flex: 2, textAlign: 'left' }]}>{item.descripcion}</Text>
          
          <Text style={[
            styles.cell,
            { flex: 1, right: 10, textAlign: titulo === "Aparejos" ? "center" : "right" }
          ]}>
            {typeof item.cantidad === 'object' ? `${item.cantidad.valor} ${item.cantidad.unidad}` : item.cantidad}
          </Text>

          {/* Mostrar Peso Unitario y Peso Total SOLO en Aparejos */}
          {titulo === "Aparejos" && (
            <>
                <Text style={[styles.cell, { flex: 1, textAlign: 'right', right: 10 }]}>
                {item.pesoUnitario || 'N/A'}
                </Text>
                <Text style={[styles.cell, { flex: 1, textAlign: 'right', right: 10 }]}>
                {`${item.pesoTotal} kg`}
                </Text>
            </>
            )}
        </View>
      ))}
    </View>
  );
};

export default Tabla;
