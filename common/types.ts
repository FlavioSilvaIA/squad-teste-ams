export interface Produto {
  sku: string;
  nome: string;
  precoCents: number;
  quantidade: number;
}

export interface ItemVenda {
  sku: string;
  quantidade: number;
}

export interface Venda {
  id: number;
  itens: ItemVenda[];
  totalCents: number;
}
