import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';

import Screens from './src/screens/Screens.index';
import Header from './src/components/Header';

// Crear el Stack y Drawer Navigators
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* Drawer Navigator */}
        <Drawer.Navigator
          initialRouteName="SetupIzaje"  // Define la pantalla inicial
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
          {/* Pantalla SetupIzaje */}
          <Drawer.Screen 
            name="SetupIzaje" 
            component={Screens.SetupIzaje}
            options={{
              header: () => <Header />  // Usa el Header con Drawer para SetupIzaje
            }} 
          />
          
          {/* Pantalla Tablas */}
          <Drawer.Screen 
            name="Tablas" 
            component={Screens.Tablas}
            options={{
              header: () => <Header />  // Usa el Header con Drawer para Tablas
            }} 
          />
          
          {/* Pantalla GruaIzaje */}
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
