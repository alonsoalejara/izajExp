import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFetchData } from '../../hooks/useFetchData';
import useGruaData from '../../hooks/useGruaData';
import TablasStyles from '../../styles/TablasStyles';

const GruaTable = ({ grúaSeleccionada }) => {
    const { data, isLoading } = useFetchData('grua/');
    const datosGrúaRows = useGruaData(data, grúaSeleccionada);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={TablasStyles.table}>
            <View style={TablasStyles.fullRow}>
                <Text style={TablasStyles.fullRowText}>
                    {grúaSeleccionada ? `CUADRO DATOS GRÚA: ${grúaSeleccionada}` : 'CUADRO DATOS GRÚA'}
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
                    <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn, { flex: 4, fontSize: 14 }]}>{row.descripcion}</Text>
                    <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 1.5 }]}>{row.valor}</Text>
                </View>
            ))}
        </View>
    );
};

export default GruaTable;