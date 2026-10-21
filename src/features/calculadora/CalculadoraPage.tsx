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

type Funcao = 'sen' | 'cos' | 'tan' | '√' | 'x²' | '1/x' | 'ln' | 'log' | 'n!';

const FUNCOES: Funcao[] = ['sen', 'cos', 'tan', '√', 'x²', '1/x', 'ln', 'log', 'n!'];

const RAD = Math.PI / 180;

// Remove o ruído de ponto flutuante das funções trigonométricas (sen 180° = 0).
function limparRuido(n: number): number {
  return Math.round(n * 1e12) / 1e12;
}

function aplicarFuncao(x: number, fn: Funcao): number | null {
  switch (fn) {
    case 'sen':
      return limparRuido(Math.sin(x * RAD));
    case 'cos':
      return limparRuido(Math.cos(x * RAD));
    case 'tan': {
      if (Math.abs(Math.cos(x * RAD)) < 1e-12) return null;
      return limparRuido(Math.tan(x * RAD));
    }
    case '√':
      return x < 0 ? null : Math.sqrt(x);
    case 'x²':
      return x * x;
    case '1/x':
      return x === 0 ? null : 1 / x;
    case 'ln':
      return x <= 0 ? null : Math.log(x);
    case 'log':
      return x <= 0 ? null : Math.log10(x);
    case 'n!': {
      if (!Number.isInteger(x) || x < 0 || x > 170) return null;
      let r = 1;
      for (let i = 2; i <= x; i++) r *= i;
      return r;
    }
  }
}

export function CalculadoraPage() {
  const [visor, setVisor] = useState('0');
  const [acumulado, setAcumulado] = useState<number | null>(null);
  const [operador, setOperador] = useState<Operador | null>(null);
  const [novoNumero, setNovoNumero] = useState(true);
  const [erro, setErro] = useState(false);
  const [concluida, setConcluida] = useState('');
  const [cientifica, setCientifica] = useState(false);
  // Visor com valor pronto (função ou π): o próximo dígito o substitui.
  const [completo, setCompleto] = useState(false);

  const pendente =
    acumulado !== null && operador !== null
      ? `${formatar(acumulado)}${operador}${novoNumero ? '' : visor}`
      : '';
  const operacao = pendente || concluida;

  const limpar = () => {
    setConcluida('');
    setVisor('0');
    setAcumulado(null);
    setOperador(null);
    setNovoNumero(true);
    setErro(false);
    setCompleto(false);
  };

  const digitar = (d: string) => {
    if (erro) return;
    setConcluida('');
    if (novoNumero || completo) {
      setVisor(d);
      setNovoNumero(false);
      setCompleto(false);
    } else {
      setVisor(visor === '0' ? d : visor + d);
    }
  };

  const decimal = () => {
    if (erro) return;
    setConcluida('');
    if (novoNumero || completo) {
      setVisor('0.');
      setNovoNumero(false);
      setCompleto(false);
    } else if (!visor.includes('.')) {
      setVisor(visor + '.');
    }
  };

  const apagar = () => {
    if (erro || novoNumero || completo) return;
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
    setCompleto(false);
  };

  const funcao = (fn: Funcao) => {
    if (erro) return;
    const resultado = aplicarFuncao(Number(visor), fn);
    if (resultado === null || !Number.isFinite(resultado)) {
      setVisor('Erro');
      setErro(true);
      return;
    }
    setConcluida('');
    setVisor(formatar(resultado));
    // Com operador pendente o visor é o operando; sem ele, o próximo dígito inicia número novo.
    setNovoNumero(acumulado === null || operador === null);
    setCompleto(true);
  };

  const pi = () => {
    if (erro) return;
    setConcluida('');
    setVisor(formatar(Math.PI));
    setNovoNumero(acumulado === null || operador === null);
    setCompleto(true);
  };

  const resolver = (): number | null | undefined => {
    const atual = Number(visor);
    if (acumulado === null || operador === null || novoNumero) return atual;
    return calcular(acumulado, atual, operador);
  };

  const escolherOperador = (op: Operador) => {
    if (erro) return;
    setConcluida('');
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
    setCompleto(false);
  };

  const igual = () => {
    if (erro || operador === null || acumulado === null) return;
    setConcluida(`${pendente}=`);
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
    setCompleto(false);
  };

  return (
    <section style={estilos.secao}>
      <h1 style={estilos.titulo}>Calculadora</h1>
      <div style={estilos.operacao} aria-label="Operação" data-testid="operacao">
        {operacao}
      </div>
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
      <button
        type="button"
        style={estilos.alternar}
        aria-pressed={cientifica}
        onClick={() => setCientifica(!cientifica)}
      >
        Científica
      </button>
      {cientifica && (
        <div style={estilos.gradeCientifica} aria-label="Funções científicas">
          {FUNCOES.map((fn) => (
            <button key={fn} type="button" style={estilos.funcao} onClick={() => funcao(fn)}>
              {fn}
            </button>
          ))}
          <button type="button" style={estilos.funcao} onClick={pi}>
            π
          </button>
          <span>sen, cos e tan em graus</span>
        </div>
      )}
    </section>
  );
}
