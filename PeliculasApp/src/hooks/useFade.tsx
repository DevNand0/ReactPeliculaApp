import React, { useRef } from 'react'
import { Animated } from 'react-native';
export const useFade = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const fadeIn=(callback?:Function)=>{
      Animated.timing(
          opacity,{
              toValue:1,
              duration:1000,
              useNativeDriver:true
          }
      ).start(() => callback? callback(): null);
    }
    const fadeOut=(duration: number=300)=>{
      //opacity:1
      Animated.timing(
          opacity,{
              toValue:0,
              duration:duration,
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
