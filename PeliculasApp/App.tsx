import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { Text, View } from 'react-native';
import { StackNavigator } from './src/navigation/StackNavigator';
import { FadeScreen } from './src/screens/FadeScreen';


const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
      {/* <FadeScreen/> */}
    </NavigationContainer>
  )
 
}

export default App;
