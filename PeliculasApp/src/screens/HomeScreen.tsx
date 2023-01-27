import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { Text, View, Button, ActivityIndicator, Dimensions, FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';//LIBRERIA DEL CAROUSEL
import { GradientBackground } from '../components/GradientBackground';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import ImageColors from 'react-native-image-colors'
import {getImageColors} from '../helpers/helpers';
import { GradientContext } from '../context/GradientContext';

const windowWidth = Dimensions.get("window").width;

export const HomeScreen = () => {
  const {nowPlaying,popular, topRated, upcoming,isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  const {setMainColors} = useContext(GradientContext); 


  const getPosterColors = async(index:number)=>{
       const movie = nowPlaying[index];
       const url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
       const [primary="green",secondary="orange"] = await getImageColors(url);
       console.log(primary,secondary);
       setMainColors({primary,secondary}); 
  }

  //SE DISPARA AL INICIO, 
  useEffect(()=>{
    if(nowPlaying.length>0){
      getPosterColors(0);
    }
  },[nowPlaying]);//DEBE CONSIDERAR EL PRIMER ELEMENTO DE ESTE OBJETO PARA TOMAR LOS COLORES


  if(isLoading){
    return (
      <View style={{ flex:1, justifyContent:'center', alignContent:'center' }}>
        <ActivityIndicator color="red" size={100} />
        {/* etiqueta ActivityIndicator muestra una animacion de cargando */}
        
      </View>
    )
  }
  return (
    <GradientBackground>
      <ScrollView>
      <View style={{ marginTop:top+20 }}>
        
        {/* CAROUSEL PRINCIPAL */}
        <View style={{ height:440 }}>
          <Carousel 
              data={nowPlaying} 
              renderItem={({item}:any)=> <MoviePoster movie={item} /> }
              sliderWidth={windowWidth}
              itemWidth={200}
              inactiveSlideOpacity={0.9}
              onSnapToItem={ index=>getPosterColors(index)}
          />
        </View>

        {/* FlatList Horizontal desde Componente Creado */}
        <HorizontalSlider title="Populares" movies={popular}/>
        <HorizontalSlider title="Lo mas TOP" movies={topRated}/>
        <HorizontalSlider title="Lo que se viene" movies={upcoming}/>
      </View>
    </ScrollView>
    </GradientBackground>
  )
}
