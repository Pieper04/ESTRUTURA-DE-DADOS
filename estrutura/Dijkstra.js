/*
  Aqui está um exemplo de como implementar o algoritmo de Dijkstra em JavaScript para encontrar o caminho mais curto em um grafo direcionado e ponderado.
  Vou usar uma matriz de adjacência para representar o grafo e o algoritmo será aplicado a partir de um vértice de origem específico.
  Neste exemplo, usaremos uma fila de prioridade para eficientemente escolher o próximo vértice a ser explorado.
*/

// Função para encontrar o vértice não visitado com a distância mínima.
function minDistance(distances, visited) {
  let min = Infinity;
  let minIndex = -1;
  for (let v = 0; v < distances.length; v++) {
    if (!visited[v] && distances[v] < min) {
      min = distances[v];
      minIndex = v;
    }
  }
  return minIndex;
}

// Função para imprimir os caminhos mínimos.
function printShortestPath(distances, parent, source) {
  for (let i = 0; i < distances.length; i++) {
    if (i !== source) {
      let path = [i];
      let j = i;
      while (parent[j] !== -1) {
        path.unshift(parent[j]);
        j = parent[j];
      }
      console.log(`Caminho mais curto do ${source} para ${i}: ${path.join(" -> ")} com distância ${distances[i]}`);
    }
  }
}

// Função principal para executar o algoritmo de Dijkstra.
function dijkstra(graph, source) {
  const vertices = graph.length;
  const distances = new Array(vertices).fill(Infinity);
  const visited = new Array(vertices).fill(false);
  const parent = new Array(vertices).fill(-1);

  distances[source] = 0;

  for (let count = 0; count < vertices - 1; count++) {
    const u = minDistance(distances, visited);
    visited[u] = true;
    for (let v = 0; v < vertices; v++) {
      if (!visited[v] && graph[u][v] !== 0 && distances[u] !== Infinity && distances[u] + graph[u][v] < distances[v]) {
        distances[v] = distances[u] + graph[u][v];
        parent[v] = u;
      }
    }
  }

  printShortestPath(distances, parent, source);
}

// Exemplo de uso:
const graph = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0]
];
const source = 0; // Vértice de origem

dijkstra(graph, source);

/*
    Neste exemplo, a função dijkstra encontra os caminhos mínimos a partir do vértice de origem especificado para todos os outros vértices no grafo.
    A função printShortestPath é usada para imprimir os caminhos mínimos e suas distâncias.
    Certifique-se de adaptar a matriz graph ao seu próprio grafo, onde os valores zero representam a ausência de uma aresta entre os vértices
*/