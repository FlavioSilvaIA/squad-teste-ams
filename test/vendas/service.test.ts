import { describe, expect, it } from 'vitest';
import { memoryStore, produtosIniciais } from '../../api/store';
import { registrarVenda } from '../../api/vendas/service';

describe('vendas', () => {
  it('registra a venda de uma unidade', async () => {
    const venda = await registrarVenda(memoryStore(produtosIniciais), [
      { sku: 'BRO-0003', quantidade: 1 },
    ]);
    expect(venda.totalCents).toBe(1290);
  });
  it('recusa venda vazia', async () => {
    await expect(registrarVenda(memoryStore([]), [])).rejects.toThrow('VENDA_INVALIDA');
  });
});
