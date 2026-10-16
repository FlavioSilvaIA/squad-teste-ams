import type { Store } from '../store';

/** Baixa a quantidade vendida do estoque do produto. */
export async function baixar(store: Store, sku: string, quantidade: number): Promise<number> {
  const produto = await store.produto(sku);
  if (!produto) throw new Error('PRODUTO_INEXISTENTE');
  produto.quantidade -= quantidade;
  await store.salvarProduto(produto);
  return produto.quantidade;
}
