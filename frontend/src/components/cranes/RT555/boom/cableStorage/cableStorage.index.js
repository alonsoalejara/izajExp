import React from 'react';
import { View, StyleSheet } from 'react-native';
import GuardaCableado from './Guardacableado';
import RuedasPluma from './RuedasPluma';
import CableGrua from './CableGrua';

// Mapeo de posiciones para el almacenamiento del cable por altura e inclinación
const storagePositionsMap = {
  altura33: {
    "75": { bottom: 50, right: 60 },
    "74": { bottom: 55, right: 85 },
    "73": { bottom: 60, right: 95 },
    "72": { bottom: 65, right: 140 },
    "71": { bottom: 70, right: 180 },
    "69": { bottom: 100, right: 200 },
    "69": { bottom: 110, right: 220 },
    "68": { bottom: 120, right: 250 },
    "67": { bottom: 120, right: 250 },
    "66": { bottom: 140, right: 300 },
    "65": { bottom: 140, right: 300 },
    "64": { bottom: 160, right: 350 },
    "63": { bottom: 160, right: 350 },
    "62": { bottom: 180, right: 400 },
    "61": { bottom: 180, right: 400 },
    "60": { bottom: 220, right: 460 },
    "59": { bottom: 220, right: 460 },
    "58": { bottom: 240, right: 520 },
    "57": { bottom: 240, right: 520 },
    "56": { bottom: 270, right: 570 },
    "55": { bottom: 270, right: 570 },
    "54": { bottom: 310, right: 610 },
    "53": { bottom: 310, right: 610 },
    "52": { bottom: 310, right: 610 },
    "51": { bottom: 310, right: 610 },
    "50": { bottom: 380, right: 690 },
    "49": { bottom: 380, right: 690 },
    "48": { bottom: 420, right: 740 },
    "47": { bottom: 440, right: 760 },
    "46": { bottom: 440, right: 760 },
    "45": { bottom: 440, right: 760 },
    "44": { bottom: 440, right: 760 },
    "43": { bottom: 440, right: 760 },
    "42": { bottom: 540, right: 860 },
    "41": { bottom: 540, right: 860 },
    "40": { bottom: 540, right: 860 },
    "39": { bottom: 600, right: 920 },
    "38": { bottom: 600, right: 920 },
    "37": { bottom: 650, right: 950 },
    "36": { bottom: 650, right: 950 },
    "35": { bottom: 650, right: 950 },
    "34": { bottom: 650, right: 950 },
    "33": { bottom: 650, right: 950 },
    "32": { bottom: 770, right: 1030 },
    "31": { bottom: 770, right: 1030 },
    "30": { bottom: 770, right: 1030 },
    "29": { bottom: 770, right: 1030 },
    "28": { bottom: 870, right: 1080 },
    "27": { bottom: 870, right: 1080 },
    "26": { bottom: 870, right: 1080 },
    "25": { bottom: 870, right: 1080 },
    "24": { bottom: 870, right: 1080 },
    "23": { bottom: 870, right: 1080 },
    "22": { bottom: 1040, right: 1150 },
    "21": { bottom: 1040, right: 1150 },
    "20": { bottom: 1040, right: 1150 },
    "19": { bottom: 1040, right: 1150 },
    "18": { bottom: 1150, right: 1200 },
    "17": { bottom: 1150, right: 1200 },
    "16": { bottom: 1210, right: 1210 },
    "15": { bottom: 1210, right: 1210 },
    "14": { bottom: 1210, right: 1210 },
    "13": { bottom: 1210, right: 1210 },
    "12": { bottom: 1320, right: 1250 },
    "11": { bottom: 1320, right: 1250 },
    "10": { bottom: 1380, right: 1270 },
  },
  altura26: {
    "75": { bottom: 850, right: -30 },
    "70": { bottom: 840, right: 35 },
    "60": { bottom: 770, right: 155 },
    "50": { bottom: 670, right: 280 },
    "40": { bottom: 570, right: 375 },
    "30": { bottom: 470, right: 430 },
    "20": { bottom: 340, right: 500 },
    "10": { bottom: 210, right: 460 },
  },
  altura24: {
    "75": { bottom: 660, right: -60 },
    "70": { bottom: 650, right: 15 },
    "60": { bottom: 580, right: 135 },
    "50": { bottom: 530, right: 200 },
    "40": { bottom: 460, right: 255 },
    "30": { bottom: 370, right: 320 },
    "20": { bottom: 280, right: 335 },
    "10": { bottom: 190, right: 350 },
  },
  altura19: {
    "75": { bottom: 570, right: -90 },
    "70": { bottom: 560, right: -15 },
    "60": { bottom: 490, right: 70 },
    "50": { bottom: 440, right: 135 },
    "40": { bottom: 370, right: 190 },
    "30": { bottom: 320, right: 215 },
    "20": { bottom: 250, right: 200 },
    "10": { bottom: 170, right: 255 },
  },
  altura15: {
    "75": { bottom: 450, right: -120 },
    "70": { bottom: 440, right: -45 },
    "60": { bottom: 420, right: 20 },
    "50": { bottom: 380, right: 65 },
    "40": { bottom: 320, right: 110 },
    "30": { bottom: 260, right: 125 },
    "20": { bottom: 200, right: 140 },
    "10": { bottom: 140, right: 155 },
  },
  altura10: {
    "75": { bottom: 350, right: -135 },
    "70": { bottom: 340, right: -90 },
    "60": { bottom: 300, right: -45 },
    "50": { bottom: 280, right: -20 },
    "40": { bottom: 240, right: 5 },
    "30": { bottom: 200, right: 0 },
    "20": { bottom: 150, right: -5 },
    "10": { bottom: 100, right: 20 },
  },
};

const CableStorage = ({ alturaType = 'altura10', inclinacion = 75 }) => {
  const angleKey = String(inclinacion);
  const storagePosition =
    (storagePositionsMap[alturaType] && storagePositionsMap[alturaType][angleKey]) ||
    storagePositionsMap.altura10["75"]; // Usa la posición por defecto si no se encuentra

  const containerStyle = {
    top: storagePosition?.bottom,
    right: storagePosition?.right,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <GuardaCableado />
      <RuedasPluma />
      <CableGrua />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

export default CableStorage;