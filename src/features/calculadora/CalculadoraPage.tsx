import { useState } from 'react';
import { estilos } from './estilos';

type Operador = '+' | '-' | '×' | '÷';

const OPERADORES: Operador[] = ['÷', '×', '-', '+'];

function calcular(a: number, b: number, op: Operador): number | null {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b === 0 ? null : a / b;
  }
}

function formatar(n: number): string {
  return String(Number(n.toPrecision(12)));
}

export function CalculadoraPage() {
  const [visor, setVisor] = useState('0');
  const [acumulado, setAcumulado] = useState<number | null>(null);
  const [operador, setOperador] = useState<Operador | null>(null);
  const [novoNumero, setNovoNumero] = useState(true);
  const [erro, setErro] = useState(false);

  const limpar = () => {
    setVisor('0');
    setAcumulado(null);
    setOperador(null);
    setNovoNumero(true);
    setErro(false);
  };

  const digitar = (d: string) => {
    if (erro) return;
    if (novoNumero) {
      setVisor(d);
      setNovoNumero(false);
    } else {
      setVisor(visor === '0' ? d : visor + d);
    }
  };

  const decimal = () => {
    if (erro) return;
    if (novoNumero) {
      setVisor('0.');
      setNovoNumero(false);
    } else if (!visor.includes('.')) {
      setVisor(visor + '.');
    }
  };

  const apagar = () => {
    if (erro || novoNumero) return;
    const proximo = visor.length > 1 ? visor.slice(0, -1) : '0';
    setVisor(proximo === '-' ? '0' : proximo);
  };

  const inverterSinal = () => {
    if (erro || visor === '0') return;
    setVisor(visor.startsWith('-') ? visor.slice(1) : '-' + visor);
  };

  const porcentagem = () => {
    if (erro) return;
    setVisor(formatar(Number(visor) / 100));
    setNovoNumero(true);
  };

  const resolver = (): number | null | undefined => {
    const atual = Number(visor);
    if (acumulado === null || operador === null || novoNumero) return atual;
    return calcular(acumulado, atual, operador);
  };

  const escolherOperador = (op: Operador) => {
    if (erro) return;
    const resultado = resolver();
    if (resultado === null || resultado === undefined) {
      setVisor('Erro');
      setErro(true);
      return;
    }
    setAcumulado(resultado);
    setVisor(formatar(resultado));
    setOperador(op);
    setNovoNumero(true);
  };

  const igual = () => {
    if (erro || operador === null || acumulado === null) return;
    const resultado = resolver();
    if (resultado === null || resultado === undefined) {
      setVisor('Erro');
      setErro(true);
    } else {
      setVisor(formatar(resultado));
    }
    setAcumulado(null);
    setOperador(null);
    setNovoNumero(true);
  };

  return (
    <section style={estilos.secao}>
      <h1 style={estilos.titulo}>Calculadora</h1>
      <div style={estilos.visor} role="status" aria-label="Visor">
        {visor}
      </div>
      <div style={estilos.grade}>
        <button type="button" style={estilos.operador} onClick={limpar}>
          C
        </button>
        <button type="button" style={estilos.operador} onClick={inverterSinal}>
          ±
        </button>
        <button type="button" style={estilos.operador} onClick={porcentagem}>
          %
        </button>
        <button type="button" style={estilos.operador} onClick={() => escolherOperador('÷')}>
          ÷
        </button>
        {['7', '8', '9'].map((d) => (
          <button key={d} type="button" style={estilos.tecla} onClick={() => digitar(d)}>
            {d}
          </button>
        ))}
        <button type="button" style={estilos.operador} onClick={() => escolherOperador('×')}>
          ×
        </button>
        {['4', '5', '6'].map((d) => (
          <button key={d} type="button" style={estilos.tecla} onClick={() => digitar(d)}>
            {d}
          </button>
        ))}
        <button type="button" style={estilos.operador} onClick={() => escolherOperador('-')}>
          -
        </button>
        {['1', '2', '3'].map((d) => (
          <button key={d} type="button" style={estilos.tecla} onClick={() => digitar(d)}>
            {d}
          </button>
        ))}
        <button type="button" style={estilos.operador} onClick={() => escolherOperador('+')}>
          +
        </button>
        <button type="button" style={estilos.tecla} onClick={() => digitar('0')}>
          0
        </button>
        <button type="button" style={estilos.tecla} onClick={decimal}>
          .
        </button>
        <button type="button" style={estilos.operador} onClick={apagar}>
          ⌫
        </button>
        <button type="button" style={estilos.operador} onClick={igual}>
          =
        </button>
      </div>
    </section>
  );
}
