import { View, Text } from 'react-native';
import TablasStyles from '../../styles/TablasStyles';

const CargaTable = ({ cargaRows, grúaSeleccionada }) => (
  <View style={TablasStyles.table}>
    {/* Título con el nombre de la grúa seleccionada */}
    <View style={TablasStyles.fullRow}>
      <Text style={TablasStyles.fullRowText}>
        {grúaSeleccionada ? `CUADRO CARGA GRÚA: ${grúaSeleccionada}` : 'CUADRO CARGA'}
      </Text>
    </View>

    {/* Encabezados de las columnas */}
    <View style={TablasStyles.row}>
      <Text style={[TablasStyles.cell, { flex: 1, fontWeight: 'bold' }]}>ITEM</Text>
      <Text style={[TablasStyles.cell, { flex: 6, fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
      <Text style={[TablasStyles.cell, { flex: 2.1, fontWeight: 'bold' }]}>VALOR</Text>
    </View>

    {/* Filas dinámicas */}
    {cargaRows.map((row, index) => (
      <View key={index} style={TablasStyles.row}>
        <Text style={[TablasStyles.cell, { flex: 1 }]}>{row.item}</Text>
        <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn, { flex: 6, fontSize: 14 }]}>{row.descripcion}</Text>
        <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 2.1 }]}>{row.valor}</Text>
      </View>
    ))}
  </View>
);

export default CargaTable;