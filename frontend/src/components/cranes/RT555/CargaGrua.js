import React from 'react';
import { View } from 'react-native';

const cargaPositionMap = {
  altura10: {
    10: { top: 50, left: -515 },
    20: { top: -30, left: -472 },
    30: { top: -112, left: -420 },
    40: { top: -180, left: -380 },
    50: { top: -242, left: -355 },
    60: { top: -290, left: -299 },
    64: { top: -330, left: -235 },
    75: { top: -345, left: -142 },
  },
  altura15: {
    10: { top: 18, left: -775 },
    20: { top: -120, left: -725 },
    25: { top: -170, left: -670 },
    30: { top: -223, left: -628 },
    40: { top: -320, left: -575 },
    45: { top: -375, left: -525 },
    50: { top: -422, left: -489 },
    57: { top: -460, left: -414 },
    60: { top: -490, left: -383 },
    63: { top: -495, left: -345 },
    70: { top: -530, left: -302 },
    72: { top: -540, left: -235 },
    75: { top: -540, left: -185 },
  },
  altura19: {
    10: { top: -25, left: -955 },
    20: { top: -200, left: -880 },
    30: { top: -328, left: -857 },
    32: { top: -358, left: -815 },
    36: { top: -423, left: -775 },
    40: { top: -443, left: -735 },
    46: { top: -555, left: -666 },
    50: { top: -590, left: -628 },
    54: { top: -630, left: -570 },
    56: { top: -620, left: -516 },
    60: { top: -670, left: -490 },
    65: { top: -725, left: -418 },
    67: { top: -740, left: -378 },
    70: { top: -745, left: -348 },
    75: { top: -775, left: -233 },
  },
  altura24: {
    10: { top: -83, left: -1155 },
    20: { top: -256, left: -1100 },
    22: { top: -285, left: -1070 },
    30: { top: -433, left: -1025 },
    35: { top: -523, left: -945 },
    40: { top: -590, left: -892 },
    42: { top: -635, left: -845 },
    46: { top: -655, left: -805 },
    50: { top: -740, left: -765 },
    53: { top: -780, left: -711 },
    56: { top: -802, left: -662 },
    60: { top: -855, left: -590 },
    62: { top: -865, left: -563 },
    64: { top: -875, left: -518 },
    65: { top: -725, left: -418 },
    67: { top: -920, left: -483 },
    70: { top: -930, left: -410 },
    72: { top: -940, left: -372 },
    75: { top: -960, left: -310 },
  },
  altura26: {
    10: { top: -123, left: -1399 },
    20: { top: -350, left: -1414 },
    25: { top: -460, left: -1320 },
    30: { top: -590, left: -1260 },
    33: { top: -620, left: -1235 },
    37: { top: -720, left: -1195 },
    40: { top: -785, left: -1110 },
    43: { top: -825, left: -1055 },
    47: { top: -885, left: -1000 },
    50: { top: -935, left: -935 },
    52: { top: -985, left: -910 },
    55: { top: -995, left: -840 },
    58: { top: -1060, left: -793 },
    60: { top: -1100, left: -740 },
    61: { top: -1140, left: -720 },
    63: { top: -1150, left: -650 },
    65: { top: -1160, left: -610 },
    68: { top: -1180, left: -543 },
    70: { top: -1190, left: -514 },
    73: { top: -1250, left: -423 },
    75: { top: -1260, left: -385 },
  },
  altura33: {
    10: { top: -150, left: -1647 },
    12: { top: -213, left: -1625 },
    16: { top: -320, left: -1590 },
    18: { top: -380, left: -1578 },
    22: { top: -490, left: -1530 },
    28: { top: -660, left: -1458 },
    32: { top: -760, left: -1405 },
    37: { top: -875, left: -1330 },
    39: { top: -935, left: -1290 },
    42: { top: -995, left: -1245 },
    44: { top: -1020, left: -1215 },
    47: { top: -1085, left: -1143 },
    48: { top: -1110, left: -1115 },
    50: { top: -1150, left: -1075 },
    54: { top: -1220, left: -988 },
    56: { top: -1270, left: -950 },
    58: { top: -1280, left: -900 },
    60: { top: -1290, left: -835 },
    62: { top: -1333, left: -782 },
    64: { top: -1365, left: -735 },
    66: { top: -1378, left: -682 },
    68: { top: -1400, left: -630 },
    69: { top: -1400, left: -603 },
    72: { top: -1455, left: -523 },
    75: { top: -1460, left: -443 },
  },
};

export default function CargaGrua({
  alturaType = 'altura10',
  inclinacion = 75,
}) {
  const position = cargaPositionMap?.[alturaType]?.[inclinacion] || { top: -340, left: -143 };

  return (
    <View style={[{ position: 'absolute' }, position]}>
      {/* Cuadrado gris */}
      <View
        style={{
          position: 'absolute',
          width: 70,
          height: 70,
          backgroundColor: '#888',
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Círculo transparente */}
        <View
          style={{
            position: 'absolute',
            bottom: 5,
            width: 100,
            height: 100,
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderRadius: 100,
          }}
        />
      </View>
    </View>
  );
}
