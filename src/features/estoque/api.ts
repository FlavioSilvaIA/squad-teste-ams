import type { Produto } from '../../../common/types';

export async function listarProdutos(): Promise<Produto[]> {
  const res = await fetch('/api/estoque');
  if (!res.ok) throw new Error('falha ao listar o estoque');
  return (await res.json()) as Produto[];
}
