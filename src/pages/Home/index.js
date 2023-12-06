import { useEffect, useState } from 'react';
import api from '../../services/api.js';

//URL API movie/now_playing?api_key=b3ce7e92a7805422db24cdbaf3bbe122&language=pt-BR

function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: 'b3ce7e92a7805422db24cdbaf3bbe122',
                    language: 'pt-BR',
                    page: 1,
                }
            });

            console.log(response);
        }

        loadFilmes();
    }, []);

    return (
        <div>
            <h1>Bem vindo a home</h1>
        </div>
    );
}

export default Home;