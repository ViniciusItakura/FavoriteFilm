import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api.js';
import './filme-info.css';
import { toast } from 'react-toastify';

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: 'b3ce7e92a7805422db24cdbaf3bbe122',
                    language: 'pt-BR',
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    console.log(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate('/', { replace: true });
                    return;
                });
        }

        loadFilme();

        return () => {
            console.log('Componente desmontado');
        }
    }, [navigate, id]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem("@favoritefilm");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if (hasFilme) {
            toast.warn("Este filme já esta na lista");
            return;
        } else {
            filmesSalvos.push(filme);
            localStorage.setItem("@favoritefilm", JSON.stringify(filmesSalvos));
            toast.success("Filme salvo com sucesso");
        }
    }

    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando detalhes do filme, por favor aguarde!</h1>
            </div>
        );
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target='blank' rel='external'>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;