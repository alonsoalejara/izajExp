import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles/AdminSectionStyles';
import getApiUrl from '../../../utils/apiUrl';
import Components from '../../../components/Components.index';
import { generarPDF } from '../../../utils/PDF/PDFGenerator'; 

const SetupIzajeSection = ({ setupIzaje = [], setSetups, currentUser, isAdminPanel }) => {
    const [selectedSetup, setSelectedSetup] = useState(null);
    const filteredSetups = currentUser
    ? setupIzaje.filter(setup => setup.usuario._id === currentUser._id)
    : setupIzaje;


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}-${month}-${year} a las ${hours}:${minutes} hrs`;
    };

    const confirmDelete = (_id) => {
        Alert.alert(
            'Confirmar Eliminación',
            '¿Estás seguro de que deseas eliminar este plan de izaje?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => handleDelete(_id) },
            ]
        );
    };

    const handleDelete = async (_id) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!accessToken) {
                alert('No autorizado. Por favor, inicie sesión nuevamente.');
                return;
            }
            const response = await fetch(getApiUrl(`setupIzaje/${_id}`), {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                alert('Plan de izaje eliminado con éxito');
                const updatedSetups = setupIzaje.filter((setup) => setup._id !== _id);
                setSetups(updatedSetups);
            } else {
                alert('Error al eliminar el plan de izaje');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSharePdf = (_id) => {
        const setup = setupIzaje.find(item => item._id === _id);
    
        if (setup) {
            const rows = setup.aparejos || [];
            const totalPesoAparejos = rows.reduce((acc, aparejo) => acc + (aparejo.pesoUnitario * aparejo.cantidad), 0);
            
            const pesoTotalCarga = totalPesoAparejos + (setup.cargas?.pesoEquipo || 0) + (setup.cargas?.pesoGancho || 0);
    
            const cargaRows = [
                { item: '1', descripcion: 'PESO DEL EQUIPO', valor: setup.cargas?.pesoEquipo ? `${setup.cargas.pesoEquipo} kg` : 'No disponible' },
                { item: '2', descripcion: 'PESO DE APAREJOS', valor: totalPesoAparejos ? `${totalPesoAparejos} kg` : 'No disponible' },
                { item: '3', descripcion: 'PESO GANCHO', valor: setup.cargas?.pesoGancho ? `${setup.cargas.pesoGancho} kg` : 'No disponible' },
                { item: '4', descripcion: 'PESO TOTAL', valor: pesoTotalCarga ? `${pesoTotalCarga} kg` : 'No disponible' },
                { item: '5', descripcion: 'RADIO DE TRABAJO MÁXIMO', valor: setup.cargas?.radioTrabajoMax ? `${setup.cargas.radioTrabajoMax} mts` : 'No disponible' },
                { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: setup.cargas?.capacidadLevante ? `${setup.cargas.capacidadLevante} kg` : 'No disponible' },
                { item: '7', descripcion: '% DE UTILIZACIÓN', valor: 'No disponible' },
            ];                    
    
            const datosGruaRows = [
                { item: '1', descripcion: 'Largo de Pluma', valor: setup.datos?.largoPluma ? `${setup.datos.largoPluma} m` : 'No disponible' },
                { item: '2', descripcion: 'Contrapeso', valor: setup.datos?.contrapeso ? `${setup.datos.contrapeso} m` : 'No disponible' },
            ];
    
            const aparecerosWithItem = rows.map((aparejo, index) => {
                const pesoTotal = (typeof aparejo.pesoUnitario === 'number' && typeof aparejo.cantidad === 'number')
                    ? aparejo.pesoUnitario * aparejo.cantidad
                    : 'No disponible';
                
                console.log(`Aparejo ${index + 1}:`, aparejo, 'pesoTotal:', pesoTotal);
    
                return {
                    item: (index + 1).toString(),
                    descripcion: aparejo.descripcion || 'No disponible',
                    cantidad: aparejo.cantidad ?? 'No disponible',
                    pesoUnitario: aparejo.pesoUnitario ?? 'No disponible',
                    valor: pesoTotal !== 'No disponible' ? `${pesoTotal} kg` : 'No disponible',
                };
            });
    
            console.log('SetupIzajeSection.js: aparecerosWithItem:', aparecerosWithItem);
    
            generarPDF(setup, aparecerosWithItem, totalPesoAparejos, cargaRows, datosGruaRows);
        }
    };    

    return (
        <View style={styles.section}>
            {(filteredSetups && Array.isArray(filteredSetups) && filteredSetups.length > 0) ? (
                filteredSetups.map((setup) => (
                    <View key={setup._id} style={styles.card}>
                        <TouchableOpacity onPress={() => setSelectedSetup(selectedSetup === setup._id ? null : setup._id)}>
                            <Text style={[styles.cardTitle, { fontWeight: '700' }]}>
                                Supervisor: <Text style={{ fontWeight: '400' }}>
                                    {setup.usuario.nombre && setup.usuario.apellido
                                        ? `${setup.usuario.nombre} ${setup.usuario.apellido}`
                                        : 'No disponible'}
                                </Text>
                            </Text>
                            <Text style={[styles.cardDetail, { fontWeight: '700', color: '#777' }]}>
                                Especialidad: <Text style={{ fontWeight: '400' }}>
                                    {setup.usuario.specialty || 'No disponible'}
                                </Text>
                            </Text>
                            <View>
                                <Text style={[styles.labelText, { top: 8, fontWeight: 'bold', fontSize: 16, color: '#777' }]}>
                                    Fecha: <Text style={{ fontWeight: '400' }}>
                                        {setup.createdAt ? formatDate(setup.createdAt) : 'No disponible'}
                                    </Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {selectedSetup === setup._id && (
                            <View style={styles.cardExpandedDetails}>

                                {/* Botones para compartir PDF y eliminar */}
                                <View style={[
                                    styles.buttonContainerCard, 
                                    { 
                                        marginLeft: -110, 
                                        marginTop: isAdminPanel ? -3 : 2, 
                                        marginBottom: isAdminPanel ? -160 : -100,
                                        bottom: 0, 
                                        top: 15, 
                                        left: -5 
                                    }
                                    ]}>
                                    <Components.Button
                                        label="Ver"
                                        onPress={() => console.log('Ver presionado')}
                                        isCancel={true}
                                        style={[styles.button, { backgroundColor: 'transparent', width: '0%', height: '62%', marginHorizontal: -53 }]}
                                    />
                                    <Components.Button
                                        label="Editar"
                                        onPress={() => console.log('Editar presionado')}
                                        isCancel={true}
                                        style={[styles.button, { backgroundColor: 'transparent', width: '0%', height: '62%', marginHorizontal: -53 }]}
                                    />
                                    {isAdminPanel && (
                                        <Components.Button
                                        label="Eliminar"
                                        onPress={() => console.log('Eliminar presionado')}
                                        isCancel={true}
                                        style={[styles.button, { backgroundColor: 'transparent', width: '0%', height: '62%', marginHorizontal: -53 }]}
                                        />
                                    )}
                                    </View>
                            </View>
                        )}
                    </View>
                ))
            ) : (
                <Text>No hay planes de izaje disponibles.</Text>
            )}
        </View>
    );
};
    

export default SetupIzajeSection;
