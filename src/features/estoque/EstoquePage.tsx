import { useEffect, useState } from 'react';
import { formatBRL } from '../../../common/format';
import type { Produto } from '../../../common/types';
import { listarProdutos } from './api';

export function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  useEffect(() => {
    void listarProdutos().then(setProdutos);
  }, []);
  return (
    <section>
      <h1>Estoque</h1>
      <ul>
        {produtos.map((p) => (
          <li key={p.sku}>
            {p.sku} {p.nome}: {p.quantidade} un. a {formatBRL(p.precoCents)}
          </li>
        ))}
      </ul>
    </section>
  );
}
