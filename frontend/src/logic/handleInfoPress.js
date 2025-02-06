import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/BSInfoStyles';

const handleInfoPress = (descripcion, valor, aparejosRows, selectedGrua, radioIzaje, radioMontaje, totalPesoAparejos) => {
    const radioIzajeNumero = parseFloat(radioIzaje) || 0;
    const radioMontajeNumero = parseFloat(radioMontaje) || 0;    
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
                        <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>{item.descripcion}</Text>
                        <Text style={{ color: 'red', textAlign: 'right', fontWeight: '500' }}>
                            {item.pesoUnitario} kg x {item.cantidad} =  {(item.pesoUnitario * item.cantidad).toFixed(0)} kg
                        </Text>
                    </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, marginBottom: 10 }}>
                    <Text style={[styles.extraInfoText, { fontWeight: 'bold', textAlign: 'left' }]}>Total del peso de aparejos:</Text>
                    <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'right', marginLeft: 90, top: 1 }}>
                        {totalPesoAparejos.toFixed(0)} kg
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
                    <Text style={{ color: 'red', textAlign: 'right', fontWeight: '500', marginLeft: 90 }}>
                        {selectedGrua && selectedGrua.pesoEquipo && !isNaN(selectedGrua.pesoEquipo) ? selectedGrua.pesoEquipo.toFixed(0) : '0'} kg
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>PESO DE APAREJOS:</Text>
                    <Text style={{ color: 'red', textAlign: 'right', fontWeight: '500' }}>
                        {totalPesoAparejos && !isNaN(totalPesoAparejos) ? totalPesoAparejos.toFixed(0) : '0'} kg
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>PESO DEL GANCHO:</Text>
                    <Text style={{ color: 'red', textAlign: 'right', fontWeight: '500' }}>
                        {selectedGrua && selectedGrua.pesoGancho && !isNaN(selectedGrua.pesoGancho) ? selectedGrua.pesoGancho.toFixed(0) : '0'} kg
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.extraInfoText, { fontWeight: 'bold', textAlign: 'left' }]}>Peso total:</Text>
                    <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'right', fontSize: 16 }}>
                        {((selectedGrua && selectedGrua.pesoEquipo && !isNaN(selectedGrua.pesoEquipo) ? selectedGrua.pesoEquipo : 0) +
                            (totalPesoAparejos && !isNaN(totalPesoAparejos) ? totalPesoAparejos : 0) +
                            (selectedGrua && selectedGrua.pesoGancho && !isNaN(selectedGrua.pesoGancho) ? selectedGrua.pesoGancho : 0))
                            .toFixed(0)} kg
                    </Text>
                </View>
            </View>
        );
    } else if (descripcion === 'RADIO DE TRABAJO MÁX') {
        const radioMaximo = Math.max(radioIzaje || 0, radioMontaje || 0);

        explicacion = (
            <>
                Es el radio de mayor diámetro registrado para el <Text style={{ color: 'red' }}>radio de izaje</Text> 
                y el <Text style={{ color: 'red' }}>radio de montaje. </Text> 
                El mayor corresponde al <Text style={{ color: 'red' }}>RADIO DE TRABAJO MÁX</Text>.
            </>
        );

        extraInfo = (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>RADIO DE IZAJE:</Text>
                    <Text style={{ color: 'red', textAlign: 'right', fontWeight: '500', marginLeft: 90 }}>
                        {radioIzajeNumero.toFixed(0)} metros
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={[styles.extraInfoText, { textAlign: 'left' }]}>RADIO DE MONTAJE:</Text>
                    <Text style={{ color: 'red', textAlign: 'right', fontWeight: '500' }}>
                        {radioMontajeNumero.toFixed(0)} metros
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.extraInfoText, { fontWeight: 'bold', textAlign: 'left' }]}>RADIO DE TRABAJO MÁX:</Text>
                    <Text style={{ color: 'red', fontWeight: 'bold', textAlign: 'right', fontSize: 16 }}>
                        {radioMaximo && !isNaN(radioMaximo) ? radioMaximo.toFixed(0) : '0'} metros
                    </Text>
                </View>
            </View>
        );
    }
    else if (descripcion === '% UTILIZACIÓN') {
        explicacion = 'Utilización del plan de izaje';
        extraInfo = 'Explicación no disponible';
    } else {
        explicacion = 'Explicación no disponible';
        extraInfo = 'Hola Mundo Default';
    }

    return { explicacion, extraInfo };
};

export default handleInfoPress;