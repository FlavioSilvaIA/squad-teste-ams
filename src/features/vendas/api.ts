import type { ItemVenda, Venda } from '../../../common/types';

export async function registrarVenda(itens: ItemVenda[]): Promise<Venda> {
  const res = await fetch('/api/vendas', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ itens }),
  });
  if (!res.ok) throw new Error('venda recusada');
  return (await res.json()) as Venda;
}
