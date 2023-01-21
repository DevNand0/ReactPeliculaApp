import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { MovieDBResponse, Movies } from '../interfaces/movieInterface';

//interface para las multiples peticiones de forma simultanea
interface MoviesState {
    nowPlaying:Movies[];
    popular:Movies[];
    upcoming:Movies[];
    topRated:Movies[];
}

//ESTO ES UN HOOK
//LLAMA AL SERVICIO QUE TIENE LA API DE LAS PELICULAS
export const useMovies = () => {
    const [isLoading, setIsLoading] =useState(true);//instruccion para la animacion de carga
    const [moviesState, setMoviesState] = useState<MoviesState>({
        //ESTOS ELEMENTOS DEBEN ESTAR OBLIGATORIAMENTE INICIALIZADO
        //DE ESTA FORMA EL CAROUSEL Y EL FLAT LIST PUEDE MOSTRAR ALGUN CONTENIDO 
        // Y SE EVITA LAS MARCAS DE ERRORES
        nowPlaying:[],
        popular:[],
        upcoming:[],
        topRated:[]
        //SE IICIALIZAN COMO UN ARREGLO
    });//es un state de interfaceMovieState para llamar al arreglo de cada categoria de las peliculas
    const [peliculasPopular, setPeliculasPopular] = useState<Movies[]>([]);//instruccion que llama a la ejecucion de carga de datos de Movies
    const getMovies = async() => {
        //CREACION DE PETICION DE FORMA SIMULTANEA ASYNC
        //const respNowPlaying = await movieDB.get<MovieDBResponse>('/now_playing');//uso de un await para cargar datos desde api
        const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');//el llamado de una api sin el await es una promesa
        const popularPromise    = movieDB.get<MovieDBResponse>('/popular');
        const upcomingPromise   = movieDB.get<MovieDBResponse>('/upcoming');
        const topRatedPromise   = movieDB.get<MovieDBResponse>('/top_rated');
        const response = await Promise.all([       
            nowPlayingPromise,
            popularPromise,
            upcomingPromise,
            topRatedPromise
        ]);// cuando se tiene todas las promesas ahi si usar await

        setMoviesState({
            nowPlaying:response[0].data.results,
            popular: response[1].data.results,
            upcoming: response[2].data.results,
            topRated: response[3].data.results,
        });

        setIsLoading(false);
    }
    useEffect(()=>{
        getMovies();//se setean todas las apis que se han llamado
      },[]);  
    return {
        ...moviesState,
        isLoading
    }
}
