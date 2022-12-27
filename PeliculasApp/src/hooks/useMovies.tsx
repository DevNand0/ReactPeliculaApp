import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { MovieDBResponse, Movies } from '../interfaces/movieInterface';
//ESTO ES UN HOOK
//LLAMA AL SERVICIO QUE TIENE LA API DE LAS PELICULAS
export const useMovies = () => {
    const [isLoading, setIsLoading] =useState(true);//instruccion para la animacion de carga
    const [peliculasEnCine, setPeliculasEnCine] = useState<Movies[]>([]);//instruccion que llama a la ejecucion de carga de datos de Movies
    const [peliculasPopular, setPeliculasPopular] = useState<Movies[]>([]);//instruccion que llama a la ejecucion de carga de datos de Movies
    const getMovies = async() => {
        //CREACION DE PETICION DE FORMA SIMULTANEA ASYNC
        const respNowPlaying = await movieDB.get<MovieDBResponse>('/now_playing');
        const respPopular = await movieDB.get<MovieDBResponse>('/popular');
        await movieDB.get<MovieDBResponse>('/upcoming');
        await movieDB.get<MovieDBResponse>('/top_rated');
        setPeliculasEnCine(respNowPlaying.data.results);
        setPeliculasPopular(respPopular.data.results);
        setIsLoading(false);
    }
    useEffect(()=>{
        getMovies();//se setean todas las apis que se han llamado
      },[]);  
    return {
        peliculasEnCine,
        peliculasPopular,
        isLoading
    }
}
