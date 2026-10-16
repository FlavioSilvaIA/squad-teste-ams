import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { EstoquePage } from './features/estoque/EstoquePage';
import { VendasPage } from './features/vendas/VendasPage';

export function App() {
  return (
    <>
      <nav>
        <Link to="/estoque">Estoque</Link> <Link to="/vendas">Vendas</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/estoque" replace />} />
        <Route path="/estoque" element={<EstoquePage />} />
        <Route path="/vendas" element={<VendasPage />} />
      </Routes>
    </>
  );
}
