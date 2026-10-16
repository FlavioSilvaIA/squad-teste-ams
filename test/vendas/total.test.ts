import { describe, expect, it } from 'vitest';
import { memoryStore, produtosIniciais } from '../../api/store';
import { registrarVenda } from '../../api/vendas/service';

describe('total da venda', () => {
  it('multiplica o preço pela quantidade', async () => {
    const venda = await registrarVenda(memoryStore(produtosIniciais), [
      { sku: 'BRO-0003', quantidade: 3 },
    ]);
    expect(venda.totalCents).toBe(3870);
  });
});
