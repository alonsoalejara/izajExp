import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles/AdminSectionStyles';
import getApiUrl from '../../../utils/apiUrl';
import Components from '../../../components/Components.index';
import { generarPDF } from '../../../utils/PDFGenerator'; 

const SetupIzajeSection = ({ setupIzaje = [], setSetups }) => {
    const [selectedSetup, setSelectedSetup] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
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
            
            // Aquí se utiliza el 'cargaRows' correcto con la lógica que proporcionaste
            const pesoTotalCarga = totalPesoAparejos + (setup.datos?.pesoEquipo || 0) + (setup.datos?.pesoGancho || 0) + (setup.datos?.pesoHerramientas || 0);
            const radioIzaje = setup.datos?.radioIzaje || 0; // Suponiendo que esto es parte de setup.datos
            const radioMontaje = setup.datos?.radioMontaje || 0; // Lo mismo para esto
    
            // Se asegura de que el 'item' se enumere correctamente
            const cargaRows = [
                { item: '1', descripcion: 'PESO DEL EQUIPO', valor: `${setup.datos?.pesoEquipo || 0} kg` },
                { item: '2', descripcion: 'PESO DE APAREJOS', valor: `${totalPesoAparejos} kg` },
                { item: '3', descripcion: 'PESO GANCHO', valor: `${setup.datos?.pesoGancho || 0} kg` },
                { item: '4', descripcion: 'PESO TOTAL', valor: `${pesoTotalCarga} kg` },
                { item: '5', descripcion: 'RADIO DE TRABAJO MAXIMO', valor: `${Math.max(radioIzaje, radioMontaje)} mts` },
                { item: '6', descripcion: 'CAPACIDAD DE LEVANTE', valor: `${setup.datos?.capacidadLevante || 0} kg` },
                { item: '7', descripcion: '% DE UTILIZACIÓN', valor: '' }, // Este campo puede necesitar un cálculo si es necesario
            ];
    
            // Datos adicionales de la grúa, si es necesario
            const datosGruaRows = [
                { item: '1', descripcion: 'Largo de Pluma', valor: setup.datos?.largoPluma },
                { item: '2', descripcion: 'Contrapeso', valor: setup.datos?.contrapeso },
            ];
    
            // Asegurando que los aparejos se enumeren correctamente
            const aparecerosWithItem = rows.map((aparejo, index) => ({
                item: (index + 1).toString(), // Esto asigna el número de ítem correctamente
                descripcion: aparejo.descripcion,
                valor: `${aparejo.pesoUnitario * aparejo.cantidad} kg`, // Ejemplo de valor, ajusta según sea necesario
            }));
            console.log('Aparejos:', setup.aparejos);

            // Aquí se llama a la función para generar el PDF con los datos que ya están ajustados
            generarPDF(setup, aparecerosWithItem, totalPesoAparejos, cargaRows, datosGruaRows);
        }
    };
    
    

    return (
        <View style={styles.section}>
            {(setupIzaje && Array.isArray(setupIzaje) && setupIzaje.length > 0) ? (
                setupIzaje.map((setup) => (
                    <View key={setup._id} style={styles.card}>
                        <TouchableOpacity onPress={() => setSelectedSetup(selectedSetup === setup._id ? null : setup._id)}>
                            <Text style={[styles.cardTitle, { fontWeight: '400' }]}>Responsable: {setup.usuario.nombre && setup.usuario.apellido
                                ? `${setup.usuario.nombre} ${setup.usuario.apellido}`
                                : 'No disponible'}</Text>
                            <View>
                                <Text style={[styles.labelText, { fontWeight: '400', fontSize: 16 , color: '#777' }]} >
                                    Fecha de planificación:
                                </Text>
                                <Text style={[styles.cardDetail, { fontWeight: '400', color: '#777' }]}>{setup.createdAt ? formatDate(setup.createdAt) : 'No disponible'}</Text>
                            </View>
                        </TouchableOpacity>
                        {selectedSetup === setup._id && (
                            <View style={styles.cardExpandedDetails}>
                                <Text style={styles.cardSubtitle}>Datos de grúa:</Text>
                                <Text style={styles.cardDetail}>
                                    <Text style={styles.labelText}>Largo de Pluma: </Text>{setup.datos ? setup.datos.largoPluma : 'No disponible'} m
                                </Text>
                                <Text style={styles.cardDetail}>
                                    <Text style={styles.labelText}>Contrapeso: </Text>{setup.datos ? setup.datos.contrapeso : 'No disponible'} toneladas
                                </Text>

                                <Text style={styles.cardSubtitle}>Aparejos:</Text>
                                {setup.aparejos && setup.aparejos.length > 0 ? (
                                    setup.aparejos.map((aparejo, index) => (
                                        <View key={index} style={styles.cardItem}>
                                            <Text style={styles.cardDetail}><Text style={styles.labelText}>Descripción: </Text>{aparejo.descripcion || 'No disponible'}</Text>
                                            <Text style={styles.cardDetail}><Text style={styles.labelText}>Cantidad: </Text>{aparejo.cantidad || 'No disponible'}</Text>
                                            <Text style={styles.cardDetail}><Text style={styles.labelText}>Peso Unitario: </Text>{aparejo.pesoUnitario || 'No disponible'} kg</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>No hay aparejos disponibles.</Text>
                                )}

                                {/* Contenedor para los botones */}
                                <View style={[styles.buttonContainerCard, { right: 60, marginTop: 15, marginBottom: -15 }]}>
                                    <Components.Button
                                        label="Compartir PDF"
                                        onPress={() => handleSharePdf(setup._id)}
                                        style={[styles.button, { width: '48%', marginRight: -40}]}/>
                                    <Components.Button
                                        label="Eliminar"
                                        onPress={() => confirmDelete(setup._id)}
                                        isCancel={true}
                                        style={[styles.button, { width: '48%', backgroundColor: 'transparent' }]}/>
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
