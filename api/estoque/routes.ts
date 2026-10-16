import { Router } from 'express';
import type { Store } from '../store';

export function estoqueRoutes(store: Store): Router {
  const router = Router();
  router.get('/', async (_req, res) => {
    res.json(await store.produtos());
  });
  return router;
}
