import React from 'react'
import { Image, FlatList, Text, View } from 'react-native'
import { MoviePoster } from '../components/MoviePoster';
import { Movies } from '../interfaces/movieInterface';
interface Props {
    title?:string;
    movies:Movies[]
}

export const HorizontalSlider = ({title="",movies}:Props) => {
  return (
    
    <View style={{ height:(title)? 280 : 250 }}>
    {/* CAROUSEL PELICULAS FLAT LIST */}
        {
            title && <Text style={{ fontSize:30, fontWeight:'bold' }}> {title} </Text>
        }
        <FlatList 
            data={movies}
            renderItem= {({item}:any)=>(
                            <MoviePoster movie={item} width={110} height={200} />
                        )}
            keyExtractor={(item)=>item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    </View>
  )
}
