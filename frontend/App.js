import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import Screens from './src/screens/Screens.index';
import Header from './src/components/Header';  // Asegúrate de ajustar la ruta al Header

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          {/* Pantalla Home sin Header */}
          <Stack.Screen 
            name="Home" 
            component={Screens.Home} 
            options={{ headerShown: false }} 
          />

          {/* Pantalla Login sin Header */}
          <Stack.Screen 
            name="Login" 
            component={Screens.Login} 
            options={{ headerShown: false }}  
          />

          {/* Otras pantallas con Header */}
          <Stack.Screen 
            name="AdminOptions" 
            component={Screens.AdminOptions}
            options={{ header: () => <Header /> }} 
          />
          <Stack.Screen 
            name="SetupIzaje" 
            component={Screens.SetupIzaje}
            options={{ header: () => <Header /> }} 
          />
          <Stack.Screen 
            name="Tablas" 
            component={Screens.Tablas}
            options={{ header: () => <Header /> }} 
          />
          <Stack.Screen 
            name="PlanIzaje" 
            component={Screens.PlanIzaje}
            options={{ header: () => <Header /> }} 
          />
          <Stack.Screen 
            name="GruaIzaje" 
            component={Screens.GruaIzaje}
            options={{ header: () => <Header /> }} 
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});