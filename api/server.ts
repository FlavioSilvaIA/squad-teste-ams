import express from 'express';
import { estoqueRoutes } from './estoque/routes';
import { memoryStore, produtosIniciais } from './store';
import { vendasRoutes } from './vendas/routes';

const store = memoryStore(produtosIniciais);
const app = express();
app.use(express.json());
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});
app.use('/api/estoque', estoqueRoutes(store));
app.use('/api/vendas', vendasRoutes(store));

const port = Number(process.env.PORT ?? 4000);
app.listen(port, process.env.HOST ?? '127.0.0.1');
