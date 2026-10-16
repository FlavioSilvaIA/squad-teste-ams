import { describe, expect, it } from 'vitest';
import { formatBRL } from '../../common/format';
import { isSku } from '../../common/sku';

describe('common', () => {
  it('formata em reais', () => {
    expect(formatBRL(129000)).toBe('R$ 1.290,00');
  });
  it('confere o SKU', () => {
    expect(isSku('PAR-0001')).toBe(true);
    expect(isSku('par-0001')).toBe(false);
  });
});
