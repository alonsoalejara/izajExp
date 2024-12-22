import { View, Text } from 'react-native';
import TablasStyles from '../../styles/TablasStyles';

const AparejosTable = ({ rows, totalPesoAparejos }) => (
  <View style={TablasStyles.table}>
    {/* Encabezado de la tabla */}
    <View style={TablasStyles.fullRow}>
      <Text style={TablasStyles.fullRowText}>CUADRO APAREJOS</Text>
    </View>

    {/* Encabezados de las columnas */}
    <View style={TablasStyles.row}>
      <Text style={[TablasStyles.cell, { flex: 0.7 , fontWeight: 'bold'}]}>ITEM</Text>
      <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn, { fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
      <Text style={[TablasStyles.cell, { flex: 0.7 , fontWeight: 'bold' }]}>CANT.</Text>
      <Text style={[TablasStyles.cell, { flex: 1 , fontWeight: 'bold' }]}>PESO UNIT (Kg.)</Text>
      <Text style={[TablasStyles.cell, { flex: 1 , fontWeight: 'bold' }]}>PESO TOTAL (Kg.)</Text>
    </View>

    {/* Filas dinámicas */}
    {rows.map((row, index) => (
      <View key={index} style={TablasStyles.row}>
        <Text style={[TablasStyles.cell, { flex: 0.7 }]}>{row.item}</Text>
        <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn]}>{row.descripcion}</Text>
        <Text style={[TablasStyles.cell, { flex: 0.7 }]}>{row.cantidad}</Text>
        <Text style={[TablasStyles.cell, TablasStyles.valueColumn]}>{row.pesoUnitario} kg</Text>
        <Text style={[TablasStyles.cell, TablasStyles.valueColumn]}>{row.pesoTotal} kg</Text>
      </View>
    ))}

    {/* Fila de total */}
    <View style={TablasStyles.row}>
      <Text style={TablasStyles.totalColumn}>Total Peso Aparejos</Text>
      <Text style={TablasStyles.numberColumn}>{totalPesoAparejos} kg</Text>
    </View>
  </View>
);

export default AparejosTable;
