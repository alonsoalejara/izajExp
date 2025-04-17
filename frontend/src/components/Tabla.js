import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TablasStyles';

const Tabla = ({ titulo, data, editable, onChangeMedida }) => {
  if (editable) {
    return (
      <View style={[styles.tableSection, { width: '100%', left: -20 }]}>
        <Text style={styles.sectionTitle}>{titulo}</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Item</Text>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'left' }]}>Largo maniobra (m)</Text>
        </View>
        {data.map((item, index) => (
          <View key={item.key} style={styles.row}>
            <Text style={[styles.cell, { flex: 1, textAlign: 'left', left: 10, top: 15, fontSize: '16', fontWeight: '500' }]}>{item.item}</Text>
            <View style={[styles.cell, { flex: 1 }]}>
              <TextInput
                style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ccc', padding: 15 }}
                placeholder="Medida (metros)"
                value={item.medida}
                onChangeText={(value) => {
                  // Use a regular expression to allow only numbers
                  const numericValue = value.replace(/[^0-9.]/g, '');
                  onChangeMedida(index, numericValue);
                }}
                keyboardType="numeric" // Suggest the numeric keyboard
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  // Diseño por defecto (sin edición)
  return (
    <View style={styles.tableSection}>
      <Text style={styles.sectionTitle}>{titulo}</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Ítem</Text>
        <Text style={[styles.headerText, { flex: 2, textAlign: 'left' }]}>Descripción</Text>
        <Text style={[styles.headerText, { flex: 1, right: 10, textAlign: titulo === "Aparejos" ? "center" : "right" }]}>
          Cantidad
        </Text>
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
          <Text style={[styles.cell, { flex: 1, right: 10, textAlign: titulo === "Aparejos" ? "center" : "right" }]}>
            {typeof item.cantidad === 'object' ? `${item.cantidad.valor} ${item.cantidad.unidad}` : item.cantidad}
          </Text>
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