import { Router } from 'express';
import { calcular } from './service';

export function calculadoraRoutes(): Router {
  const router = Router();
  router.post('/', (req, res) => {
    try {
      const { a, b, operacao } = (req.body ?? {}) as never;
      res.json(calcular(a, b, operacao));
    } catch (error) {
      res.status(400).json({ code: error instanceof Error ? error.message : 'ERRO' });
    }
  });
  return router;
}
