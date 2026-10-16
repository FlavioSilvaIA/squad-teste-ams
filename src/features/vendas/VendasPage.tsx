import { useState } from 'react';
import { formatBRL } from '../../../common/format';
import type { Venda } from '../../../common/types';
import { registrarVenda } from './api';

export function VendasPage() {
  const [sku, setSku] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [venda, setVenda] = useState<Venda | null>(null);
  return (
    <section>
      <h1>Vendas</h1>
      <input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU" />
      <input
        type="number"
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
      />
      <button onClick={() => void registrarVenda([{ sku, quantidade }]).then(setVenda)}>
        Vender
      </button>
      {venda && <p>Total: {formatBRL(venda.totalCents)}</p>}
    </section>
  );
}
