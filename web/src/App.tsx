import {useEffect,useState} from 'react';
import api from './services/api';

interface Sorteio{
  concurso:number;
  data_sorterio:string;
  bola1:number;
  bola2:number;
  bola3:number;
  bola4:number;
  bola5:number;
  bola6:number;
}

function App() {
  consta[concursos,setConcursos] = useState<Sorteio[]>([]);

  useEffect(() => {
    api.get('/concursos').then(response =>{setconcursos(response.data);

    })
    .catch(err => console.error("Erro ao buscar dados", err));
  },[]);



  
}


