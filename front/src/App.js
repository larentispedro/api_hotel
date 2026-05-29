import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './componentes/Menu';
import ListaTipoQuarto from './pages/TipoQuarto/ListaTipoQuarto';
import FormTipoQuarto from './pages/TipoQuarto/FormTipoQuarto';
import ListaReserva from './pages/Reserva/ListaReserva';
import FormReserva from './pages/Reserva/FormReserva';
import DetalheReserva from './pages/Reserva/DetalheReserva';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="/reserva" />} />

          <Route path="/tipo_quarto"            element={<ListaTipoQuarto />} />
          <Route path="/tipo_quarto/novo"        element={<FormTipoQuarto />} />
          <Route path="/tipo_quarto/editar/:id"  element={<FormTipoQuarto />} />

          <Route path="/reserva"                element={<ListaReserva />} />
          <Route path="/reserva/nova"            element={<FormReserva />} />
          <Route path="/reserva/editar/:id"      element={<FormReserva />} />
          <Route path="/reserva/:id"             element={<DetalheReserva />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
