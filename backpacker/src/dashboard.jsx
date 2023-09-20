import React, { useState } from 'react';
import './style/dashboard.css';

function Dashboard() {
  const graph = {
    Alemanha: {
      vizinhos: {
        Áustria: 513,
        Bélgica: 713,
        França: 4,
        Luxemburgo: 2,
        PaísesBaixos: 2,
        Suíça: 2,
      },
    },
    Áustria: {
      vizinhos: {
        Alemanha: 2,
        Itália: 2,
        Suíça: 2,
      },
    },
    Bélgica: {
      vizinhos: {
        Alemanha: 2,
        França: 4,
        Luxemburgo: 2,
        PaísesBaixos: 2,
      },
    },
    Espanha: {
      vizinhos: {
        França: 4,
      },
    },
    Itália: {
      vizinhos: {
        Áustria: 2,
        França: 4,
        Suíça: 2,
      },
    },
    Luxemburgo: {
      vizinhos: {
        Alemanha: 2,
        Bélgica: 2,
        França: 4,
      },
    },
    ReinoUnido: {
      vizinhos: {
        França: 4,
      },
    },
    Suíça: {
      vizinhos: {
        Alemanha: 2,
        Áustria: 2,
        França: 4,
        Itália: 2,
      },
    },
    PaísesBaixos: {
      vizinhos: {
        Alemanha: 2,
        Bélgica: 2,
      },
    },
  };

  // const graph = {
  //   Alemanha: ['Áustria', 'Bélgica', 'França', 'Luxemburgo', 'PaísesBaixos', 'Suíça'],
  //   Áustria: ['Alemanha', 'Itália', 'Suíça'],
  //   Bélgica: ['Alemanha', 'França', 'Luxemburgo', 'PaísesBaixos'],
  //   Espanha: ['França'],
  //   Itália: ['Áustria', 'França', 'Suíça'],
  //   Luxembugo: ['Alemanha', 'Bélgica','França'],
  //   ReinoUnido: ['França'],
  //   Suíça: ['Alemanha', 'Áustria', 'França', 'Itália'],
  //   PaísesBaixos: ['Alemanha', 'Bélgica'],
  // };

  const opcoesJSON = {
    opcoes1: ["Alemanha","Áustria",  "Bélgica", "Espanha", "Itália", "Luxemburgo", "ReinoUnido", "Suíça", "PaísesBaixos"],
    opcoes2: ["Alemanha","Áustria",  "Bélgica", "Espanha", "Itália", "Luxemburgo", "ReinoUnido", "Suíça", "PaísesBaixos"],
  };

  // Estados para armazenar os países de origem e destino selecionados pelo usuário
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');

  // Estado para armazenar o resultado da busca
  const [caminhoEncontrado, setCaminhoEncontrado] = useState([]);

  // BFS
  function encontrarMenorCaminho() {
    const fila = [{ pais: origem, caminho: [origem] }];
    const visitados = new Set();

    while (fila.length > 0) {
      const { pais, caminho } = fila.shift();
      visitados.add(pais);

      for (const vizinho of Object.keys(graph[pais].vizinhos)) {
        if (!visitados.has(vizinho)) {
          const novoCaminho = [...caminho, vizinho];

          if (vizinho === destino) {
            // Atualizando a fila
            setCaminhoEncontrado(novoCaminho);
            return;
          } else {
            fila.push({ pais: vizinho, caminho: novoCaminho });
          }
        }
      }
    }
    // Se nenhum caminho for encontrado o array é atualizado como vazio
    setCaminhoEncontrado([]);
  }

  return (
    <div className='container'>
      <div className='filters'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22058808.237381425!2d1.0383528005593117!3d47.55366878504264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46ed8886cfadda85%3A0x72ef99e6b3fcf079!2sEuropa!5e0!3m2!1spt-BR!2sbr!4v1694984190419!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className='results'>
        <select
          className='form-field'
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
        >
          <option value="">selecione o país de origem</option>
          {opcoesJSON.opcoes1.map((opcao, index) => (
            <option key={index} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>

        <select
          className='form-field'
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        >
          <option value="">selecione o país de destino</option>
          {opcoesJSON.opcoes2.map((opcao, index) => (
            <option key={index} value={opcao}>
              {opcao}
            </option>
          ))}
        </select>
        <button
          className="button-visit"
          type="button"
          onClick={encontrarMenorCaminho}
        >
          Buscar caminho
        </button>

        {/* resultado */}
        {caminhoEncontrado.length > 0 && (
          <div>
            <h2>Caminho Encontrado:</h2>
            <ul>
              {caminhoEncontrado.map((pais, index) => (
                <li key={index}>{pais}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
