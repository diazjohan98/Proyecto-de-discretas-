import heapq

# Función para encontrar el camino más corto entre dos vértices
def camino_mas_corto(grafo, inicio, fin):
    """
    Calcula el camino más corto entre dos vértices en un grafo utilizando el algoritmo de Dijkstra.

    Paso a paso:
    1. Inicializa una cola de prioridad para gestionar los nodos por distancia acumulada.
    2. Define un diccionario para almacenar las distancias mínimas desde el nodo de inicio a los demás nodos.
    3. Crea un diccionario para rastrear los nodos predecesores y reconstruir el camino.
    4. Explora los vecinos del nodo actual y actualiza las distancias más cortas si corresponde.
    5. Una vez alcanzado el nodo destino, reconstruye el camino más corto desde el nodo destino al nodo de inicio.

    Args:
        grafo (dict): Diccionario que representa el grafo. Cada clave es un nodo y su valor es una lista de
                      tuplas (vecino, peso).
        inicio (str): Nodo de inicio.
        fin (str): Nodo de destino.

    Returns:
        tuple: Una tupla que contiene la distancia más corta y la lista con el camino más corto.
    """
    # Crear una cola de prioridad para gestionar los nodos por distancia acumulada
    cola = []
    heapq.heappush(cola, (0, inicio))  # (distancia, nodo)

    # Inicializar las distancias a infinito para todos los nodos
    distancias = {nodo: float('inf') for nodo in grafo}  # Inicializa todas las distancias como infinito
    distancias[inicio] = 0  # La distancia al nodo inicial es 0

    # Diccionario para rastrear el nodo predecesor de cada nodo
    padres = {nodo: None for nodo in grafo}  # Inicializar los predecesores como None

    while cola:
        # Obtener el nodo con la menor distancia acumulada
        distancia_actual, nodo_actual = heapq.heappop(cola)

        # Si alcanzamos el nodo destino, terminamos
        if nodo_actual == fin:
            break

        # Explorar los vecinos del nodo actual
        for vecino, peso in grafo[nodo_actual]:
            nueva_distancia = distancia_actual + peso

            # Si encontramos una distancia menor, actualizamos
            if nueva_distancia < distancias[vecino]:
                distancias[vecino] = nueva_distancia  # Actualizar la distancia mínima
                padres[vecino] = nodo_actual  # Registrar el nodo actual como predecesor
                heapq.heappush(cola, (nueva_distancia, vecino))  # Agregar el vecino a la cola con su nueva distancia

    # Reconstruir el camino más corto desde el destino al inicio
    camino = []
    nodo = fin
    while nodo is not None:  # Ir hacia atrás desde el nodo destino usando los predecesores
        camino.append(nodo)
        nodo = padres[nodo]
    camino.reverse()  # Invertir el camino para que vaya del inicio al fin

    return distancias[fin], camino

# Ejemplo de uso
grafo = {
    'A': [('B', 1), ('C', 4)],
    'B': [('A', 1), ('C', 2), ('D', 5)],
    'C': [('A', 4), ('B', 2), ('D', 1)],
    'D': [('B', 5), ('C', 1)]
}

inicio = 'A'
fin = 'D'
distancia, camino = camino_mas_corto(grafo, inicio, fin)

# Imprimir resultados
print(f"La distancia más corta entre {inicio} y {fin} es {distancia}.")  # Mostrar la distancia más corta
print(f"El camino más corto es: {' -> '.join(camino)}.")  # Mostrar el camino más corto