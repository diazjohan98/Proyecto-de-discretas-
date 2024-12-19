import { useState } from "react";

// Función para verificar si existe un camino de Hamilton
// Un camino de Hamilton visita todos los nodos del grafo exactamente una vez
const hasHamiltonianPath = (graph, startNode) => {
  // Obtener todos los nodos del grafo
  const nodes = Object.keys(graph);
  // Crear un conjunto para rastrear los nodos visitados
  const visited = new Set();

  // Función recursiva para realizar la búsqueda en profundidad (DFS)
  // Parámetros:
  // - current: Nodo actual que estamos explorando
  // - path: Array que contiene el camino recorrido hasta ahora
  const dfs = (current, path) => {
    // Caso base: Si el camino tiene la misma longitud que el número total de nodos, hemos encontrado un camino válido
    if (path.length === nodes.length) return true;

    // Marcar el nodo actual como visitado
    visited.add(current);

    // Explorar todos los vecinos del nodo actual
    for (const neighbor of graph[current]) {
      // Si el vecino no ha sido visitado, exploramos este vecino recursivamente
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, [...path, neighbor])) return true; // Si encontramos un camino válido, lo retornamos
      }
    }

    // Desmarcar el nodo actual para permitir su exploración en otras rutas
    visited.delete(current);
    return false; // Si no encontramos un camino, retornamos false
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
    // Caso base: Si hemos recorrido todos los nodos, verificar si el último nodo está conectado con el primero (circuito)
    if (path.length === nodes.length) {
      return graph[current].includes(path[0]); // Verificar si el nodo actual está conectado al nodo inicial
    }

    // Marcar el nodo actual como visitado
    visited.add(current);

    // Explorar los vecinos del nodo actual
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, [...path, neighbor])) return true; // Si encontramos un circuito válido, lo retornamos
      }
    }

    // Desmarcar el nodo actual para permitir su exploración en otras rutas
    visited.delete(current);
    return false; // Si no encontramos un circuito, retornamos false
  };

  // Intentar encontrar un circuito de Hamilton comenzando desde cada nodo
  for (const startNode of nodes) {
    if (dfs(startNode, [startNode])) return true; // Si se encuentra un circuito, retornamos true
  }

  return false; // Si no encontramos ningún circuito, retornamos false
};

// Función para verificar si un grafo tiene un circuito de Euler
// Un grafo tiene un circuito de Euler si todos sus nodos tienen grado par
const hasEulerianCircuit = (graph) => {
  return Object.values(graph).every((neighbors) => neighbors.length % 2 === 0);
};

// Función para verificar si un grafo tiene un camino de Euler
// Un grafo tiene un camino de Euler si tiene exactamente dos nodos con grado impar
const hasEulerianPath = (graph) => {
  // Filtrar los nodos que tienen grado impar
  const oddDegreeNodes = Object.values(graph).filter((neighbors) => neighbors.length % 2 !== 0);
  // El grafo tiene un camino de Euler si tiene exactamente dos nodos con grado impar
  return oddDegreeNodes.length === 2;
};

// Componente React para verificar caminos y circuitos
const HamiltonianChecker = () => {
  // Estado para manejar la entrada del grafo y el resultado
  const [graphInput, setGraphInput] = useState(""); // Cadena de texto para ingresar el grafo
  const [result, setResult] = useState(""); // Cadena para mostrar el resultado

  // Función que maneja la verificación del grafo
  const handleCheck = () => {
    try {
      // Intentamos parsear el grafo desde la entrada del usuario
      const graph = JSON.parse(graphInput);
      const nodes = Object.keys(graph); // Obtener los nodos del grafo

      // Verificar si el grafo está vacío
      if (nodes.length === 0) {
        setResult("El grafo está vacío.");
        return;
      }

      // Verificar si hay un camino de Hamilton desde algún nodo
      const hasHamiltonPathResult = nodes.some((node) => hasHamiltonianPath(graph, node));
      // Verificar si hay un circuito de Hamilton
      const hasHamiltonCircuitResult = hasHamiltonianCircuit(graph);
      // Verificar si hay un camino de Euler
      const hasEulerPathResult = hasEulerianPath(graph);
      // Verificar si hay un circuito de Euler
      const hasEulerCircuitResult = hasEulerianCircuit(graph);

      // Mostrar los resultados de las verificaciones
      setResult(
        `Camino de Hamilton: ${hasHamiltonPathResult ? "Sí" : "No"}\n` +
        `Circuito de Hamilton: ${hasHamiltonCircuitResult ? "Sí" : "No"}\n` +
        `Camino de Euler: ${hasEulerPathResult ? "Sí" : "No"}\n` +
        `Circuito de Euler: ${hasEulerCircuitResult ? "Sí" : "No"}`
      );
    } catch (e) {
      // En caso de error al parsear el grafo, mostrar un mensaje de error
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
        onChange={(e) => setGraphInput(e.target.value)} // Actualizar el estado con la entrada del usuario
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