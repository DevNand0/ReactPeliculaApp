import { useState, useEffect } from 'react';
import movieDB from "../api/movieDB";
import { Cast, CreditsResponse } from '../interfaces/creditsInterface';
import { MovieFull } from "../interfaces/movieInterface";


//la interface que tiene todos detalles de la pelicula seleccionada
//que esto sera toda la info cargada desde apis en getMovieDetails
interface MovieDetails{
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}


export const useMovieDetails = (movieId:number) => {
  const [state, setState] = useState<MovieDetails>({
    //ESTA ES LA FORMA DE REALIZAR LA DECLARACION EN ESTADO INICIAL
    isLoading:true,
    movieFull:undefined,
    cast:[]
  });
  const getMovieDetails = async()=>{
    const movieDetailPromise = await movieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = await movieDB.get<CreditsResponse>(`/${movieId}/credits`);
    const [movieDetailsResponse, castResponse] = await Promise.all([       
      movieDetailPromise,
      castPromise
    ]);// cuando se tiene todas las promesas ahi si usar await
    //console.log(resp.data.overview);

    setState({//seteados todos los datos despues de haber realizado la respectiva carga
      isLoading:false,
      movieFull:movieDetailsResponse.data,
      cast: castResponse.data.cast
    });
  }

  useEffect(()=>{
    getMovieDetails();
  }, []);
  return {
    ...state
  }
}
