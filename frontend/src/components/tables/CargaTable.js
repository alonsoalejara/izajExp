import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFetchData } from '../../hooks/useFetchData';
import useCargaData from '../../hooks/useCargaData';
import TablasStyles from '../../styles/TablasStyles';
import CargaRow from '../CargaRow';
import BSInfo from '../bottomSheets/BSInfo';

const CargaTable = ({ grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga }) => {
    const { data, isLoading } = useFetchData('grua/');
    const cargaRows = useCargaData(data, grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga);

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState({ descripcion: '', valor: '', explicacion: '' });

    const handleInfoPress = (descripcion, valor) => {
        let explicacion = '';

        if (descripcion === 'PESO DE APAREJOS') {
            explicacion = 'La cantidad se encuentra calculada en base a la tabla CUADRO APAREJOS GRÚA';
        } else if (descripcion === 'PESO TOTAL') {
            explicacion = 'Es la suma total de PESO DEL EQUIPO, PESO DE APAREJOS y PESO DEL GANCHO';
        } else if (descripcion === 'RADIO DE TRABAJO MÁX') {
            explicacion = 'El radio de trabajo máximo es la comparación entre el radio de izaje y el radio de montaje. El reflejado en la tabla es el mayor de los dos radios.';
        } else if (descripcion === '% UTILIZACIÓN') {
            explicacion = 'Utilizacion del plan de izaje';
        } else {
            explicacion = 'Explicación no disponible';
        }

        setSelectedData({ descripcion, valor, explicacion });
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
                <CargaRow key={index} row={row} onInfoPress={() => handleInfoPress(row.descripcion, row.valor)} />
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
