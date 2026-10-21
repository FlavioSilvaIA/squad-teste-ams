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

export const estilos: Record<
  | 'secao'
  | 'titulo'
  | 'operacao'
  | 'visor'
  | 'grade'
  | 'tecla'
  | 'operador'
  | 'alternar'
  | 'gradeCientifica'
  | 'funcao',
  CSSProperties
> = {
  alternar: { background: '#ffffff', border: '1px solid #fca5a5', fontSize: '14px', marginTop: '12px', padding: '6px 12px' },
  gradeCientifica: { display: 'grid', gap: '8px', gridTemplateColumns: 'repeat(4, 64px)', marginTop: '12px' },
  funcao: { background: '#fef3c7', border: '1px solid #fcd34d', fontSize: '16px', padding: '12px 0' },
  secao: {
    background: '#fef2f2',
    color: '#1f2937',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: '16px',
    lineHeight: 1.5,
    padding: '16px',
  },
  titulo: { color: '#dc2626', fontSize: '28px', fontWeight: 600 },
  operacao: {
    color: '#b91c1c',
    fontSize: '16px',
    maxWidth: '280px',
    minHeight: '24px',
    padding: '0 12px',
    textAlign: 'right',
  },
  visor: {
    background: '#ffffff',
    border: '1px solid #fecaca',
    fontSize: '28px',
    maxWidth: '280px',
    padding: '8px 12px',
    textAlign: 'right',
  },
  grade: { display: 'grid', gap: '8px', gridTemplateColumns: 'repeat(4, 64px)', marginTop: '12px' },
  tecla: { background: '#ffffff', border: '1px solid #fecaca', fontSize: '20px', padding: '12px 0' },
  operador: { background: '#fee2e2', border: '1px solid #fca5a5', fontSize: '20px', padding: '12px 0' },
};
