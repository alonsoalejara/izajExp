import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/AdminPanelStyles';
import ModalAlert from '../modals/ModalAlert';
import getApiUrl from '../../utils/apiUrl';

const SetupIzajeSection = ({ setupIzaje = [], handleEdit }) => {
    const [selectedSetup, setSelectedSetup] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [setupToDelete, setSetupToDelete] = useState(null);

    console.log("Datos recibidos en SetupIzajeSection:", setupIzaje);

    const confirmDelete = (id) => {
        setSetupToDelete(id);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            if (!accessToken) {
                alert('No autorizado. Por favor, inicie sesión nuevamente.');
                return;
            }
    
            const response = await fetch(getApiUrl(`setupIzaje/${id}`), {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
    
            if (response.ok) {
                alert('Plan de izaje eliminado con éxito');
                // Aquí puedes agregar lógica adicional, como actualizar el estado para reflejar el cambio
            } else {
                const errorResponse = await response.json();
                console.error('Error al eliminar el plan de izaje:', errorResponse);
                alert(`Error al eliminar el plan de izaje: ${errorResponse.message || 'Desconocido'}`);
            }
        } catch (error) {
            console.error('Error al intentar eliminar el plan de izaje:', error);
            alert('Hubo un error al intentar eliminar el plan de izaje');
        } finally {
            setModalVisible(false);
        }
    };
    
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planes de Izaje</Text>

            {/* Verificación de datos */}
            {(setupIzaje && Array.isArray(setupIzaje) && setupIzaje.length > 0) ? setupIzaje.map((setup) => {
                console.log("Configuración de izaje individual:", setup);
                return (
                    <View key={setup._id} style={styles.card}>
                        <TouchableOpacity onPress={() => setSelectedSetup(selectedSetup === setup._id ? null : setup._id)}>
                            <Text style={styles.cardTitle}>Plan</Text>
                            <Text style={styles.cardDetail}>
                                <Text style={styles.labelText}>
                                    Responsable: {setup.usuario.nombre && setup.usuario.apellido 
                                        ? `${setup.usuario.nombre} ${setup.usuario.apellido}` 
                                        : 'No disponible'}
                                </Text>
                            </Text>
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
                                {setup.aparejos && setup.aparejos.length > 0 ? setup.aparejos.map((aparejo, index) => {
                                    console.log("Aparejo individual:", aparejo);
                                    return (
                                        <View key={index} style={styles.cardItem}>
                                            <Text style={styles.cardDetail}><Text style={styles.labelText}>Descripción: </Text>{aparejo.descripcion || 'No disponible'}</Text>
                                            <Text style={styles.cardDetail}><Text style={styles.labelText}>Cantidad: </Text>{aparejo.cantidad || 'No disponible'}</Text>
                                            <Text style={styles.cardDetail}><Text style={styles.labelText}>Peso Unitario: </Text>{aparejo.pesoUnitario || 'No disponible'} kg</Text>
                                        </View>
                                    );
                                }) : <Text>No hay aparejos disponibles.</Text>}

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() => handleEdit(setup)}
                                    >
                                        <Text style={styles.actionButtonText}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.actionButton}
                                        onPress={() => confirmDelete(setup._id)}
                                    >
                                        <Text style={styles.actionButtonText}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                );
            }) : <Text>No hay planes de izaje disponibles.</Text>}

            {/* Modal para confirmación de eliminación */}
            <ModalAlert
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                message="¿Estás seguro de que deseas eliminar este plan de izaje?"
                showCloseButton={false}
            >
                <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(setupToDelete)}>
                    <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
            </ModalAlert>
        </View>
    );
};

export default SetupIzajeSection;
