import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFetchData } from '../../hooks/useFetchData';
import useCargaData from '../../hooks/useCargaData';
import TablasStyles from '../../styles/TablasStyles';
import CargaRow from '../CargaRow';
import BSInfo from '../bottomSheets/BSInfo';
import handleInfoPress from '../../logic/handleInfoPress';

const CargaTable = ({ grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga, aparejosRows }) => {
    const { data, isLoading } = useFetchData('grua/');
    const cargaRows = useCargaData(data, grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga);

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState({ descripcion: '', valor: '', explicacion: '' });

    const handleInfo = (descripcion, valor) => {
        const { explicacion, extraInfo } = handleInfoPress(descripcion, valor, aparejosRows, grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos);
        setSelectedData({ descripcion, valor, explicacion, extraInfo });
        setModalVisible(true);
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
                <CargaRow key={index} row={row} onInfoPress={() => handleInfo(row.descripcion, row.valor)} />
            ))}

            <BSInfo
                isModalVisible={isModalVisible}
                selectedData={selectedData}
                setModalVisible={setModalVisible}
            />
        </View>
    );
};

export default CargaTable;
