import React, { useRef } from 'react'
import { Animated } from 'react-native';
export const useFade = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const fadeIn=()=>{
      Animated.timing(
          opacity,{
              toValue:1,
              duration:1000,
              useNativeDriver:true
          }
      ).start();
    }
    const fadeOut=()=>{
      //opacity:1
      Animated.timing(
          opacity,{
              toValue:0,
              duration:1000,
              useNativeDriver:true
          }
      ).start();
    }
  return {
    opacity:opacity,
    fadeIn:fadeIn,
    fadeOut:fadeOut
  }
}