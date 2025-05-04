import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledView from '../../UI/StyledView';
import { inclinacionMapAlturas } from '../../../../utils/inclinacionMapAlturas';

const containerDimensionsMap = {
  altura33: {
    "75": { bottom: 915, right: 10 },
    "74": { bottom: 905, right: 20 },
    "73": { bottom: 900, right: 35 },
    "72": { bottom: 900, right: 50 },
    "71": { bottom: 900, right: 65 },
    "70": { bottom: 890, right: 75 },
    "69": { bottom: 880, right: 87 },
    "68": { bottom: 875, right: 98 },
    "67": { bottom: 870, right: 113 },
    "66": { bottom: 865, right: 125 },
    "65": { bottom: 860, right: 138 },
    "64": { bottom: 855, right: 150 },
    "63": { bottom: 850, right: 165 },
    "62": { bottom: 836, right: 175 },
    "61": { bottom: 826, right: 188 },
    "60": { bottom: 820, right: 205 },
    "59": { bottom: 820, right: 225 },
    "58": { bottom: 810, right: 235 },
    "57": { bottom: 800, right: 245 },
    "56": { bottom: 790, right: 255 },
    "55": { bottom: 785, right: 265 },
    "54": { bottom: 770, right: 275 },
    "53": { bottom: 760, right: 287 },
    "52": { bottom: 750, right: 295 },
    "51": { bottom: 742, right: 305 },
    "50": { bottom: 732, right: 315 },
    "49": { bottom: 722, right: 325 },
    "48": { bottom: 712, right: 335 },
    "47": { bottom: 702, right: 345 },
    "46": { bottom: 692, right: 355 },
    "45": { bottom: 682, right: 365 },
    "44": { bottom: 672, right: 375 },
    "43": { bottom: 662, right: 385 },
    "42": { bottom: 652, right: 395 },
    "41": { bottom: 642, right: 405 },
    "40": { bottom: 632, right: 415 },
    "39": { bottom: 622, right: 425 },
    "38": { bottom: 610, right: 435 },
    "37": { bottom: 598, right: 445 },
    "36": { bottom: 586, right: 450 },
    "35": { bottom: 574, right: 455 },
    "34": { bottom: 562, right: 460 },
    "33": { bottom: 550, right: 465 },
    "32": { bottom: 538, right: 470 },
    "31": { bottom: 525, right: 475 },
    "30": { bottom: 510, right: 480 },
    "29": { bottom: 495, right: 485 },
    "28": { bottom: 480, right: 490 },
    "27": { bottom: 465, right: 495 },
    "26": { bottom: 450, right: 500 },
    "25": { bottom: 435, right: 505 },
    "24": { bottom: 420, right: 510 },
    "23": { bottom: 405, right: 515 },
    "22": { bottom: 395, right: 520 },
    "21": { bottom: 380, right: 525 },
    "20": { bottom: 365, right: 530 },
    "19": { bottom: 350, right: 535 },
    "18": { bottom: 335, right: 540 },
    "17": { bottom: 325, right: 545 },
    "16": { bottom: 310, right: 550 },
    "15": { bottom: 295, right: 555 },
    "14": { bottom: 285, right: 560 },
    "13": { bottom: 270, right: 565 },
    "12": { bottom: 255, right: 570 },
    "11": { bottom: 240, right: 575 },
    "10": { bottom: 225, right: 580 },
  },
  altura26: {
    "75": { bottom: 810, right: -20 },
    "74": { bottom: 810, right: -20 },
    "73": { bottom: 800, right: 0 },
    "72": { bottom: 840, right: 35 },
    "71": { bottom: 840, right: 35 },
    "70": { bottom: 750, right: 50 },
    "69": { bottom: 750, right: 50 },
    "68": { bottom: 750, right: 50 },
    "67": { bottom: 750, right: 50 },
    "66": { bottom: 750, right: 50 },
    "65": { bottom: 750, right: 90 },
    "64": { bottom: 750, right: 50 },
    "63": { bottom: 750, right: 100 },
    "62": { bottom: 750, right: 50 },
    "61": { bottom: 730, right: 150 },
    "60": { bottom: 730, right: 160 },
    "59": { bottom: 690, right: 190 },
    "58": { bottom: 690, right: 190 },
    "57": { bottom: 690, right: 190 },
    "56": { bottom: 690, right: 190 },
    "55": { bottom: 650, right: 200 },
    "54": { bottom: 650, right: 200 },
    "53": { bottom: 650, right: 200 },
    "52": { bottom: 660, right: 250 },
    "51": { bottom: 610, right: 240 },
    "50": { bottom: 610, right: 240 },
    "49": { bottom: 540, right: 335 },
    "48": { bottom: 540, right: 335 },
    "47": { bottom: 590, right: 285 },
    "46": { bottom: 540, right: 335 },
    "45": { bottom: 540, right: 335 },
    "44": { bottom: 540, right: 335 },
    "43": { bottom: 560, right: 305 },
    "42": { bottom: 540, right: 335 },
    "41": { bottom: 540, right: 335 },
    "40": { bottom: 540, right: 335 },
    "39": { bottom: 450, right: 400 },
    "38": { bottom: 450, right: 400 },
    "37": { bottom: 520, right: 380 },
    "36": { bottom: 520, right: 380 },
    "35": { bottom: 520, right: 380 },
    "34": { bottom: 520, right: 380 },
    "33": { bottom: 460, right: 380 },
    "32": { bottom: 450, right: 400 },
    "31": { bottom: 450, right: 400 },
    "30": { bottom: 450, right: 400 },
    "29": { bottom: 330, right: 490 },
    "28": { bottom: 330, right: 490 },
    "27": { bottom: 330, right: 490 },
    "26": { bottom: 330, right: 490 },
    "25": { bottom: 370, right: 420 },
    "24": { bottom: 330, right: 490 },
    "23": { bottom: 330, right: 490 },
    "22": { bottom: 330, right: 490 },
    "21": { bottom: 330, right: 490 },
    "20": { bottom: 330, right: 490 },
    "10": { bottom: 220, right: 450 },
  },
  altura24: {
    "75": { bottom: 660, right: -60 },
    "74": { bottom: 660, right: -60 },
    "72": { bottom: 640, right: -20 },
    "70": { bottom: 640, right: 0 },
    "67": { bottom: 640, right: 35 },
    "64": { bottom: 610, right: 55 },
    "62": { bottom: 600, right: 75 },
    "60": { bottom: 590, right: 85 },
    "56": { bottom: 560, right: 120 },
    "53": { bottom: 560, right: 150 },
    "50": { bottom: 530, right: 170 },
    "46": { bottom: 480, right: 175 },
    "42": { bottom: 480, right: 195 },
    "40": { bottom: 440, right: 225 },
    "35": { bottom: 420, right: 250 },
    "30": { bottom: 370, right: 290 },
    "22": { bottom: 300, right: 305 },
    "20": { bottom: 280, right: 315 },
    "10": { bottom: 200, right: 340 },
  },
  altura19: {
    "75": { bottom: 570, right: -100 },
    "73": { bottom: 570, right: -80 },
    "70": { bottom: 540, right: -25 },
    "67": { bottom: 540, right: -25 },
    "65": { bottom: 530, right: 0 },
    "60": { bottom: 490, right: 40 },
    "56": { bottom: 460, right: 35 },
    "54": { bottom: 490, right: 65 },
    "50": { bottom: 460, right: 105 },
    "46": { bottom: 440, right: 110 },
    "40": { bottom: 370, right: 150 },
    "36": { bottom: 370, right: 170 },
    "32": { bottom: 340, right: 175 },
    "30": { bottom: 330, right: 205 },
    "20": { bottom: 250, right: 190 },
    "10": { bottom: 170, right: 245 },
  },
  altura15: {
    "75": { bottom: 450, right: -120 },
    "72": { bottom: 450, right: -90 },
    "70": { bottom: 440, right: -45 },
    "63": { bottom: 420, right: -30 },
    "60": { bottom: 420, right: -20 },
    "57": { bottom: 400, right: 10 },
    "50": { bottom: 380, right: 35 },
    "45": { bottom: 350, right: 45 },
    "40": { bottom: 320, right: 70 },
    "30": { bottom: 270, right: 95 },
    "25": { bottom: 240, right: 105 },
    "20": { bottom: 220, right: 140 },
    "10": { bottom: 140, right: 165 },
  },
  altura10: {
    "75": { bottom: 350, right: -135 },
    "70": { bottom: 340, right: -90 },
    "64": { bottom: 340, right: -100 },
    "60": { bottom: 300, right: -45 },
    "50": { bottom: 280, right: -20 },
    "40": { bottom: 250, right: -50 },
    "30": { bottom: 210, right: -30 },
    "20": { bottom: 170, right: -5 },
    "10": { bottom: 130, right: 20 },
  },
};

// Mapeo de las dimensiones del brazo por altura
const armDimensionsMap = {
  altura33: { width: 1680, height: 25 },
  altura26: { width: 1450, height: 25 },
  altura24: { width: 1150, height: 25 },
  altura19: { width: 960, height: 25 },
  altura15: { width: 730, height: 25 },
  altura10: { width: 520, height: 25 },
};

const PlumaGrua = ({ alturaType = 'altura10', inclinacion: propInclinacion = 75, radioTrabajoMaximo }) => {
  let currentInclinacion = propInclinacion;

  // Determinar la inclinación basada en el radio de trabajo máximo SÓLO para altura33
  if (alturaType === 'altura33' && radioTrabajoMaximo) {
    const radio = String(Math.floor(parseFloat(radioTrabajoMaximo))); // Redondeamos hacia abajo para la búsqueda
    currentInclinacion = inclinacionMapAlturas[radio] || currentInclinacion; // Usamos el valor del mapa o el valor por defecto
  }

  const angleKey = String(currentInclinacion);
  const containerStyle =
    (containerDimensionsMap[alturaType] && containerDimensionsMap[alturaType][angleKey]) ||
    {};
  const armDimensions = armDimensionsMap[alturaType] || { width: 0, height: 0 };

  return (
    <View style={[styles.container, containerStyle, { transform: [{ rotate: `${currentInclinacion}deg` }] }]}>
      {armDimensions.width ? (
        <StyledView
          width={armDimensions.width}
          height={armDimensions.height}
          backgroundColor="#ffcc00"
          borderWidth={1.1}
          borderColor="#000"
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 400,
    height: 100,
    alignItems: 'center',
  },
});

export default PlumaGrua;