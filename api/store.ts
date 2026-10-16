import type { Produto, Venda } from '../common/types';

/** Armazenamento da API: em memória quando o Oracle não está configurado. */
export interface Store {
  produtos(): Promise<Produto[]>;
  produto(sku: string): Promise<Produto | undefined>;
  salvarProduto(produto: Produto): Promise<void>;
  salvarVenda(venda: Omit<Venda, 'id'>): Promise<Venda>;
}

export function memoryStore(inicial: Produto[]): Store {
  const produtos = new Map(inicial.map((p) => [p.sku, { ...p }]));
  const vendas: Venda[] = [];
  return {
    produtos: async () => [...produtos.values()].map((p) => ({ ...p })),
    produto: async (sku) => {
      const p = produtos.get(sku);
      return p ? { ...p } : undefined;
    },
    salvarProduto: async (produto) => {
      produtos.set(produto.sku, { ...produto });
    },
    salvarVenda: async (venda) => {
      const saved = { ...venda, id: vendas.length + 1 };
      vendas.push(saved);
      return saved;
    },
  };
}

export const produtosIniciais: Produto[] = [
  { sku: 'PAR-0001', nome: 'Parafuso 6 mm', precoCents: 35, quantidade: 1000 },
  { sku: 'POR-0002', nome: 'Porca 6 mm', precoCents: 20, quantidade: 800 },
  { sku: 'BRO-0003', nome: 'Broca 8 mm', precoCents: 1290, quantidade: 40 },
];
