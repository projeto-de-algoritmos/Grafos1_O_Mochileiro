import React, { useState } from 'react';
import './style/dashboard.css';

function Dashboard() {

  // grafo utilizado no BFS
  const graph = {
    Madrid: ['Lisbon', 'Barcelona', 'Bordeaux'],
    Barcelona: ['Madrid','Montpellier'],
    Montpellier: ['Barcelona', 'Marseille'],
    Marseille: ['Montpellier', 'Lyon', 'Nice'],
    Nice: ['Marseille', 'Milan'],
    Rome: ['Florence'],
    Florence: ['Rome', 'Bologna', 'Venice'],
    Bologna: ['Florence', 'Milan'],
    Venice: ['Milan', 'Florence'],
    Milan: ['Bern', 'Nice', 'Bologna', 'Venice', 'Munich'],
    Bern: ['Lyon', 'Milan', 'Frankfurt'],
    Lyon: ['Bern', 'Marseille', 'Bordeaux', 'Paris'],
    Bordeaux: ['Madrid', 'Lyon', 'Paris'],
    Amsterdam: ['Brussels', 'Berlin'],
    Brussels: ['Amsterdam', 'Paris', 'Frankfurt', 'London'],
    Berlin: ['Amsterdam', 'Hamburg', 'Prague'],
    Hamburg: ['Berlin', 'Copenhagen', 'Frankfurt', 'Munich'],
    Copenhagen: ['Hamburg'],
    Frankfurt: ['Hamburg', 'Munich', 'Bern', 'Paris', 'Brussels'],
    Munich: ['Frankfurt', 'Vienna', 'Milan', 'Prague', 'Hamburg'],
    Prague: ['Munich', 'Vienna', 'Berlin'],
    Vienna: ['Prague', 'Munich', 'Budapest', 'Venice'],
    Budapest: ['Vienna'],
    London: ['Paris', 'Brussels'],
    Paris: ['London', 'Brussels', 'Frankfurt', 'Lyon', 'Bordeaux'],
    Lisbon: ['Madrid']
  };

  // Opcoes de origem e destino
  const opcoesJSON = {
    opcoes1: ["Madrid", "Barcelona", "Montpellier", "Marseille", "Nice", "Rome", "Florence", "Bologna", 
      "Venice", "Milan", "Bern", "Lyon", "Bordeaux", "Amsterdam", "Brussels", "Berlin","Hamburg",
      "Copenhagen", "Frankfurt", "Munich", "Prague", "Vienna", "Budapest", "London", "Paris", "Lisbon"],
    opcoes2: ["Madrid", "Barcelona", "Montpellier", "Marseille", "Nice", "Rome", "Florence", "Bologna", 
      "Venice", "Milan", "Bern", "Lyon", "Bordeaux", "Amsterdam", "Brussels", "Berlin","Hamburg",
      "Copenhagen", "Frankfurt", "Munich", "Prague", "Vienna", "Budapest", "London", "Paris", "Lisbon"],
  
  };

  // Estados para armazenar os paises de origem e destino selecionados pelo usuário
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
