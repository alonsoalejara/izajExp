import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import getApiUrl from '../../utils/apiUrl';
import TablasStyles from '../../styles/TablasStyles';

const GruaTable = ({ grúaSeleccionada }) => {
    const [datosGrúaRows, setDatosGrúaRows] = useState([
        { item: '1', descripcion: 'LARGO PLUMA', valor: 'N/A' },
        { item: '2', descripcion: 'CONTRAPESO', valor: 'N/A' }
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
                        setDatosGrúaRows(prevRows => prevRows.map(row => {
                            if (row.descripcion === 'LARGO PLUMA') {
                                return { ...row, valor: `${gruaSeleccionadaData.largoPluma} m` };
                            }
                            if (row.descripcion === 'CONTRAPESO') {
                                return { ...row, valor: `${gruaSeleccionadaData.contrapeso} kg` };
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
    }, [grúaSeleccionada]);

    if (loading) {
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
                    <Text style={[TablasStyles.cell, TablasStyles.valueColumn, { flex: 1.5 } ]}>{row.valor}</Text>
                </View>
            ))}
        </View>
    );
};

export default GruaTable;
