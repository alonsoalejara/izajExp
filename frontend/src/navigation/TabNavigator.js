import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminPanel from '../screens/AdminPanel';
import SetupIzaje from '../screens/SetupIzaje';
import Profile from '../screens/Profile';
import { ActivityIndicator, View } from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const [userRoles, setUserRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const rolesString = await AsyncStorage.getItem('roles');

        if (rolesString) {
          const rolesArray = JSON.parse(rolesString);
          setUserRoles(rolesArray.map(role => role.trim().toLowerCase()));
        }
      } catch (error) {
        console.error('Error obteniendo los roles del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

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
          return <Icon name={iconName} size={28} color={color} />;
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
        tabBarInactiveTintColor: '#ddd',
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="User" component={Profile} />
      
      {userRoles.includes('admin') ? (
        <Tab.Screen name="Home" component={AdminPanel} options={{ headerShown: false }} />
      ) : (
        console.log('Acceso denegado a AdminPanel. Roles actuales:', userRoles)
      )}
      
      <Tab.Screen name="Settings" component={SetupIzaje} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
