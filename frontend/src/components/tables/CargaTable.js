import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useFetchData } from '../../hooks/useFetchData';
import useCargaData from '../../hooks/useCargaData';
import styles from '../../styles/BSInfoStyles';
import TablasStyles from '../../styles/TablasStyles';
import CargaRow from '../CargaRow';
import BSInfo from '../bottomSheets/BSInfo';

const CargaTable = ({ grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga, aparejosRows }) => {
    const { data, isLoading } = useFetchData('grua/');
    const cargaRows = useCargaData(data, grúaSeleccionada, radioIzaje, radioMontaje, totalPesoAparejos, pesoTotalCarga);

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedData, setSelectedData] = useState({ descripcion: '', valor: '', explicacion: '' });

    const handleInfoPress = (descripcion, valor) => {
        let explicacion = '';
        let extraInfo = null;
    
        if (descripcion === 'PESO DE APAREJOS') {
            explicacion = (
                <>
                    La cantidad se encuentra calculada en base a la tabla <Text style={{ color: 'red' }}>CUADRO APAREJOS</Text>, 
                    cuya información se encuentra en la primera tabla.
                </>
            );
    
            // Sumar los pesos totales
            const totalPesoAparejos = aparejosRows.reduce((total, item) => total + item.pesoTotal, 0);
    
            extraInfo = (
                <View>
                    {aparejosRows.map((item, index) => (
                        <Text key={index} style={styles.extraInfoText}>
                            {item.descripcion} - <Text style={{ color: 'red' }}>{item.pesoUnitario} kg</Text> (Peso Unitario)
                        </Text>
                    ))}
                    {/* Mostrar el total de los pesos */}
                    <View style={{ marginTop: 10 }}>
                        <Text style={[styles.extraInfoText, { fontWeight: 'bold' }]}>
                            Total Peso Aparejos: <Text style={{ color: 'red' }}>{totalPesoAparejos.toFixed(2)} kg</Text>
                        </Text>
                    </View>
                </View>
            );
        } else if (descripcion === 'PESO TOTAL') {
            explicacion = (
                <>
                    Es la suma total del <Text style={{ color: 'red' }}>peso del equipo</Text>, 
                    <Text style={{ color: 'red' }}>peso de aparejos</Text> y del <Text style={{ color: 'red' }}>peso del gancho</Text> de la grúa.
                </>
            );
            extraInfo = 'Hola Mundo 2';
        } else if (descripcion === 'RADIO DE TRABAJO MÁX') {
            explicacion = (
                <>
                    Es el radio de mayor diámetro registrado para el <Text style={{ color: 'red' }}>radio de izaje</Text> 
                    y el <Text style={{ color: 'red' }}>radio de montaje.</Text>
                </>
            );
            extraInfo = 'Hola Mundo 3';
        } else if (descripcion === '% UTILIZACIÓN') {
            explicacion = 'Utilización del plan de izaje';
            extraInfo = 'Explicación no disponible';
        } else {
            explicacion = 'Explicación no disponible';
            extraInfo = 'Hola Mundo Default';
        }
    
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

