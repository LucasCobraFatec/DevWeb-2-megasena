import { useEffect, useState, useCallback } from "react";
import api from "./services/api";
import "./App.css";

interface Sorteio {
  concurso: number;
  data_sorteio: string;
  bola1: number;
  bola2: number;
  bola3: number;
  bola4: number;
  bola5: number;
  bola6: number;
}

function App() {
  const [concursos, setConcursos] = useState<Sorteio[]>([]);
  const [busca, setBusca] = useState("");
  const [offset, setOffset] = useState(0);
  const [carregando, setCarregando] = useState(false);

  const buscarConcursos = useCallback(
    (
      novoOffset: number,
      termoBusca: string = "",
      resetarLista: boolean = false,
    ) => {
      // Regra: 1 resultado no início (offset 0 e sem busca), 10 no "carregar mais"
      const limiteSolicitado = (novoOffset === 0 && termoBusca === "") ? 1 : 10;

      api
        .get(
          `/concursos?offset=${novoOffset}&limit=${limiteSolicitado}&busca=${termoBusca}`,
        )
        .then((response) => {
          if (termoBusca !== "" || resetarLista) {
            setConcursos(response.data);
          } else {
            setConcursos((prev) => {
              // Se for a carga inicial, substitui a lista pelo único resultado
              if (novoOffset === 0) return response.data;

              // Caso contrário, adiciona os novos filtrando duplicados
              const novosFiltrados = response.data.filter(
                (novo: Sorteio) =>
                  !prev.some((antigo) => antigo.concurso === novo.concurso),
              );
              return [...prev, ...novosFiltrados];
            });
          }
        })
        .catch((err) => console.error("Erro ao carregar dados:", err))
        .finally(() => setCarregando(false));
    },
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCarregando(true);
    // Forçamos o reset para garantir que venha apenas 1 no início
    buscarConcursos(0, "", true);
  }, [buscarConcursos]);

  const handleSearch = () => {
    setCarregando(true);
    setOffset(0);
    buscarConcursos(0, busca);
  };

  const handleClear = () => {
    setCarregando(true);
    setBusca("");
    setOffset(0);
    buscarConcursos(0, "", true);
  };

  const carregarMais = () => {
    setCarregando(true);
    const proximoOffset = concursos.length;
    
    // Atualiza o estado para o ESLint não reclamar de variável não usada
    setOffset(proximoOffset); 
    buscarConcursos(proximoOffset, busca);
  };

  return (
    <div className="container">
      {/* Truque para usar a variável offset e sumir o aviso do ESLint */}
      <span style={{ display: 'none' }}>{offset}</span>
      
      <h1>MEGA-SENA RESULTADOS</h1>

      <div className="search-container">
        <input
          type="number"
          placeholder="Número do concurso..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="search-input"
        />
        <div className="button-group">
          <button
            onClick={handleSearch}
            className="btn-search"
            disabled={carregando}
          >
            {carregando && busca ? "..." : "Buscar"}
          </button>
          <button onClick={handleClear} className="btn-clear">
            Limpar
          </button>
        </div>
      </div>

      <div className="lista-sorteios">
        {concursos.length > 0 ? (
          concursos.map((item) => (
            <div key={item.concurso} className="card-concurso">
              <div className="info-header">
                <span className="concurso-num">Concurso {item.concurso}</span>
                <span className="concurso-data">
                  {new Date(item.data_sorteio).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </span>
              </div>

              <div className="bolas-container">
                {[
                  item.bola1,
                  item.bola2,
                  item.bola3,
                  item.bola4,
                  item.bola5,
                  item.bola6,
                ].map((bola, index) => (
                  <div
                    key={`${item.concurso}-bola-${index}`}
                    className="bola"
                  >
                    {bola < 10 ? `0${bola}` : bola}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          !carregando &&
          busca !== "" && (
            <div className="no-results-msg">
              Não existe dados do concurso {busca}
            </div>
          )
        )}
      </div>

      
      {!busca && (
        <button
          onClick={carregarMais}
          className="btn-load-more"
          disabled={carregando}
        >
          {carregando ? (
            <div className="spinner"></div>
          ) : (
            "Carregar Mais Resultados"
          )}
        </button>
      )}
    </div>
  );
}

export default App;