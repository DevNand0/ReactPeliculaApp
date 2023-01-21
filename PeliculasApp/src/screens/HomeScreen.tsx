import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { Text, View, Button, ActivityIndicator, Dimensions, FlatList, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';//LIBRERIA DEL CAROUSEL
import { HorizontalSlider } from '../components/HorizontalSlider';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';


const windowWidth = Dimensions.get("window").width;

export const HomeScreen = () => {
  const {nowPlaying,popular, topRated, upcoming,isLoading} = useMovies();
  const {top} = useSafeAreaInsets();
  
  const navigation = useNavigation();

  if(isLoading){
    return (
      <View style={{ flex:1, justifyContent:'center', alignContent:'center' }}>
        <ActivityIndicator color="red" size={100} />
        {/* etiqueta ActivityIndicator muestra una animacion de cargando */}
        
      </View>
    )
  }
  return (
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
          />
        </View>

        {/* FlatList Horizontal desde Componente Creado */}
        <HorizontalSlider title="Populares" movies={popular}/>
        <HorizontalSlider title="Lo mas TOP" movies={topRated}/>
        <HorizontalSlider title="Lo que se viene" movies={upcoming}/>
      </View>
    </ScrollView>
  )
}
