import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function GanchoGrua() {
  return (
    <View style={styles.container}>
      {/* Parte superior (polea) */}
      <View style={styles.polea} />

      {/* Gancho */}
      <View style={styles.gancho}>
        <View style={styles.ganchoParte1} />
        <View style={styles.ganchoParte2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
