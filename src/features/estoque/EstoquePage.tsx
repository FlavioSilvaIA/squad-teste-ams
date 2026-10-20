import { useEffect, useState } from 'react';
import { formatBRL } from '../../../common/format';
import type { Produto } from '../../../common/types';
import { listarProdutos } from './api';
import { estilos } from './estilos';

export function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  useEffect(() => {
    void listarProdutos().then(setProdutos);
  }, []);
  return (
    <section style={estilos.secao}>
      <h1 style={estilos.titulo}>Estoque</h1>
      <ul style={estilos.lista}>
        {produtos.map((p) => (
          <li key={p.sku} style={estilos.item}>
            {p.sku} {p.nome}: {p.quantidade} un. a {formatBRL(p.precoCents)}
          </li>
        ))}
      </ul>
    </section>
  );
}
