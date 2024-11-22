import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import SetupIzaje from './SetupIzaje';
import PlanIzaje from './PlanIzaje';
import GruaIzaje from './GruaIzaje';
import Login from './Login';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="SetupIzaje">
      <Drawer.Screen 
        name="Home" 
        component={Home}
        options={{ drawerLabel: 'Inicio' }} 
      />
      <Drawer.Screen 
        name="Login" 
        component={Login} 
        options={{ drawerLabel: 'Iniciar Sesión' }}
      />
      <Drawer.Screen 
        name="SetupIzaje" 
        component={SetupIzaje} 
        options={{ drawerLabel: 'Configuración Izaje' }}
      />
      <Drawer.Screen 
        name="PlanIzaje" 
        component={PlanIzaje} 
        options={{ drawerLabel: 'Plan de Izaje' }}
      />
      <Drawer.Screen 
        name="GruaIzaje" 
        component={GruaIzaje} 
        options={{ drawerLabel: 'Grúa de Izaje' }}
      />
    </Drawer.Navigator>
  );
}
