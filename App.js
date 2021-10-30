import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home'
import PropertyList from './Screens/PropertyList';
import CreateProperty from './Screens/CreateProperty';
import Detail from './Screens/Detail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{
          title: 'HappyHouse',
        }} />
        <Stack.Screen name="Create" component={CreateProperty} />
        <Stack.Screen name="List" component={PropertyList} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
