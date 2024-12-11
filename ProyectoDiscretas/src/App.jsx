import { useState } from "react";

// Función para verificar si existe un camino de Hamilton
const hasHamiltonianPath = (graph, startNode) => {
  const nodes = Object.keys(graph);
  const visited = new Set();

  const dfs = (current, path) => {
    if (path.length === nodes.length) {
      return true;
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, [...path, neighbor])) {
          return true;
        }
      }
    }

    visited.delete(current);
    return false;
  };

  return dfs(startNode, [startNode]);
};

// Función para verificar si existe un circuito de Hamilton
const hasHamiltonianCircuit = (graph) => {
  const nodes = Object.keys(graph);
  const visited = new Set();

  const dfs = (current, path) => {
    if (path.length === nodes.length) {
      return graph[current].includes(path[0]); // Verificar si regresa al nodo inicial
    }

    visited.add(current);

    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, [...path, neighbor])) {
          return true;
        }
      }
    }

    visited.delete(current);
    return false;
  };

  for (const startNode of nodes) {
    if (dfs(startNode, [startNode])) {
      return true;
    }
  }

  return false;
};

const HamiltonianChecker = () => {
  const [graphInput, setGraphInput] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = () => {
    try {
      const graph = JSON.parse(graphInput);

      const nodes = Object.keys(graph);
      if (nodes.length === 0) {
        setResult("El grafo está vacío.");
        return;
      }

      const hasPath = nodes.some((node) => hasHamiltonianPath(graph, node));
      const hasCircuit = hasHamiltonianCircuit(graph);

      setResult(
        `Camino de Hamilton: ${hasPath ? "Sí" : "No"}\nCircuito de Hamilton: ${hasCircuit ? "Sí" : "No"}`
      );
    } catch (e) {
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
