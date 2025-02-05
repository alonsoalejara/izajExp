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
    
            const totalPesoAparejos = aparejosRows.reduce((total, item) => total + item.pesoTotal, 0);
    
            extraInfo = (
                <View>
                    {aparejosRows.map((item, index) => (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>
                                {item.descripcion}
                            </Text>
                            <Text style={{ color: 'red', textAlign: 'right', fontWeight: 'bold' }}>
                                {item.pesoUnitario} kg x {item.cantidad}
                            </Text>
                        </View>
                    ))}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginBottom: 10 }}>
                        <Text style={[styles.extraInfoText, { fontWeight: 'bold', textAlign: 'left' }]}>
                            Total del peso de aparejos:
                        </Text>
                        <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'right', marginLeft: 50, top: 1 }}>
                            {totalPesoAparejos.toFixed(2)} kg
                        </Text>
                    </View>
                </View>
            );            
        } else if (descripcion === 'PESO TOTAL') {
            explicacion = (
                <>
                    Es la suma total del <Text style={{ color: 'red' }}>peso del equipo</Text>, 
                    <Text style={{ color: 'red' }}> peso de aparejos</Text> y del <Text style={{ color: 'red' }}>peso del gancho</Text> de la grúa.
                </>
            );
        
            extraInfo = (
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>PESO DEL EQUIPO:</Text>
                        <Text style={{ color: 'red', textAlign: 'right', fontWeight: 'bold', marginLeft: 110 }}>
                            {pesoTotalCarga && !isNaN(pesoTotalCarga) ? pesoTotalCarga.toFixed(0) : '0'} kg
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>PESO DE APAREJOS:</Text>
                        <Text style={{ color: 'red', textAlign: 'right', fontWeight: 'bold' }}>
                            {totalPesoAparejos && !isNaN(totalPesoAparejos) ? totalPesoAparejos.toFixed(0) : '0'} kg
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>PESO DEL GANCHO:</Text>
                        <Text style={{ color: 'red', textAlign: 'right', fontWeight: 'bold' }}>
                            {grúaSeleccionada && grúaSeleccionada.pesoGancho && !isNaN(grúaSeleccionada.pesoGancho)
                                ? grúaSeleccionada.pesoGancho.toFixed(0)
                                : '0'} kg
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={[styles.extraInfoText, { fontWeight: 'bold', textAlign: 'left' }]}>Peso total:</Text>
                        <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'right', fontSize: 16 }}>
                            {((pesoTotalCarga && !isNaN(pesoTotalCarga) ? pesoTotalCarga : 0) +
                              (totalPesoAparejos && !isNaN(totalPesoAparejos) ? totalPesoAparejos : 0) +
                              (grúaSeleccionada && grúaSeleccionada.pesoGancho && !isNaN(grúaSeleccionada.pesoGancho) 
                                  ? grúaSeleccionada.pesoGancho 
                                  : 0)
                            ).toFixed(0)} kg
                        </Text>
                    </View>
                </View>
            );
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

