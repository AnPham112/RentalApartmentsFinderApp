import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from './Screens/Home'
import PropertyList from './Screens/PropertyList';
import CreateProperty from './Screens/CreateProperty';
import Profile from './Screens/Profile';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: '#313234',
          tabBarActiveTintColor: '#ff010b',
          tabBarStyle: {
            height: 64,
          }
        }}
      >
        <Tab.Screen name="Home" component={Home}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome name='home' size={25} color={color} />
          }}
        />
        <Tab.Screen name="Create" component={CreateProperty}
          options={{
            tabBarIcon: ({ color }) => (<FontAwesome name='plus' size={30} color={color} />),
          }}
        />
        <Tab.Screen name="List" component={PropertyList}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome name='th-list' size={25} color={color} />
          }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome name='info-circle' size={25} color={color} />
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              // Prevent default action
              e.preventDefault();
              // Do something with the `navigation` object
              navigation.navigate('List');
            },
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
