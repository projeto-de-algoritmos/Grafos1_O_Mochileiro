import React, { useState } from 'react';
import './style/dashboard.css';

function Dashboard() {

  const graph1 = {
    Alemanha: ['Áustria', 'Bélgica', 'França', 'Luxemburgo', 'PaísesBaixos', 'Suíça'],
    Austria: ['Alemanha', 'Itália', 'Suíça'],
    Bélgica: ['Alemanha', 'França', 'Luxemburgo', 'PaísesBaixos'],
    Espanha: ['França'],
    Itália: ['Áustria', 'França', 'Suíça'],
    Luxembugo: ['Alemanha', 'Bélgica','França'],
    ReinoUnido: ['França'],
    Suíça: ['Alemanha', 'Áustria', 'França', 'Itália'],
    PaísesBaixos: ['Alemanha', 'Bélgica']
  };

  // O erro do BFS não está aceitando Itália e reino unido utilizando o graph1 é problema no próprio grafo1 e não na função
  // utilizando o graph é possível comprovar isso!
  const graph = {
    A: ['B', 'D'],
    B: ['A', 'C', 'E', 'G'],
    C: ['B', 'H'],
    D: ['A', 'E'],
    E: ['B', 'D', 'F'],
    F: ['E', 'G', 'K'],
    G: ['B', 'F', 'I'],
    H: ['C', 'I'],
    I: ['G', 'H', 'J'],
    J: ['I', 'K'],
    K: ['F', 'J']
  };

  const opcoesJSON = {
    opcoes11: ["Alemanha","Áustria",  "Bélgica", "Espanha", "Itália", "Luxemburgo", "ReinoUnido", "Suíça", "PaísesBaixos"],
    opcoes22: ["Alemanha","Áustria",  "Bélgica", "Espanha", "Itália", "Luxemburgo", "ReinoUnido", "Suíça", "PaísesBaixos"],
    opcoes1: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
    opcoes2: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
  
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

      for (const vizinho of graph[pais]) {
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
          src="https://www.google.com/maps/d/embed?mid=1mCk3QZZHGvUo-P1dgt-HBvcDJr1lhRo&ehbc=2E312F&noprof=1"
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
