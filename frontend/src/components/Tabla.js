import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles/TablasStyles';

const Tabla = ({ titulo, data, editable, onChangeMedida }) => {
  const renderTableHeader = () => {
    if (titulo === "Información del proyecto") {
      return (
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { flex: 0.5, textAlign: 'left', left: 10 }]}>Ítem</Text>
          <Text style={[styles.headerText, { flex: 1.5, textAlign: 'left', left: 0 }]}>Descripción</Text>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'right', right: 10 }]}>Nombre</Text>
        </View>
      );
    } else if (titulo === "Cálculo de centro de gravedad:") {
      return (
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { flex: 0.5, textAlign: 'left', left: 10 }]}>Ítem</Text>
          <Text style={[styles.headerText, { flex: 1.5, textAlign: 'left', left: 10 }]}>Descripción</Text>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>X: Ancho</Text>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 15 }]}>Y: Largo</Text>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'left', right: -20 }]}>Z: Alto</Text>
        </View>
      );
    }
    else {
      return (
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, { flex: 1, textAlign: 'left', left: 10 }]}>Ítem</Text>
          <Text style={[styles.headerText, { flex: 2, textAlign: 'left', left: -30 }]}>Descripción</Text>
          <Text style={[styles.headerText, { flex: 1, right: 10, textAlign: "right" }]}>
            Cantidad
          </Text>
        </View>
      );
    }
  };

  const renderTableRow = (item, index) => {
    if (titulo === "Información del proyecto") {
      return (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, { flex: 0.5, textAlign: 'left', left: 10 }]}>{item.item}</Text>
          <Text style={[styles.cell, { flex: 1.5, textAlign: 'left', left: 0 }]}>{item.descripcion}</Text>
          <Text style={[styles.cell, { flex: 1, textAlign: 'right', right: 10 }]}>{item.nombre}</Text>
        </View>
      );
    } else if (titulo === "Cálculo de centro de gravedad:") {
      return (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, { flex: 0.5, textAlign: 'left', left: 10 }]}>{item.item}</Text>
          <Text style={[styles.cell, { flex: 1.5, textAlign: 'left', left: 20 }]}>{item.descripcion}</Text>
          <Text style={[styles.cell, { flex: 1, textAlign: 'left', left: 20 }]}>{item.X === 'N/A' ? '0' : item.X}</Text>
          <Text style={[styles.cell, { flex: 1, textAlign: 'left', left: 20 }]}>{item.Y === 'N/A' ? '0' : item.Y}</Text>
          <Text style={[styles.cell, { flex: 1, textAlign: 'left', right: -30 }]}>{item.Z === 'N/A' ? '0' : item.Z}</Text>
        </View>
      );
    }
    else {
      return (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, { flex: 1, textAlign: 'left', left: 10 }]}>{index + 1}</Text>
          <Text style={[styles.cell, { flex: 2, textAlign: 'left', left: -30 }]}>{item.descripcion}</Text>
          <Text style={[styles.cell, { flex: 1, right: 10, textAlign: "right" }]}>
            {typeof item.cantidad === 'object' ? `${item.cantidad.valor} ${item.cantidad.unidad}` : item.cantidad}
          </Text>
        </View>
      );
    }
  };

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
            <Text style={[styles.cell, { flex: 1, textAlign: 'left', left: 10, top: 15, fontSize: 16, fontWeight: '500' }]}>{item.item}</Text>
            <View style={[styles.cell, { flex: 1 }]}>
              <TextInput
                style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ccc', padding: 15 }}
                placeholder="Medida (metros)"
                value={item.medida}
                onChangeText={(value) => {
                  const numericValue = value.replace(/[^0-9.]/g, '');
                  onChangeMedida(index, numericValue);
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.tableSection}>
      <Text style={styles.sectionTitle}>{titulo}</Text>
      {renderTableHeader()}
      {data.map((item, index) => renderTableRow(item, index))}
    </View>
  );
};

export default Tabla;