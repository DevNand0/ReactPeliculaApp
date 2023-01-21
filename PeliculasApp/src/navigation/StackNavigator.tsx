import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movies } from '../interfaces/movieInterface';

export type RootStackParams = {
  HomeScreen:undefined;
  DetailScreen:Movies;
}

const Stack = createStackNavigator();
export const StackNavigator = () => {
 return (
  <Stack.Navigator
    screenOptions={{ 
      headerShown:false,
      cardStyle:{
        
      }
     }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="DetailScreen" component={DetailScreen} />
  </Stack.Navigator>
 );
}
