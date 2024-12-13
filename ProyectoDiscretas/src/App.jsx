import { useState } from "react";

// Función para verificar si existe un camino de Hamilton
// Parámetros:
// - graph: Objeto que representa el grafo como una lista de adyacencia.
// - startNode: Nodo desde el cual se iniciará la búsqueda del camino.
const hasHamiltonianPath = (graph, startNode) => {
  // Obtener todos los nodos del grafo como un array de claves
  const nodes = Object.keys(graph);
  
  // Conjunto para rastrear los nodos visitados durante la búsqueda
  const visited = new Set();

  // Función auxiliar de búsqueda en profundidad (DFS)
  // Parámetros:
  // - current: Nodo actual que estamos explorando.
  // - path: Array que contiene el camino recorrido hasta el momento.
  const dfs = (current, path) => {
    // Caso base: Si el camino incluye todos los nodos, se encontró un camino hamiltoniano
    if (path.length === nodes.length) {
      return true; // Retorna true indicando que se encontró un camino válido
    }

    // Marcar el nodo actual como visitado
    visited.add(current);

    // Explorar cada vecino del nodo actual
    for (const neighbor of graph[current]) {
      // Si el vecino no ha sido visitado, continuar la exploración
      if (!visited.has(neighbor)) {
        // Llamada recursiva a DFS con el vecino como nodo actual y el camino actualizado
        if (dfs(neighbor, [...path, neighbor])) {
          return true; // Si se encontró un camino hamiltoniano, retornar true
        }
      }
    }

    // Si no se encuentra un camino hamiltoniano desde este nodo, desmarcarlo
    // Esto permite explorar otras rutas posibles en iteraciones posteriores
    visited.delete(current);

    // Retornar false si no se encontró un camino hamiltoniano
    return false;
  };

  // Iniciar la búsqueda desde el nodo especificado (startNode)
  return dfs(startNode, [startNode]);
};


// Función para verificar si existe un circuito de Hamilton
// Un circuito de Hamilton es un recorrido que visita todos los nodos exactamente una vez y regresa al nodo inicial.
const hasHamiltonianCircuit = (graph) => {
  // Obtener los nodos del grafo como un array
  const nodes = Object.keys(graph);

  // Conjunto para rastrear los nodos visitados
  const visited = new Set();

  // Función auxiliar de búsqueda en profundidad (DFS)
  // Parámetros:
  // - current: Nodo actual que estamos explorando.
  // - path: Array que representa el camino recorrido hasta ahora.
  const dfs = (current, path) => {
    // Caso base: Si hemos visitado todos los nodos
    if (path.length === nodes.length) {
      // Verificar si existe una conexión entre el nodo actual y el inicial
      return graph[current].includes(path[0]);
    }

    // Marcar el nodo actual como visitado
    visited.add(current);

    // Explorar todos los vecinos del nodo actual
    for (const neighbor of graph[current]) {
      // Si el vecino no ha sido visitado, continuar explorando
      if (!visited.has(neighbor)) {
        // Llamada recursiva a DFS con el vecino como nodo actual y el camino actualizado
        if (dfs(neighbor, [...path, neighbor])) {
          return true; // Si se encuentra un circuito hamiltoniano, retornar true
        }
      }
    }

    // Desmarcar el nodo actual (backtracking) para probar otros caminos
    visited.delete(current);

    // Retornar false si no se encuentra un circuito hamiltoniano desde este nodo
    return false;
  };

  // Intentar iniciar el circuito desde cada nodo del grafo
  for (const startNode of nodes) {
    if (dfs(startNode, [startNode])) {
      return true; // Si se encuentra un circuito hamiltoniano, retornar true
    }
  }

  // Retornar false si no se encuentra ningún circuito hamiltoniano en el grafo
  return false;
};

// Componente React para verificar caminos y circuitos de Hamilton
const HamiltonianChecker = () => {
  // Estado para el input del grafo (en formato JSON) y el resultado
  const [graphInput, setGraphInput] = useState(""); // Cadena de texto con el grafo en formato JSON
  const [result, setResult] = useState(""); // Resultado del análisis

  // Manejar el evento de verificación
  const handleCheck = () => {
    try {
      // Intentar parsear el grafo desde el input
      const graph = JSON.parse(graphInput);

      // Verificar que el grafo no esté vacío
      const nodes = Object.keys(graph);
      if (nodes.length === 0) {
        setResult("El grafo está vacío."); // Mensaje de error si el grafo no tiene nodos
        return;
      }

      // Verificar si existe un camino de Hamilton partiendo de algún nodo
      const hasPath = nodes.some((node) => hasHamiltonianPath(graph, node));

      // Verificar si existe un circuito de Hamilton
      const hasCircuit = hasHamiltonianCircuit(graph);

      // Actualizar el estado con los resultados
      setResult(
        `Camino de Hamilton: ${hasPath ? "Sí" : "No"}\n` +
        `Circuito de Hamilton: ${hasCircuit ? "Sí" : "No"}`
      );
    } catch (e) {
      // Manejar errores en el formato del input
      setResult("Error: Asegúrate de ingresar un grafo válido en formato JSON.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Comprobador de circuito o camino de Hamilton</h1>
      <textarea
  rows="10"
  cols="50"
  placeholder='Ingrese el grafo en formato JSON. Ejemplo: {"A": ["B", "C"], "B": ["A", "C"], "C": ["A", "B"]}'
  value={graphInput}
  onChange={(e) => setGraphInput(e.target.value)}
></textarea>
      <br />
      <button onClick={handleCheck}>Verificar</button>
      <pre style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
};

export default HamiltonianChecker;
