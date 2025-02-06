import { View, Text } from 'react-native';
import TablasStyles from '../../styles/TablasStyles';
import CargaTable from './CargaTable';

const AparejosTable = ({ 
  rows, 
  totalPesoAparejos, 
  selectedGrua, 
  radioIzaje, 
  radioMontaje, 
  pesoTotalCarga 
}) => (
  <View>
    <View style={TablasStyles.table}>
      <View style={TablasStyles.fullRow}>
        <Text style={[TablasStyles.fullRowText, TablasStyles.titleText]}>
          {selectedGrua ? `CUADRO APAREJOS GRÚA: ${selectedGrua.nombre}` : 'CUADRO APAREJOS'}
        </Text>
      </View>

      <View style={TablasStyles.row}>
        <Text style={[TablasStyles.cell, { flex: 1.2 , fontWeight: 'bold'}]}>ITEM</Text>
        <Text style={[TablasStyles.cell, { flex: 4.9, fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
        <Text style={[TablasStyles.cell, { flex: 1.47 , fontWeight: 'bold' }]}>CANT.</Text>
        <Text style={[TablasStyles.cell, { flex: 1.5 , fontWeight: 'bold' }]}>PESO UNIT (Kg.)</Text>
        <Text style={[TablasStyles.cell, { flex: 1.5 , fontWeight: 'bold' }]}>PESO TOTAL (Kg.)</Text>
      </View>

      {rows.map((row, index) => (
        <View key={index} style={TablasStyles.row}>
          <Text style={[TablasStyles.cell, { flex: 1.2 }]}>{row.item}</Text>
          <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn]}>{row.descripcion}</Text>
          <Text style={[TablasStyles.cell, { flex: 1.47 }]}>{row.cantidad}</Text>
          <Text style={[TablasStyles.cell, TablasStyles.valueColumn]}>{row.pesoUnitario} kg</Text>
          <Text style={[TablasStyles.cell, TablasStyles.valueColumn]}>{row.pesoTotal} kg</Text>
        </View>
      ))}

      <View style={TablasStyles.row}>
        <Text style={TablasStyles.totalColumn}>Total Peso Aparejos</Text>
        <Text style={[TablasStyles.numberColumn, { padding: 3 }]}>
          {totalPesoAparejos !== undefined ? `${totalPesoAparejos} kg` : '0 kg'}
        </Text>
      </View>
    </View>

    <CargaTable 
      selectedGrua={selectedGrua} 
      radioIzaje={radioIzaje} 
      radioMontaje={radioMontaje} 
      totalPesoAparejos={totalPesoAparejos} 
      pesoTotalCarga={pesoTotalCarga} 
      aparejosRows={rows}
    />
  </View>
);

export default AparejosTable;
