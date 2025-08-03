// rigging.index.js
import React from 'react';
import { View } from 'react-native';
import AparejosGrua from "./AparejosGrua";

const Rigging = ({ alturaType = 'altura10', inclinacion = 75, radioTrabajoMaximo }) => {
  // Mapa de posiciones por altura e inclinación
  const riggingPositionMap = {
    altura10: {
      10: { top: -130, left: -505 },
      20: { top: -129, left: -463 },
      30: { top: -162, left: -412 },
      40: { top: -230, left: -370 },
      50: { top: -242, left: -345 },
      60: { top: -290, left: -290 },
      64: { top: -330, left: -225 },
      75: { top: -345, left: -133 },
    },
    altura15: {
      10: { top: -140, left: -765 },
      20: { top: -220, left: -715 },
      25: { top: -226, left: -660 },
      30: { top: -252, left: -620 },
      40: { top: -320, left: -564 },
      45: { top: -375, left: -515 },
      50: { top: -420, left: -480 },
      57: { top: -460, left: -406 },
      60: { top: -490, left: -374 },
      63: { top: -494, left: -335 },
      70: { top: -530, left: -292 },
      72: { top: -538, left: -225 },
      75: { top: -540, left: -175 },
    },
    altura19: {
      10: { top: -140, left: -947 },
      20: { top: -250, left: -873 },
      30: { top: -328, left: -848 },
      32: { top: -358, left: -805 },
      36: { top: -423, left: -765 },
      40: { top: -443, left: -725 },
      46: { top: -555, left: -656 },
      50: { top: -590, left: -620 },
      54: { top: -630, left: -560 },
      56: { top: -620, left: -510 },
      60: { top: -670, left: -482 },
      65: { top: -725, left: -410 },
      67: { top: -738, left: -370 },
      70: { top: -745, left: -340 },
      75: { top: -775, left: -225 },
    },
    altura24: {
      10: { top: -230, left: -1145 },
      20: { top: -300, left: -1090 },
      22: { top: -285, left: -1060 },
      30: { top: -433, left: -1015 },
      35: { top: -523, left: -935 },
      40: { top: -590, left: -885 },
      42: { top: -635, left: -838 },
      46: { top: -655, left: -795 },
      50: { top: -740, left: -755 },
      53: { top: -780, left: -700 },
      56: { top: -802, left: -652 },
      60: { top: -855, left: -581 },
      62: { top: -865, left: -555 },
      64: { top: -875, left: -510 },
      65: { top: -725, left: -410 },
      67: { top: -920, left: -473 },
      70: { top: -930, left: -400 },
      72: { top: -940, left: -363 },
      75: { top: -960, left: -298 },
    },
    altura26: {
      10: { top: -223, left: -1390 },
      20: { top: -350, left: -1408 },
      25: { top: -460, left: -1310 },
      30: { top: -590, left: -1250 },
      33: { top: -620, left: -1225 },
      37: { top: -720, left: -1185 },
      40: { top: -785, left: -1105 },
      43: { top: -825, left: -1045 },
      47: { top: -885, left: -995 },
      50: { top: -935, left: -925 },
      52: { top: -985, left: -905 },
      55: { top: -995, left: -832 },
      58: { top: -1060, left: -786 },
      60: { top: -1100, left: -731 },
      61: { top: -1140, left: -710 },
      63: { top: -1150, left: -640 },
      65: { top: -1160, left: -600 },
      68: { top: -1180, left: -533 },
      70: { top: -1190, left: -505 },
      73: { top: -1250, left: -413 },
      75: { top: -1260, left: -375 },
    },
    altura33: {
      10: { top: -270, left: -1640 },
      12: { top: -283, left: -1620 },
      16: { top: -313, left: -1580 },
      18: { top: -380, left: -1568 },
      22: { top: -490, left: -1520 },
      28: { top: -660, left: -1450 },
      32: { top: -760, left: -1400 },
      37: { top: -875, left: -1325 },
      39: { top: -935, left: -1285 },
      42: { top: -995, left: -1235 },
      44: { top: -1020, left: -1205 },
      47: { top: -1085, left: -1135 },
      48: { top: -1110, left: -1105 },
      50: { top: -1150, left: -1065 },
      54: { top: -1220, left: -980 },
      56: { top: -1270, left: -940 },
      58: { top: -1280, left: -890 },
      60: { top: -1290, left: -830 },
      62: { top: -1333, left: -772 },
      64: { top: -1363, left: -725 },
      66: { top: -1378, left: -672 },
      68: { top: -1398, left: -622 },
      69: { top: -1406, left: -592 },
      72: { top: -1450, left: -513 },
      75: { top: -1460, left: -433 },
    },
  };

  // Si hay radioTrabajoMaximo y altura33, ajustar inclinación según un mapa
  const inclinacionMapAlturas = {
    "6": 80,
    "8": 75,
    "10": 69,
    "12": 66,
    "14": 62,
  };

  let currentInclinacion = inclinacion;
  if (alturaType === 'altura33' && radioTrabajoMaximo) {
    const radioKey = String(Math.floor(parseFloat(radioTrabajoMaximo)));
    currentInclinacion = inclinacionMapAlturas[radioKey] || inclinacion;
  }

  const position =
    riggingPositionMap[alturaType]?.[currentInclinacion] || { top: -340, left: -133 };

  const containerWidth = 50;
  const containerHeight = 55;

  return (
    <View style={{ position: 'absolute', top: position.top, left: position.left }}>
      <AparejosGrua containerWidth={containerWidth} containerHeight={containerHeight} />
    </View>
  );
};

export default Rigging;
