import type { CSSProperties } from 'react';

export const estilos: Record<'secao' | 'titulo' | 'lista' | 'item', CSSProperties> = {
  secao: {
    background: '#eef5ff',
    color: '#1f2937',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: '16px',
    lineHeight: 1.5,
    padding: '16px',
  },
  titulo: { color: '#1d4ed8', fontSize: '28px', fontWeight: 600 },
  lista: { listStyle: 'none', margin: 0, padding: 0 },
  item: { borderBottom: '1px solid #bfdbfe', padding: '6px 0' },
};
