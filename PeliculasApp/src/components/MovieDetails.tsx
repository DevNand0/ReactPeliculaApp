import React from 'react'
import { Text, View, FlatList } from 'react-native';
import { Cast } from '../interfaces/creditsInterface';
import { MovieFull } from '../interfaces/movieInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';
interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}
export const MovieDetails = ({movieFull, cast}:Props) => {
  return (
    <>
    {/* Detalles */}
        <View style={{ marginHorizontal:20 }}>
            <View style={{ flexDirection:'row' }}> 
                <Icon 
                name="star-outline"
                color="gray"
                size={20}
                />
                <Text style={{ marginLeft:7 }} >{movieFull.vote_average}</Text>
                <Text style={{ marginLeft:5 }}>
                    - { movieFull.genres.map(g=>g.name).join(', ') }
                </Text>
            </View>
            {/* Historia */}
            <Text style={{ fontSize:23, marginTop:10, fontWeight:'bold' }}> 
                Historia
            </Text>
            <Text style={{ fontSize:16 }}>
                {movieFull.overview}
            </Text>
            {/* Presupuesto */}
            <Text style={{ fontSize:23, marginTop:10, fontWeight:'bold' }}> 
                Presupuesto
            </Text>
            <Text style={{ fontSize:16 }}>
                { currencyFormatter.format(movieFull.budget,{code:'USD'}) }
            </Text>
            
        </View>
        {/* CASTING */}
        <View style={{ marginTop:10, marginBottom:100 }}>
            <Text style={{ fontSize:23, marginTop:10, fontWeight:'bold', marginHorizontal:20 }}>
                Actores
            </Text>
            <FlatList 
                style={{ marginTop:10,height: 70 }}
                data={cast}
                keyExtractor={(item)=>item.id.toString()}
                renderItem= {({item}:any)=>(
                                <CastItem actor={item}/>
                            )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}//quita el scroll
            />
            

        </View>
    </>
  )
}
