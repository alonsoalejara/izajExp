import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={() => navigation.openDrawer()} // Abre el menú drawer
        style={styles.icon}
      />
      <Text style={styles.headerText}></Text>
      
      {/* Logo de la app */}
      <Image
        source={require('../../../assets/EI-Montajes.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 2,
    shadowRadius: 20,
    elevation: 20,
  },
  icon: {
    marginTop: 20,
    color: "#ee0000",
  },
  logo: {
    marginLeft: 100,
    marginTop: 15,
    width: 140,
    height: 100,
  },
  headerText: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: "#ee0000",
    letterSpacing: 1,
  },
});