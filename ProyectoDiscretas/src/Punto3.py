import heapq

# Función para encontrar el camino más corto entre dos vértices
def camino_mas_corto(grafo, inicio, fin):

    cola = []
    heapq.heappush(cola, (0, inicio))  

    # Inicializar las distancias a infinito para todos los nodos
    distancias = {nodo: float('inf') for nodo in grafo} 
    distancias[inicio] = 0  

    # Diccionario para rastrear el nodo predecesor de cada nodo
    padres = {nodo: None for nodo in grafo}  # Inicializar los predecesores como None

    while cola:

        distancia_actual, nodo_actual = heapq.heappop(cola)

        if nodo_actual == fin:
            break

        # Explorar los vecinos del nodo actual
        for vecino, peso in grafo[nodo_actual]:
            nueva_distancia = distancia_actual + peso

            # Si encontramos una distancia menor, actualizamos
            if nueva_distancia < distancias[vecino]:
                distancias[vecino] = nueva_distancia  
                padres[vecino] = nodo_actual  # Registrar el nodo actual como predecesor
                heapq.heappush(cola, (nueva_distancia, vecino))  # Agregar el vecino a la cola con su nueva distancia

    # Reconstruir el camino más corto desde el destino al inicio
    camino = []
    nodo = fin
    while nodo is not None:  
        camino.append(nodo)
        nodo = padres[nodo]
    camino.reverse()  

    return distancias[fin], camino


grafo = {
    'A': [('B', 1), ('C', 4)],
    'B': [('A', 1), ('C', 2), ('D', 5)],
    'C': [('A', 4), ('B', 2), ('D', 1)],
    'D': [('B', 5), ('C', 1)]
}

inicio = 'A'
fin = 'D'
distancia, camino = camino_mas_corto(grafo, inicio, fin)

print(f"La distancia más corta entre {inicio} y {fin} es {distancia}.")  
print(f"El camino más corto es: {' -> '.join(camino)}.") 