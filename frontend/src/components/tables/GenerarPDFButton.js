import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación
import TablasStyles from '../../styles/TablasStyles';
import { convertirImagenABase64 } from '../../utils/pdfUtils';
import { generarHTML } from '../../utils/pdfTemplate';

const generarPDF = async (selectedGrua, totalPesoAparejos, cargaRows, datosGrúaRows) => {
  const base64Imagen = await convertirImagenABase64(require('../../../assets/EI-Montajes.png'));
  const imagenBase64 = `data:image/png;base64,${base64Imagen}`;

  const htmlContent = generarHTML(totalPesoAparejos, cargaRows, datosGrúaRows, imagenBase64);

  try {
    const { uri } = await printToFileAsync({ html: htmlContent });
    await shareAsync(uri);
  } catch (error) {
    console.error('Error generando el PDF:', error);
  }
};

const SaveTablesButton = ({ selectedGrua, totalPesoAparejos, cargaRows, datosGrúaRows }) => {
  const [buttonText, setButtonText] = useState('Guardar Tabla');
  const navigation = useNavigation(); // Obtiene la instancia de navegación

  const handleButtonPress = () => {
    if (buttonText === 'Guardar Tabla') {
      setButtonText('Generar PDF');
    } else {
      generarPDF(selectedGrua, totalPesoAparejos, cargaRows, datosGrúaRows);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('SetupIzaje'); // Navega a la pantalla SetupIzaje
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 15 }}>
      <View style={TablasStyles.horizontalButtonContainer}>
        <TouchableOpacity
          style={TablasStyles.smallButton}
          onPress={handleBackPress}
        >
          <Text style={TablasStyles.buttonText}>Volver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={TablasStyles.smallButton}
          onPress={handleButtonPress}
        >
          <Text style={TablasStyles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SaveTablesButton;