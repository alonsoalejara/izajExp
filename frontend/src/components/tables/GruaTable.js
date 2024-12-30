import React from 'react';
import { View, Text } from 'react-native';
import TablasStyles from '../../styles/TablasStyles';

const GruaTable = ({ datosGrúaRows, grúaSeleccionada }) => (
  <View style={TablasStyles.table}>
    {/* Título con el nombre de la grúa seleccionada */}
    <View style={TablasStyles.fullRow}>
      <Text style={TablasStyles.fullRowText}>
        {grúaSeleccionada ? `CUADRO DATOS GRÚA: ${grúaSeleccionada}` : 'CUADRO DATOS GRÚA'}
      </Text>
    </View>

    {/* Encabezados de las columnas */}
    <View style={TablasStyles.row}>
      <Text style={[TablasStyles.cell, { flex: 0.72, fontWeight: 'bold' }]}>ITEM</Text>
      <Text style={[TablasStyles.cell, { flex: 4, fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
      <Text style={[TablasStyles.cell, { flex: 1.49, fontWeight: 'bold' }]}>VALOR</Text>
    </View>

    {/* Filas dinámicas */}
    {datosGrúaRows.map((row, index) => (
      <View key={index} style={TablasStyles.row}>
        <Text style={[TablasStyles.cell, { flex: 0.72 }]}>{row.item}</Text>
        <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn, { flex: 4, fontSize: 14 }]}>{row.descripcion}</Text>
        <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 1.5 } ]}>{row.valor}</Text>
      </View>
    ))}
  </View>
);

export default GruaTable;