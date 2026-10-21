import type { CSSProperties } from 'react';

export const estilosNavbar: Record<'barra' | 'link', CSSProperties> = {
  barra: {
    alignItems: 'center',
    background: '#1d4ed8',
    display: 'flex',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    gap: '16px',
    padding: '12px 16px',
  },
  link: { color: '#ffffff', fontWeight: 600, textDecoration: 'none' },
};

export const estilos: Record<'secao' | 'titulo' | 'visor' | 'grade' | 'tecla' | 'operador', CSSProperties> = {
  secao: {
    background: '#eef5ff',
    color: '#1f2937',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: '16px',
    lineHeight: 1.5,
    padding: '16px',
  },
  titulo: { color: '#1d4ed8', fontSize: '28px', fontWeight: 600 },
  visor: {
    background: '#ffffff',
    border: '1px solid #bfdbfe',
    fontSize: '28px',
    maxWidth: '280px',
    padding: '8px 12px',
    textAlign: 'right',
  },
  grade: { display: 'grid', gap: '8px', gridTemplateColumns: 'repeat(4, 64px)', marginTop: '12px' },
  tecla: { background: '#ffffff', border: '1px solid #bfdbfe', fontSize: '20px', padding: '12px 0' },
  operador: { background: '#dbeafe', border: '1px solid #93c5fd', fontSize: '20px', padding: '12px 0' },
};
