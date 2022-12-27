import axios from 'axios';

let url = 'https://api.themoviedb.org/3/movie';
const movieDB = axios.create({
    baseURL: url,
    params:{
        api_key:'40a9de828838c2f5ee286e2c235026f3',
        language: 'es-ES'
    }
});


export default movieDB;
