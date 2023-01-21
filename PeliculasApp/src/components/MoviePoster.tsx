import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Movies } from '../interfaces/movieInterface'
import { useNavigation } from '@react-navigation/core';

interface Props{
    movie:Movies;
    height?:number;
    width?:number;
}

export const MoviePoster = ({movie,height=400,width=200}:Props) => {
  console.log(movie.poster_path);
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const navigation = useNavigation();//esto es declarar una navegacion y se le puede pasar parametros a cada navegacion
  return (
    /* TouchableOpacity para que el elemento del poster en la vista principal tenga efecto de tocado */
    <TouchableOpacity
        onPress={ () => navigation.navigate('DetailScreen', movie) }/* el parametro que va en navigate es el nombre dado a la navegacion no a la vista */
        activeOpacity={0.8}
        style={{ 
            width,
            height,
            marginHorizontal:2,
            paddingBottom:20,
            paddingHorizontal:5
         }}
    >
        <View style={styles.imageBorderedContainer}>
            <Image 
                source={{ 
                    uri:uri
                }}
                style={styles.image} 
            />
        </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    image:{
        flex:1,//toma el tamano obtenido por la etiqueta padre
        //en este ejemplo es la etiqueta View
        borderRadius:18,
    },
    imageBorderedContainer:{
        flex:1,
        borderRadius:18,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 3.84,

        elevation: 12,
    }
});
