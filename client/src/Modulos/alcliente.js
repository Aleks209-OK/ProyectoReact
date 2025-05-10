import React from 'react';
import './alcliente.css'; // Asegúrate de crear este archivo CSS
import { useNavigate } from 'react-router-dom';
function Atcliente() {

  const navigator = useNavigate();

  const retroceder = () => {
    navigator('/menu');
  }
  return (
    <div className="atcliente-container">


<div class="styled-wrapper">
  <button class="button" onClick={retroceder}>
    <div class="button-box">
      <span class="button-elem">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="arrow-icon"
        >
          <path
            fill="black"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </svg>
      </span>
      <span class="button-elem">
        <svg
          fill="black"
          viewBox="0 0  24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="arrow-icon"
        >
          <path
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </svg>
      </span>
    </div>
  </button>
</div>



      <h2>Atención al Cliente</h2>
      <p className="atcliente-description">
        Si tienes alguna consulta, queja o sugerencia, por favor completa el siguiente formulario. Nuestro equipo estará encantado de ayudarte.
      </p>
      <form className="atcliente-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje aquí"></textarea>
        </div>
        <button type="submit" className="btn-submit-client">Enviar</button>
      </form>
    </div>
  );
}

export default Atcliente;