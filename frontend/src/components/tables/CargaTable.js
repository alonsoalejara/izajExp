import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getApiUrl from '../../utils/apiUrl';
import TablasStyles from '../../styles/TablasStyles';

const CargaTable = ({ grúaSeleccionada, radioIzaje, radioMontaje }) => {
    const [cargaRows, setCargaRows] = useState([
        { item: '1', descripcion: 'PESO DEL EQUIPO', valor: 'N/A' },
        { item: '2', descripcion: 'PESO DE APAREJOS', valor: 'N/A' },
        { item: '3', descripcion: 'PESO DEL GANCHO', valor: 'N/A' },
        { item: '4', descripcion: 'PESO TOTAL', valor: 'N/A' },
        { item: '5', descripcion: 'RADIO DE TRABAJO MÁX', valor: 'N/A' },
        { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: 'N/A' },
        { item: '7', descripcion: '% UTILIZACIÓN', valor: 'N/A' }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGruas = async () => {
            try {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('No se encontró el token de acceso');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(getApiUrl('grua/'), {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });

                if (response.data.state === 'Success') {
                    const gruaSeleccionadaData = response.data.data.find(grua => grua.nombre === grúaSeleccionada);

                    if (gruaSeleccionadaData) {
                        setCargaRows(prevRows => prevRows.map(row => {
                            if (row.descripcion === 'PESO DEL EQUIPO') {
                                return { ...row, valor: `${gruaSeleccionadaData.pesoEquipo} kg` };
                            }
                            if (row.descripcion === 'PESO DEL GANCHO') {
                                return { ...row, valor: `${gruaSeleccionadaData.pesoGancho} kg` };
                            }
                            if (row.descripcion === 'CAPACIDAD DE LEVANTE') {
                                return { ...row, valor: `${gruaSeleccionadaData.capacidadLevante} kg` };
                            }
                            if (row.descripcion === 'RADIO DE TRABAJO MÁX') {
                                // Asegúrate de que los radios estén disponibles
                                const radioMax = Math.max(radioIzaje, radioMontaje); 
                                return { ...row, valor: `${radioMax} mts` };
                            }
                            return row;
                        }));
                    }
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGruas();
    }, [grúaSeleccionada, radioIzaje, radioMontaje]);

    if (loading) {
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
                <View key={index} style={TablasStyles.row}>
                    <Text style={[TablasStyles.cell, { flex: 1 }]}>{row.item}</Text>
                    <Text style={[TablasStyles.cell, TablasStyles.descripcionColumn, { flex: 6 }]}>{row.descripcion}</Text>
                    <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 2.1 }]}>{row.valor}</Text>
                </View>
            ))}
        </View>
    );
};

export default CargaTable;
