import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Movies } from '../interfaces/movieInterface';
import { RootStackParams } from '../navigation/StackNavigator';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;//obtener el alto de una pantalla
interface Props extends StackScreenProps<RootStackParams,'DetailScreen'>{}
//<Type de StackNavigator, 'NombreVistaEnNavigator'>
export const DetailScreen = ({route}:Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
          <Image 
              source={{ 
                  uri:uri
              }}
              style={styles.image} 
          />
      </View>
      <View
        style={styles.marginContainer}
      >
          <Text style={styles.subTitle}>{movie.original_title}</Text>
          <Text style={styles.title}>{movie.title}</Text>
      </View>
      <View style={{ marginTop:0 }}>
        {/* 
        <Icon 
          name="star-outline"
          color="gray"
          size={20}
        />
        */}
{
  isLoading? <ActivityIndicator size={35} color="gray" style={{ marginTop:20 }}/> : <MovieDetails movieFull={movieFull!} cast={cast} />
}
        

      </View>
      {/* BOTON DE NAVEGACION PARA VOLVER */}
      <TouchableOpacity 
      style={styles.backButton}
      onPress={()=>navigation.goBack()}
      >
          <Icon 
          color="white"
          name="arrow-back-outline"
          size={50}
          
          />
      </TouchableOpacity>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image:{
      flex:1,//toma el tamano obtenido por la etiqueta padre
      //en este ejemplo es la etiqueta View
      borderRadius:18,
  },
  imageContainer:{
      width:'100%',
      height:screenHeight*0.6,//es la variable declarada arriba
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 10,
      },
      shadowOpacity: 0.24,
      shadowRadius: 3.84,

      elevation: 12,
      borderBottomEndRadius:25,
      borderBottomStartRadius:25,
  },
  imageBorder:{
    flex:1,
    overflow:'hidden',
    borderBottomEndRadius:25,
    borderBottomStartRadius:25,
  },
  marginContainer:{
    marginHorizontal:20,
    marginTop:20
  },
  subTitle:{
    fontSize:16,
    opacity:0.8
  },
  title:{
    fontSize:20,
    fontWeight:'bold'
  },
  //BOTON VOLVER PARA DISPOSITIVOS MOVILES
  backButton:{
    position:'absolute',//SE POSICIONA EN LA PARTE SUPERIOR DE TODO
    zINdex:999,
    elevation:9,
    top:30,
    left:5,
  }
});
