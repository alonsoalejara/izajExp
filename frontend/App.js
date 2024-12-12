import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import Screens from './src/screens/Screens.index';
import Header from './src/components/Header';

// Crear el Stack y Drawer Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* Drawer Navigator */}
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#dd0000',
              width: 240,
            },
            drawerLabelStyle: {
              color: 'white',
              fontSize: 16,
            },
            activeBackgroundColor: 'darkred',
            itemStyle: {
              marginVertical: 5,
            },
          }}
        >
          {/* Pantalla Home */}
          <Drawer.Screen 
            name="Home" 
            component={Screens.Home} 
            options={{
              headerShown: false,  // Home no tiene Header
            }} 
          />

          {/* Pantalla Login */}
          <Drawer.Screen 
            name="Login" 
            component={Screens.Login} 
            options={{
              headerShown: false,  // Login no tiene Header
            }} 
          />

          {/* Otras pantallas con Header */}
          <Drawer.Screen 
            name="AdminOptions" 
            component={Screens.AdminOptions}
            options={{
              header: () => <Header />  // Usa el Header con Drawer para AdminOptions
            }} 
          />
          <Drawer.Screen 
            name="SetupIzaje" 
            component={Screens.SetupIzaje}
            options={{
              header: () => <Header />  // Usa el Header con Drawer para SetupIzaje
            }} 
          />
          <Drawer.Screen 
            name="PlanIzaje" 
            component={Screens.PlanIzaje}
            options={{
              header: () => <Header />  // Usa el Header con Drawer para PlanIzaje
            }} 
          />
          <Drawer.Screen 
            name="GruaIzaje" 
            component={Screens.GruaIzaje}
            options={{
              header: () => <Header />  // Usa el Header con Drawer para GruaIzaje
            }} 
          />
        </Drawer.Navigator>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;