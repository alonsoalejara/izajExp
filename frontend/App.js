import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';

import Screens from './src/screens/Screens.index';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Screens.Home} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Login" 
            component={Screens.Login} 
            options={{ headerShown: false }}  
          />
          <Stack.Screen 
            name="AdminOptions" 
            component={Screens.AdminOptions}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="SetupIzaje" 
            component={Screens.SetupIzaje}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="PlanIzaje" 
            component={Screens.PlanIzaje}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="GruaIzaje" 
            component={Screens.GruaIzaje}
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