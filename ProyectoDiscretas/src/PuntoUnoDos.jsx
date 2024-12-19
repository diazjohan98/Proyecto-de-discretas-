import { useState } from "react";

// Función para verificar si existe un camino de Hamilton
// Un camino de Hamilton visita todos los nodos del grafo exactamente una vez
const hasHamiltonianPath = (graph, startNode) => {
  // Obtener todos los nodos del grafo
  const nodes = Object.keys(graph);
  const visited = new Set();

  const dfs = (current, path) => {
    if (path.length === nodes.length) return true;

    visited.add(current);

    // Explorar todos los vecinos del nodo actual
    for (const neighbor of graph[current]) {
      // Si el vecino no ha sido visitado, exploramos este vecino recursivamente
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, [...path, neighbor])) return true;
      }
    }

    // Desmarcar el nodo actual para permitir su exploración en otras rutas
    visited.delete(current);
    return false; 
  };

  // Iniciar la búsqueda desde el nodo de inicio
  return dfs(startNode, [startNode]);
};

// Función para verificar si existe un circuito de Hamilton
// Un circuito de Hamilton es un camino que pasa por todos los nodos exactamente una vez y regresa al nodo inicial
const hasHamiltonianCircuit = (graph) => {
  const nodes = Object.keys(graph);
  const visited = new Set();

  // Función recursiva de DFS
  const dfs = (current, path) => {
    if (path.length === nodes.length) {
      return graph[current].includes(path[0]); // Verificar si el nodo actual está conectado al nodo inicial
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, [...path, neighbor])) return true; 
      }
    }

    // Desmarcar el nodo actual para permitir su exploración en otras rutas
    visited.delete(current);
    return false; 
  };

  // Intentar encontrar un circuito de Hamilton comenzando desde cada nodo
  for (const startNode of nodes) {
    if (dfs(startNode, [startNode])) return true; 
  }

  return false; 
};

// Función para verificar si un grafo tiene un circuito de Euler
// Un grafo tiene un circuito de Euler si todos sus nodos tienen grado par
const hasEulerianCircuit = (graph) => {
  return Object.values(graph).every((neighbors) => neighbors.length % 2 === 0);
};

// Función para verificar si un grafo tiene un camino de Euler
// Un grafo tiene un camino de Euler si tiene exactamente dos nodos con grado impar
const hasEulerianPath = (graph) => {
  const oddDegreeNodes = Object.values(graph).filter((neighbors) => neighbors.length % 2 !== 0);
  return oddDegreeNodes.length === 2;
};

// Componente React para verificar caminos y circuitos
const HamiltonianChecker = () => {
  // Estado para manejar la entrada del grafo y el resultado
  const [graphInput, setGraphInput] = useState(""); 
  const [result, setResult] = useState(""); 

  // Función que maneja la verificación del grafo
  const handleCheck = () => {
    try {
      const graph = JSON.parse(graphInput);
      const nodes = Object.keys(graph); 

      if (nodes.length === 0) {
        setResult("El grafo está vacío.");
        return;
      }

    
      const hasHamiltonPathResult = nodes.some((node) => hasHamiltonianPath(graph, node));

      const hasHamiltonCircuitResult = hasHamiltonianCircuit(graph);
      
      const hasEulerPathResult = hasEulerianPath(graph);
     
      const hasEulerCircuitResult = hasEulerianCircuit(graph);

      
      setResult(
        `Camino de Hamilton: ${hasHamiltonPathResult ? "Sí" : "No"}\n` +
        `Circuito de Hamilton: ${hasHamiltonCircuitResult ? "Sí" : "No"}\n` +
        `Camino de Euler: ${hasEulerPathResult ? "Sí" : "No"}\n` +
        `Circuito de Euler: ${hasEulerCircuitResult ? "Sí" : "No"}`
      );
    } catch (e) {
      setResult("Error: Asegúrate de ingresar un grafo válido en formato JSON.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Comprobador de Caminos y Circuitos</h1>
      {/* Campo de texto para ingresar el grafo */}
      <textarea
        rows="10"
        cols="50"
        placeholder='Ingrese el grafo en formato JSON. Ejemplo: {"A": ["B", "C"], "B": ["A", "C"], "C": ["A", "B"]}'
        value={graphInput}
        onChange={(e) => setGraphInput(e.target.value)} 
      ></textarea>
      <br />
      {/* Botón para ejecutar la verificación */}
      <button onClick={handleCheck}>Verificar</button>
      {/* Mostrar los resultados de la verificación */}
      <pre style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
};

export default HamiltonianChecker;