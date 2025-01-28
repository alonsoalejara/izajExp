import React from 'react';
import { View, Text } from 'react-native';

const toastConfig = {
  success: ({ text1, text2 }) => (
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -86 }, { translateY: 345 }],
        paddingVertical: 20,
        padding: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 8,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{text1}</Text>
      {text2 ? <Text style={{ fontSize: 14, color: '#fff' }}>{text2}</Text> : null}
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -110 }, { translateY: 345 }],
        paddingVertical: 20,
        padding: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 8,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>{text1}</Text>
      {text2 ? <Text style={{ fontSize: 14, color: '#fff' }}>{text2}</Text> : null}
    </View>
  ),
};

export default toastConfig;