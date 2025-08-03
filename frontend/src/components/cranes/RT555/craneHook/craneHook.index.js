import React from 'react';
import { View } from 'react-native';
import BaseGancho from './BaseGancho';
import Gancho from './Gancho';

const hookPositionMap = {
  altura10: {
    10: { bottom: 90, left: -402 },
    20: { bottom: 90, left: -359 },
    30: { bottom: 122, left: -308 },
    40: { bottom: 190, left: -266 },
    50: { bottom: 202, left: -242 },
    60: { bottom: 250, left: -187 },
    64: { bottom: 290, left: -123 },
    75: { bottom: 304, left: -28 },
  },
  altura15: {
    10: { bottom: 100, left: -662 },
    20: { bottom: 180, left: -613 },
    25: { bottom: 190, left: -558 },
    30: { bottom: 210, left: -518 },
    40: { bottom: 280, left: -460 },
    45: { bottom: 335, left: -412 },
    50: { bottom: 380, left: -377 },
    57: { bottom: 420, left: -303 },
    60: { bottom: 450, left: -272 },
    63: { bottom: 455, left: -233 },
    70: { bottom: 490, left: -188 },
    72: { bottom: 500, left: -122 },
    75: { bottom: 500, left: -73 },
  },
  altura19: {
    10: { bottom: 100, left: -845 },
    20: { bottom: 205, left: -770 },
    30: { bottom: 290, left: -745 },
    32: { bottom: 320, left: -703 },
    36: { bottom: 380, left: -663 },
    40: { bottom: 405, left: -620 },
    46: { bottom: 515, left: -555 },
    50: { bottom: 550, left: -515 },
    54: { bottom: 590, left: -457 },
    56: { bottom: 580, left: -408 },
    60: { bottom: 630, left: -380 },
    65: { bottom: 685, left: -305 },
    67: { bottom: 700, left: -267 },
    70: { bottom: 706, left: -240 },
    75: { bottom: 738, left: -122 },
  },
  altura24: {
    10: { bottom: 190, left: -1042 },
    20: { bottom: 265, left: -985 },
    22: { bottom: 245, left: -955 },
    30: { bottom: 390, left: -912 },
    35: { bottom: 480, left: -833 },
    40: { bottom: 545, left: -780 },
    42: { bottom: 595, left: -735 },
    46: { bottom: 615, left: -695 },
    50: { bottom: 695, left: -652 },
    53: { bottom: 740, left: -600 },
    56: { bottom: 760, left: -550 },
    60: { bottom: 810, left: -480 },
    62: { bottom: 828, left: -450 },
    64: { bottom: 838, left: -410 },
    65: { bottom: 685, left: -305 },
    67: { bottom: 880, left: -370 },
    70: { bottom: 890, left: -297 },
    72: { bottom: 900, left: -260 },
    75: { bottom: 920, left: -195 },
  },
  altura26: {
    10: { bottom: 180, left: -1290 },
    20: { bottom: 310, left: -1305 },
    25: { bottom: 420, left: -1210 },
    30: { bottom: 550, left: -1150 },
    33: { bottom: 580, left: -1123 },
    37: { bottom: 680, left: -1083 },
    40: { bottom: 745, left: -1006 },
    43: { bottom: 785, left: -945 },
    47: { bottom: 840, left: -895 },
    50: { bottom: 895, left: -820 },
    52: { bottom: 945, left: -805 },
    55: { bottom: 960, left: -730 },
    58: { bottom: 1020, left: -685 },
    60: { bottom: 1060, left: -630 },
    61: { bottom: 1100, left: -610 },
    63: { bottom: 1110, left: -540 },
    65: { bottom: 1120, left: -500 },
    68: { bottom: 1140, left: -430 },
    70: { bottom: 1150, left: -402 },
    73: { bottom: 1210, left: -310 },
    75: { bottom: 1220, left: -273 },
  },
  altura33: {
    10: { bottom: 230, left: -1540 },
    12: { bottom: 250, left: -1520 },
    16: { bottom: 270, left: -1480 },
    18: { bottom: 340, left: -1470 },
    22: { bottom: 450, left: -1420 },
    28: { bottom: 620, left: -1350 },
    32: { bottom: 720, left: -1303 },
    37: { bottom: 830, left: -1223 },
    39: { bottom: 890, left: -1186 },
    42: { bottom: 950, left: -1135 },
    44: { bottom: 980, left: -1105 },
    47: { bottom: 1045, left: -1035 },
    48: { bottom: 1070, left: -1010 },
    50: { bottom: 1105, left: -965 },
    54: { bottom: 1175, left: -880 },
    56: { bottom: 1220, left: -840 },
    58: { bottom: 1240, left: -790 },
    60: { bottom: 1260, left: -730 },
    62: { bottom: 1298, left: -672 },
    64: { bottom: 1318, left: -622 },
    66: { bottom: 1340, left: -570 },
    68: { bottom: 1360, left: -520 },
    69: { bottom: 1370, left: -490 },
    72: { bottom: 1410, left: -413 },
    75: { bottom: 1426, left: -333 },
  },
};

const CraneHook = ({
  alturaType = 'altura10',
  inclinacion = 75,
}) => {
  const position = hookPositionMap?.[alturaType]?.[inclinacion] || { bottom: 301, left: -28 };

  return (
    <View style={[{ position: 'absolute' }, position]}>
      <BaseGancho
        position={{ bottom: 11, left: -5 }}
        containerWidth={30}
        containerHeight={30}
        color="black"
      />

      <BaseGancho
        position={{ bottom: 13, left: -7 }}
        containerWidth={25}
        containerHeight={25}
        color="orange"
      />

      <Gancho
        position={{ bottom: -16, left: -7 }}
        containerWidth={25}
        containerHeight={30}
        color="orange"
      />
    </View>
  );
};

export default CraneHook;
