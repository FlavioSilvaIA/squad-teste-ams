export function formatBRL(cents: number): string {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  const reais = Math.trunc(abs / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return sign + 'R$ ' + reais + ',' + (abs % 100).toString().padStart(2, '0');
}
