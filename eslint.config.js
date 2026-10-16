// Regras do time para os scripts em JavaScript (o TypeScript é conferido pelo tsc).
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    files: ['**/*.js'],
    rules: { eqeqeq: 'error', 'no-unused-vars': 'error', 'no-var': 'error' },
  },
];
