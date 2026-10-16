import { describe, expect, it } from 'vitest';
import { baixar } from '../../api/estoque/service';
import { memoryStore, produtosIniciais } from '../../api/store';

describe('estoque', () => {
  it('baixa a quantidade vendida', async () => {
    const store = memoryStore(produtosIniciais);
    expect(await baixar(store, 'BRO-0003', 5)).toBe(35);
  });
  it('recusa produto inexistente', async () => {
    await expect(baixar(memoryStore([]), 'XYZ-0001', 1)).rejects.toThrow('PRODUTO_INEXISTENTE');
  });
});
