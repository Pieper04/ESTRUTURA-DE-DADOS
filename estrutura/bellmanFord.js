/*
    O algoritmo de Bellman-Ford é um algoritmo de busca de caminho mais curto que pode lidar com grafos que têm arestas com pesos negativos,
    desde que não contenham ciclos de peso negativo. Ele também é usado para detectar ciclos de peso negativo em um grafo.
    Aqui está um exemplo de implementação do algoritmo de Bellman-Ford em JavaScript:
*/ 
class Grafo {
  constructor(vertices, arestas) {
    this.V = vertices;
    this.E = arestas;
    this.arestas = [];
  }

  adicionarAresta(origem, destino, peso) {
    this.arestas.push({ origem, destino, peso });
  }

  bellmanFord(origem) {
    const distancias = Array(this.V).fill(Infinity);
    const predecessores = Array(this.V).fill(null);
    distancias[origem] = 0;

    for (let i = 0; i < this.V - 1; i++) {
      for (const { origem, destino, peso } of this.arestas) {
        if (distancias[origem] + peso < distancias[destino]) {
          distancias[destino] = distancias[origem] + peso;
          predecessores[destino] = origem;
        }
      }
    }

    for (const { origem, destino, peso } of this.arestas) {
      if (distancias[origem] + peso < distancias[destino]) {
        console.log("O grafo contém um ciclo de peso negativo");
        return;
      }
    }

    for (let i = 0; i < this.V; i++) {
      console.log(`Caminho mais curto da origem ${origem} para ${i} é ${distancias[i]}`);
    }
  }
}

// Exemplo de uso:
const grafo = new Grafo(5, 8); // 5 vértices, 8 arestas
grafo.adicionarAresta(0, 1, -1);
grafo.adicionarAresta(0, 2, 4);
grafo.adicionarAresta(1, 2, 3);
grafo.adicionarAresta(1, 3, 2);
grafo.adicionarAresta(1, 4, 2);
grafo.adicionarAresta(3, 2, 5);
grafo.adicionarAresta(3, 1, 1);
grafo.adicionarAresta(4, 3, -3);

const origem = 0; // Vértice de origem

grafo.bellmanFord(origem);

/*
    Neste exemplo, a classe Grafo é usada para representar o grafo, e o método bellmanFord implementa o algoritmo de Bellman-Ford.
    Certifique-se de adaptar o exemplo ao seu próprio grafo e às suas necessidades.
    O algoritmo irá calcular as distâncias mínimas de um vértice de origem para todos os outros vértices no grafo e também detectar se há ciclos de peso negativo.
*/