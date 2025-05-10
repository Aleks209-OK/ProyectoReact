import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  //Función para manejar el inicio de sesión
  const handleSubmit = (event) => {
    event.preventDefault();    //Evita que la página se recargue
    axios.post("http://localhost:3001/login", { 
      correo: correo,
      contraseña: contraseña
    }).then((response) => {
      if (response.data.success) {
        alert("Credenciales incorrectas");
      } else {
        alert("Inicio de sesión exitoso");
        navigate('/menu');    //Redirige al menú principal
      }
    }).catch((error) => {
      console.error("Error en el inicio de sesión:", error);
      alert("Ocurrió un error al intentar iniciar sesión");
    });
  };

  return (
    <div>
      <center>
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="card">
              <a className="login">Login</a>
              <div className="inputBox">
                <input 
                  type="text" 
                  required="required" 
                  onChange={e => setCorreo(e.target.value)} 
                />
                <span className="user">Correo</span>
              </div>

              <div className="inputBox">
                <input 
                  type="password" 
                  required="required" 
                  onChange={e => setContraseña(e.target.value)} 
                />
                <span>Contraseña</span>
              </div>

              <button className="enter" type="submit">Ingresar</button>
            </div>
          </div>
        </form>
      </center>
    </div>
  );
}

export default Login;