import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { CalculadoraPage } from './features/calculadora/CalculadoraPage';
import { estilosNavbar } from './features/calculadora/estilos';
import { EstoquePage } from './features/estoque/EstoquePage';
import { VendasPage } from './features/vendas/VendasPage';

export function App() {
  return (
    <>
      <nav style={estilosNavbar.barra}>
        <Link to="/estoque" style={estilosNavbar.link}>
          Estoque
        </Link>
        <Link to="/vendas" style={estilosNavbar.link}>
          Vendas
        </Link>
        <Link to="/calculadora" style={estilosNavbar.link}>
          Calculadora
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/estoque" replace />} />
        <Route path="/estoque" element={<EstoquePage />} />
        <Route path="/vendas" element={<VendasPage />} />
        <Route path="/calculadora" element={<CalculadoraPage />} />
      </Routes>
    </>
  );
}
