import type { Calculo, Operacao } from '../../common/types';

const operacoes: Record<Operacao, (a: number, b: number) => number> = {
  somar: (a, b) => a + b,
  subtrair: (a, b) => a - b,
  multiplicar: (a, b) => a * b,
  dividir: (a, b) => a / b,
};

/** Cálculo entre dois números: confere a operação e os operandos e devolve o resultado. */
export function calcular(a: number, b: number, operacao: Operacao): Calculo {
  if (!Object.hasOwn(operacoes, operacao)) throw new Error('OPERACAO_INVALIDA');
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('NUMERO_INVALIDO');
  if (operacao === 'dividir' && b === 0) throw new Error('DIVISAO_POR_ZERO');
  return { a, b, operacao, resultado: operacoes[operacao](a, b) };
}
