import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventario from './Modulos/inventario';
import Ventas from './Modulos/ventas';
import Atcliente from './Modulos/alcliente';
import Login from './login';
import Menu from './menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/atcliente" element={<Atcliente />} />
      </Routes>
    </Router>
  );
}

export default App;
