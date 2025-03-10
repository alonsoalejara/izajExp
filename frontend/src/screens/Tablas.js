import React, { useState } from 'react';
 import { View, Text, Alert } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { generarPDF } from '../utils/PDFGenerator';
 import TablasStyles from '../styles/TablasStyles';
 import Button from '../components/Button';
 import Header from '../components/Header.js';
 import Toast from 'react-native-toast-message';
 import getApiUrl from '../utils/apiUrl';
 
 const Tablas = ({ route, navigation }) => {
   const [isSaved, setIsSaved] = useState(false);

   const handleGuardar = () => {
     Alert.alert(
       'Confirmar',
       '¿Estás seguro de guardar este plan de izaje?',
       [
         {
           text: 'Cancelar',
           onPress: () => console.log('Cancelado'),
           style: 'cancel',
         },
         {
           text: 'Confirmar',
           onPress: handleConfirmar,
         },
       ],
       { cancelable: false }
     );
   };
 
   const handleConfirmar = async () => {
     if (!usuarioId) {
       Toast.show({
         type: 'error',
         text1: 'Error',
         text2: 'No se encontró el usuario ID',
       });
       return;
     }
 
     const planData = {
       usuario: usuarioId,
       aparejos: rows.map(row => ({
         descripcion: row.descripcion,
         cantidad: row.cantidad,
         pesoUnitario: row.pesoUnitario,
         pesoTotal: row.pesoTotal,
       })),
       datos: {
         largoPluma: selectedGrua.largoPluma,
         contrapeso: selectedGrua.contrapeso,
       },
       cargas: {
         pesoEquipo: selectedGrua.pesoEquipo,
         pesoAparejos: totalPesoAparejos,
         pesoGancho: selectedGrua.pesoGancho,
         pesoTotal: pesoTotalCarga,
         radioTrabajoMax: Math.max(radioIzaje, radioMontaje),
         capacidadLevante: selectedGrua.capacidadLevante,
         porcentajeUtilizacion: 0,
       },
     };  
 
     try {
       const accessToken = await AsyncStorage.getItem('accessToken');
 
       if (!accessToken) {
         Toast.show({
           type: 'error',
           text1: 'Error',
           text2: 'No se encontró un token de acceso.',
         });
         return;
       }
 
       const response = await fetch(getApiUrl('setupIzaje'), {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${accessToken}`,
         },
         body: JSON.stringify(planData),
       });
 
       const data = await response.json();
       if (response.ok) {
         setIsSaved(true);
         Toast.show({
           type: 'success',
           text1: 'Plan de izaje guardado',
           visibilityTime: 3000,
         });
         console.log('Respuesta del servidor:', data);
       } else {
         Toast.show({
           type: 'error',
           text1: 'Error al guardar',
           text2: data.message,
         });
       }
     } catch (error) {
       console.error('Error:', error);
       Toast.show({
         type: 'error',
         text1: 'Hubo un error',
         text2: 'No se pudo guardar el plan de izaje.',
       });
     }
   };  
 
   return (
     <View style={{ flex: 1 }}>
       <Header />
       <View style={TablasStyles.titleContainer}>
         <Text style={TablasStyles.title}>Tablas</Text>
       </View>
       <View style={TablasStyles.buttonContainer}>
         <Button
           label="Volver"
           onPress={() => navigation.goBack()}
           isCancel={true}
           style={{
             backgroundColor: 'transparent', marginTop: 15,
             top: -6, height: '60%',
             width: '45%', left: -49
           }}
         />
         <Button
           label={isSaved ? 'PDF' : 'Guardar'}
           onPress={isSaved ? () => {
             console.log('Generando PDF...');
            generarPDF(selectedGrua, rows, totalPesoAparejos, cargaRows, datosGruaRows);
          } : handleGuardar}
          style={{ marginTop: 15, top: -6, height: '60%', width: '45%', left: -79 }}
        />
      </View>
    </View>
  );
};

export default Tablas;