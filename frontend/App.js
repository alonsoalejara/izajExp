import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Screens from './src/screens/Screens.index';
import AddScreens from './src/screens/add/Add.index';
import TabNavigator from './src/navigation/TabNavigator';
import toastConfig from './src/utils/toastConfig';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
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
            name="Tabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCollabName"
            component={AddScreens.AddCollabName}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCollabData"
            component={AddScreens.AddCollabData}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCollabSpecial"
            component={AddScreens.AddCollabSpecial}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCraneName"
            component={AddScreens.AddCraneName}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCraneWeight"
            component={AddScreens.AddCraneWeight}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCraneData"
            component={AddScreens.AddCraneData}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SetupAparejos"
            component={Screens.SetupAparejos}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SetupCarga"
            component={Screens.SetupCarga}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SetupGrua"
            component={Screens.SetupGrua}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tablas"
            component={Screens.Tablas}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Firma"
            component={Screens.Firma}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlanesFirmados"
            component={Screens.PlanesFirmados}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CollabProfile"
            component={Screens.CollabProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CollabTablas"
            component={Screens.CollabTablas}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditCollab"
            component={Screens.EditCollab}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditPlan"
            component={Screens.EditPlan}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditCarga"
            component={Screens.EditCarga}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditGrua"
            component={Screens.EditGrua}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;