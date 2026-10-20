import { describe, expect, it } from 'vitest';
import { calcular } from '../../api/calculadora/service';

describe('calculadora', () => {
  it('faz as quatro operações', () => {
    expect(calcular(6, 3, 'somar').resultado).toBe(9);
    expect(calcular(6, 3, 'subtrair').resultado).toBe(3);
    expect(calcular(6, 3, 'multiplicar').resultado).toBe(18);
    expect(calcular(6, 3, 'dividir').resultado).toBe(2);
  });
  it('recusa divisão por zero', () => {
    expect(() => calcular(1, 0, 'dividir')).toThrow('DIVISAO_POR_ZERO');
  });
  it('recusa operação desconhecida', () => {
    expect(() => calcular(1, 2, 'potencia' as never)).toThrow('OPERACAO_INVALIDA');
  });
  it('recusa operando que não é número', () => {
    expect(() => calcular('1' as never, 2, 'somar')).toThrow('NUMERO_INVALIDO');
  });
});
