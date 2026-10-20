import { describe, expect, it } from 'vitest';
import { estilos } from '../../src/features/estoque/estilos';

describe('estilos do estoque', () => {
  it('define cor de fundo e fonte da tela', () => {
    expect(estilos.secao.background).toBe('#eef5ff');
    expect(estilos.secao.fontFamily).toContain('Segoe UI');
    expect(estilos.titulo.color).toBe('#1d4ed8');
  });
});
