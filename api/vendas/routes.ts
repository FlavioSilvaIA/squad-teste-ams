import { Router } from 'express';
import type { Store } from '../store';
import { registrarVenda } from './service';

export function vendasRoutes(store: Store): Router {
  const router = Router();
  router.post('/', async (req, res) => {
    try {
      const venda = await registrarVenda(store, (req.body?.itens ?? []) as never);
      res.status(201).json(venda);
    } catch (error) {
      res.status(400).json({ code: error instanceof Error ? error.message : 'ERRO' });
    }
  });
  return router;
}
