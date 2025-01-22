import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Screens from './src/screens/Screens.index';
import AdminTabNavigator from './src/navigation/AdminTabNavigator';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Stack Navigator */}
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: false,
        }}
      >
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
          name="AdminTabs"
          component={AdminTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCollabName"
          component={Screens.AddCollabName}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCollabData"
          component={Screens.AddCollabData}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCollabSpecial"
          component={Screens.AddCollabSpecial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCraneName"
          component={Screens.AddCraneName}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCraneWeight"
          component={Screens.AddCraneWeight}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddCraneData"
          component={Screens.AddCraneData}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tablas"
          component={Screens.Tablas}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
