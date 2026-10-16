import { isSku } from '../../common/sku';
import type { ItemVenda, Venda } from '../../common/types';
import { baixar } from '../estoque/service';
import type { Store } from '../store';

/** Registro da venda: confere os SKUs, baixa o estoque e grava a venda com o total. */
export async function registrarVenda(store: Store, itens: ItemVenda[]): Promise<Venda> {
  if (itens.length === 0 || !itens.every((i) => isSku(i.sku) && i.quantidade > 0)) {
    throw new Error('VENDA_INVALIDA');
  }
  let totalCents = 0;
  for (const item of itens) {
    const produto = await store.produto(item.sku);
    if (!produto) throw new Error('PRODUTO_INEXISTENTE');
    totalCents += produto.precoCents;
    await baixar(store, item.sku, item.quantidade);
  }
  return store.salvarVenda({ itens, totalCents });
}
