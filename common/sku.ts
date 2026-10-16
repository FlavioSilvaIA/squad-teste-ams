/** SKU: três letras maiúsculas, hífen e quatro dígitos (ABC-0001). */
export function isSku(value: unknown): value is string {
  return typeof value === 'string' && /^[A-Z]{3}-\d{4,}$/.test(value);
}
