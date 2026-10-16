import { describe, expect, it } from 'vitest';
import { memoryStore, produtosIniciais } from '../../api/store';
import { registrarVenda } from '../../api/vendas/service';

describe('vendas sem saldo', () => {
  it('recusa quantidade maior que o estoque e não altera o estoque', async () => {
    const store = memoryStore(produtosIniciais);
    await expect(
      registrarVenda(store, [{ sku: 'BRO-0003', quantidade: 50 }]),
    ).rejects.toThrow('ESTOQUE_INSUFICIENTE');
    expect((await store.produto('BRO-0003'))?.quantidade).toBe(40);
  });
  it('recusa quando o mesmo SKU repetido passa do saldo, sem baixar nada', async () => {
    const store = memoryStore(produtosIniciais);
    await expect(
      registrarVenda(store, [
        { sku: 'PAR-0001', quantidade: 1 },
        { sku: 'BRO-0003', quantidade: 30 },
        { sku: 'BRO-0003', quantidade: 30 },
      ]),
    ).rejects.toThrow('ESTOQUE_INSUFICIENTE');
    expect((await store.produto('PAR-0001'))?.quantidade).toBe(1000);
  });
  it('aceita a venda da quantidade exata do saldo', async () => {
    const store = memoryStore(produtosIniciais);
    await registrarVenda(store, [{ sku: 'BRO-0003', quantidade: 40 }]);
    expect((await store.produto('BRO-0003'))?.quantidade).toBe(0);
  });
});
