import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
//URL API https://api.themoviedb.org/3/movie/now_playing?api_key=b3ce7e92a7805422db24cdbaf3bbe122&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;