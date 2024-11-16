import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/Home'; 
import LoginScreen from './src/screens/Login';
import PlanIzajeScreen from './src/screens/PlanIzaje';
import SetupIzajeScreen from './src/screens/SetupIzaje';
import GruaIzajeScreen from './src/screens/GruaIzaje';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}  // Oculta el encabezado
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen 
          name="SetupIzaje" 
          component={SetupIzajeScreen} 
          options={{ title: 'Cálculo Maniobras Menores' }}
        />
        <Stack.Screen 
          name="PlanIzaje" 
          component={PlanIzajeScreen} 
          options={{ title: 'Plan de Izaje' }}
        />
        <Stack.Screen 
          name="GruaIzaje" 
          component={GruaIzajeScreen} 
          options={{ headerShown: false }}  // Oculta el encabezado
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}