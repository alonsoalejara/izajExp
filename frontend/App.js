import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import Home from './src/screens/Home'; 
import Login from './src/screens/Login';
import SetupIzaje from './src/screens/SetupIzaje';
import PlanIzaje from './src/screens/PlanIzaje';
import GruaIzaje from './src/screens/GruaIzaje';
import AdminOptions from './src/screens/AdminOptions';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen 
            name="AdminOptions" 
            component={AdminOptions}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SetupIzaje" 
            component={SetupIzaje}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="PlanIzaje" 
            component={PlanIzaje}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="GruaIzaje" 
            component={GruaIzaje}
            options={{ headerShown: false }} 
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
