import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Movies } from '../interfaces/movieInterface'

interface Props{
    movie:Movies;
    height?:number;
    width?:number;
}

export const MoviePoster = ({movie,height=400,width=200}:Props) => {
  console.log(movie.poster_path);
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  return (
    <View
        style={{ 
            width,
            height,
            marginHorizontal:8
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
    </View>
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
