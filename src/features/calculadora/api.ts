import type { Calculo, Operacao } from '../../../common/types';

export async function calcular(a: number, b: number, operacao: Operacao): Promise<Calculo> {
  const res = await fetch('/api/calculadora', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ a, b, operacao }),
  });
  if (!res.ok) throw new Error(((await res.json()) as { code: string }).code);
  return (await res.json()) as Calculo;
}
