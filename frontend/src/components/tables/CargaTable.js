import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFetchData } from '../../hooks/useFetchData';
import useCargaData from '../../hooks/useCargaData';
import TablasStyles from '../../styles/TablasStyles';
import CargaRow from '../CargaRow';

const CargaTable = ({ grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga }) => {
    const { data, isLoading } = useFetchData('grua/');
    const cargaRows = useCargaData(data, grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga);

    const handleInfoPress = (descripcion) => {
        alert(`Información sobre: ${descripcion}`);
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={TablasStyles.table}>
            <View style={TablasStyles.fullRow}>
                <Text style={TablasStyles.fullRowText}>
                    {grúaSeleccionada ? `CUADRO CARGA GRÚA: ${grúaSeleccionada}` : 'CUADRO CARGA'}
                </Text>
            </View>

            <View style={TablasStyles.row}>
                <Text style={[TablasStyles.cell, { flex: 1, fontWeight: 'bold' }]}>ITEM</Text>
                <Text style={[TablasStyles.cell, { flex: 6, fontWeight: 'bold' }]}>DESCRIPCIÓN</Text>
                <Text style={[TablasStyles.cell, { flex: 2.1, fontWeight: 'bold' }]}>VALOR</Text>
            </View>

            {cargaRows.map((row, index) => (
                <CargaRow key={index} row={row} onInfoPress={handleInfoPress} />
            ))}
        </View>
    );
};

export default CargaTable;
