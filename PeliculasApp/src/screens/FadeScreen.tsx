import React, { useRef } from 'react'
import { Animated, View, Button } from 'react-native';
import { useEffect } from 'react';
import { useFade } from '../hooks/useFade';

export const FadeScreen = () => {
  const {opacity,fadeIn,fadeOut} = useFade()
  return (
    <View style={{ 
        flex:1, 
        backgroundColor:'grey' ,
        justifyContent:'center',
        alignItems:'center'
        }}>
        <Animated.View style={{ 
            backgroundColor:'#084F6A',
            width:150,
            height:150,
            opacity:opacity
         }}/>
         <Button title="FADEIN" onPress={fadeIn}/>
         <Button title="FADEOUT" onPress={fadeOut}/>
    </View>
  )
}
