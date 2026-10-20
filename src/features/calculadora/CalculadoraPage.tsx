import { useState } from 'react';
import type { Operacao } from '../../../common/types';
import { calcular } from './api';

const simbolos: Record<Operacao, string> = {
  somar: '+',
  subtrair: '−',
  multiplicar: '×',
  dividir: '÷',
};

export function CalculadoraPage() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [resultado, setResultado] = useState<string | null>(null);
  const executar = (operacao: Operacao) =>
    void calcular(a, b, operacao).then(
      (c) => setResultado(`${c.a} ${simbolos[operacao]} ${c.b} = ${c.resultado}`),
      (e: Error) => setResultado(`Erro: ${e.message}`),
    );
  return (
    <section>
      <h1>Calculadora</h1>
      <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
      <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
      {(Object.keys(simbolos) as Operacao[]).map((op) => (
        <button key={op} onClick={() => executar(op)}>
          {simbolos[op]}
        </button>
      ))}
      {resultado && <p>{resultado}</p>}
    </section>
  );
}
