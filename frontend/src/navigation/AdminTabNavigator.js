import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AdminPanel from '../screens/AdminPanel';
import SetupIzaje from '../screens/SetupIzaje';
import AdminProfile from '../screens/AdminProfile';

const Tab = createBottomTabNavigator();

function AdminTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'User') {
            iconName = 'account-circle';
          } else if (route.name === 'Home') {
            iconName = 'list-alt';
          } else if (route.name === 'Settings') {
            iconName = 'content-paste-go';
          }
          const iconSize = 28;
          return <Icon name={iconName} size={iconSize} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 15,
          paddingTop: 12,
          justifyContent: 'center',
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      {/* Pestaña de Usuario */}
      <Tab.Screen
        name="User"
        component={AdminProfile}
      />
      
      {/* Pestaña de AdminPanel */}
      <Tab.Screen
        name="Home"
        component={AdminPanel}
        options={{ headerShown: false }}
      />
      
      {/* Pestaña de Configuración */}
      <Tab.Screen
        name="Settings"
        component={SetupIzaje}
      />
    </Tab.Navigator>
  );
}

export default AdminTabNavigator;
