import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Inventario from './Modulos/inventario'; // Asegúrate de que el componente esté exportado correctamente
import Ventas from './Modulos/ventas';
import Atcliente from './Modulos/alcliente';
import './menu.css';
function Menu() {
  return (

      

      <div className="App">
      <center>
      <div class="banner">
         </div></center>

        <div className="catalogo">
          
        <Link to="/inventario">
          <div className="modulos">
            <img src="https://www.microtech.es/hubfs/Fotos%20blog/inventario.jpg?t=1535133234562" alt="Inventario" />
            <h3>Inventario</h3>
          </div>
          </Link>
          
          <Link to="/ventas">
          <div className="modulos">
          
            <img src="https://th.bing.com/th/id/OIP.sVCvdkwPfSEiZw3kIwt2PwHaD4?rs=1&pid=ImgDetMain" alt="Ventas" />
            <h3>Ventas</h3>
          </div>
          </Link>

          <Link to="/atcliente">
          <div className="modulos">
            <img src="https://definicion.de/wp-content/uploads/2023/10/servicio-al-cliente.png" alt="Atención al Cliente" />  
            <h3>Atención al Cliente</h3>
          </div>
          </Link>
        </div>

        {/* Configuración de rutas */}
        <Routes>
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/atcliente" element={<Atcliente/>} />
          
        </Routes>
      </div>
    
  );
}

export default Menu;
