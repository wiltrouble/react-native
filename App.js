import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import { UsersList } from './screens/UsersList';
import { CreateUser } from './screens/CreateUser';
import { UserDetails } from './screens/UserDetails';
import { Menu } from './screens/Menu';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Menu' component={Menu}></Stack.Screen>
      <Stack.Screen name='UsersList' component={UsersList}></Stack.Screen>
      <Stack.Screen name='CreateUser' component={CreateUser}></Stack.Screen>      
      <Stack.Screen name='UserDetails' component={UserDetails}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
