import React from 'react'; 
import { View, Text, ActivityIndicator } from 'react-native';
import { useFetchData } from '../../hooks/useFetchData';
import useGruaData from '../../hooks/useGruaData';
import TablasStyles from '../../styles/TablasStyles';

const GruaTable = ({ selectedGrua }) => {
    const { data, isLoading } = useFetchData('grua/');
    const datosGrúaRows = useGruaData(data, selectedGrua);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const largoPluma = selectedGrua ? selectedGrua.largoPluma : 'No disponible';
    const contrapeso = selectedGrua ? selectedGrua.contrapeso : 'No disponible';

    const gruaName = selectedGrua ? selectedGrua.nombre : 'No seleccionada';

    return (
        <View style={TablasStyles.table}>
            <View style={TablasStyles.fullRow}>
                <Text style={TablasStyles.fullRowText}>
                    {`CUADRO DATOS GRÚA: ${gruaName}`}
                </Text>
            </View>

            <View style={TablasStyles.row}>
                <Text style={[TablasStyles.cell, { flex: 0.72, fontWeight: 'bold' }]}>ITEM</Text>
                <Text style={[TablasStyles.cell, { flex: 4, fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
                <Text style={[TablasStyles.cell, { flex: 1.49, fontWeight: 'bold' }]}>VALOR</Text>
            </View>

            {datosGrúaRows.map((row, index) => (
                <View key={index} style={TablasStyles.row}>
                    <Text style={[TablasStyles.cell, { flex: 0.72 }]}>{row.item}</Text>
                    <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn, { flex: 4, fontSize: 14 }]}>
                        {row.descripcion}
                    </Text>
                    <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 1.5 }]}>
                        {row.valor}
                    </Text>
                </View>
            ))}

            {/* Añadir un bloque para mostrar los valores de la grúa si están disponibles */}
            <View style={TablasStyles.row}>
                <Text style={[TablasStyles.cell, { flex: 0.72 }]}>1</Text>
                <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn, { flex: 4 }]}>LARGO PLUMA</Text>
                <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 1.5 }]}>
                    {largoPluma} mts
                </Text>
            </View>

            <View style={TablasStyles.row}>
                <Text style={[TablasStyles.cell, { flex: 0.72 }]}>2</Text>
                <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn, { flex: 4 }]}>CONTRAPESO</Text>
                <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 1.5 }]}>
                    {contrapeso} ton
                </Text>
            </View>
        </View>
    );
};

export default GruaTable;
