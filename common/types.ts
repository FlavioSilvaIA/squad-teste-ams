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

export type Operacao = 'somar' | 'subtrair' | 'multiplicar' | 'dividir';

export interface Calculo {
  a: number;
  b: number;
  operacao: Operacao;
  resultado: number;
}
