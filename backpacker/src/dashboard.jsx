import React, { useState,   useEffect } from 'react';
import './style/dashboard.css';

function Dashboard() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  const closePopup = () => {
    setIsPopupVisible(false);
    localStorage.setItem('hasClosedPopup', 'true');
  };

  function formatarCaminho(caminhoEncontrado) {
    // Verifica se o caminho é válido
    if (caminhoEncontrado.length === 0) {
      return "Caminho não encontrado";
    }

    // Cria uma string formatada com setas entre os países
    return caminhoEncontrado.join(" -> ");
  }


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
      <header className='header'>
        <img src="https://cdn.pixabay.com/photo/2012/04/13/17/52/backpacker-33063_1280.png" alt="Descrição da Imagem" /> 
        <h1>Bem-vindo, Aventureiro!</h1>
      </header> 
      
      <div className='filters'>
        {isPopupVisible && (
          <div className="popup">
            <h3>
              Nossa missão é ajudá-lo a traçar o caminho perfeito para a sua Eurotour dos sonhos. Sua aventura começa aqui, e o melhor caminho está a apenas um clique de distância.
            </h3>
            <button className='close-button' onClick={closePopup}>X</button>
          </div>
        )}
        <iframe
        className='iframe'
          src="https://www.google.com/maps/d/embed?mid=1mCk3QZZHGvUo-P1dgt-HBvcDJr1lhRo&ehbc=2E312F&noprof=1&iwloc=addr"
          width="100%"  
          height="110%"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>  
      <div className='results'>
          <div className='options'>
          <select
            className='form-field'
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
            >
            <option value="">selecione a cidade de origem</option>
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
          </div>
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
            <p className='line'>{formatarCaminho(caminhoEncontrado)}</p>
          </div>
        )}
        <img className='down' src="https://cdn.pixabay.com/photo/2018/01/25/05/32/silhouette-3105461_1280.png" alt="Descrição da Imagem" /> 

      </div>
    </div>
  );
}

export default Dashboard;
