import React from 'react';
import {Component, useEffect, useState }  from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Inventario() {
  
  const [medicamentoList, setMedicamentos]=useState([]);

  const [nombre, setNombre]=useState("");
  const [presentacion, setPresentacion]=useState("");
  const [precio, setPrecio]=useState("");
  const [stock, setStock]=useState("");
  const [editar, setEditar]=useState(false);
  const [id, setIde]=useState("");

  const navigator = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

// funcion para agregar
const add = () => {
  Axios.post("http://localhost:3001/crear", {
    nombre: nombre,
    presentacion: presentacion,
    precio: precio,
    stock: stock
  }).then((response) => {
    alert("Producto registrado");
    getMedicamentos(); // Actualiza la lista de medicamentos después de agregar uno nuevo
    limpiarMedicamento(); // Limpia los campos del formulario
  }).catch((error) => {
    console.error("Error al registrar el empleado:", error);
    alert("No se pudo registrar el empleado. Verifica la conexión con el servidor.");
  });
};

// funcion para listar
const getMedicamentos = () => {
  Axios.get("http://localhost:3001/medicamentos").then((response) => {
    setMedicamentos(response.data);
  });
}


useEffect(()=> {
  getMedicamentos();}
, []);

/////BARRA DE BUSQUEDA

const buscador = (e) => {
  setSearch(e.target.value.toLowerCase());
};

const FiltrarMedicamentos = medicamentoList.filter((medicamento) =>
  medicamento.nombre.toLowerCase().includes(search) ||
medicamento.presentacion.toLowerCase().includes(search) ||
  medicamento.precio.toString().includes(search) ||
  medicamento.stock.toString().includes(search)
);

// Paginacion para la tabla
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
const currentRecords = FiltrarMedicamentos.slice(indexOfFirstRecord, indexOfLastRecord);
const totalPages = Math.ceil(FiltrarMedicamentos.length / recordsPerPage);

const handlePrevPage = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};
const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};
const handleRecordsPerPage = (e) => {
  setRecordsPerPage(Number(e.target.value));
  setCurrentPage(1);
};

//funcion para actualizar
const update =()=> {
  Axios.put("http://localhost:3001/actualizar", {
    nombre: nombre,
    presentacion: presentacion,
    precio: precio,
    stock: stock,
    id:id
  }).then((response) => {
    alert("Medicamento actualizado");
    getMedicamentos(); 
  }).catch((error) => {
    console.error("Error al actualizar el medicamento:", error);
    alert("No se pudo actualizar el medicamento. Verifica la conexión con el servidor.");
    getMedicamentos();
  });
};

// funcion para eliminar
const eliminar = (id, nombre) => {
  if (window.confirm(`¿Estás seguro de eliminar el medicamento ${nombre}?`)) {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      getMedicamentos();
      limpiarMedicamento();
      alert("Medicamento eliminado");
    }).catch((error) => {
      console.error("Error al eliminar el medicamento:", error);
      alert("No se pudo eliminar el medicamento. Verifica la conexión con el servidor.");
    });
  }
}


// editar el medicamento
const editarMedicamento = (val) => {
  setNombre(val.nombre);
  setPresentacion(val.presentacion);
  setPrecio(val.precio);
  setStock(val.stock);
  setIde(val.id);
  setEditar(true);
}
// limpiar 
const limpiarMedicamento = () => {
  setNombre("");
  setPresentacion("");
  setPrecio("");
  setStock("");
  setEditar(false);
}


const retroceder=()=>{
  navigator('/menu'); // Regresa a la página anterior
}
  return (

    // boton de retroceder
    <div className="inventario-container">

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

{/* //fin de boton */}

    <h2>Gestión de Inventario</h2>
    {/* // formulario de inventario */}
    <form className="inventario-form">
      <div className="form-group">
        <label htmlFor="nombre">Nombre del Producto:</label>
        <input
          type="text"
          value={nombre} // Vincula el estado al campo
          onChange={(event) => {
            setNombre(event.target.value);
          }}
          placeholder="Ingrese el nombre del producto"
        />
      </div>

      <div className="form-group">
        <label htmlFor="presentacion">Presentación:</label>
        <input
          type="text"
          value={presentacion} // Vincula el estado al campo
          onChange={(event) => {
            setPresentacion(event.target.value);
          }}
          placeholder="Ingrese la Presentación"
        />
      </div>

      <div className="form-group">
        <label htmlFor="precio">Precio:</label>
        <input
          type="number"
          value={precio} // Vincula el estado al campo
          onChange={(event) => {
            setPrecio(event.target.value);
          }}
          placeholder="Ingrese el precio"
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          value={stock} // Vincula el estado al campo
          onChange={(event) => {
            setStock(event.target.value);
          }}
          placeholder="Ingrese el Stock"
        />
      </div>

      {editar ? (
        <div>
          <center>
            <button type="button" className="btn-submit" onClick={update}>
              Actualizar Medicamento
            </button>
            <br />
            <br />
            <button
              type="button"
              className="btn-submit"
              onClick={limpiarMedicamento} // Cancela la edición
            >
              Cancelar
            </button>
          </center>
        </div>
      ) : (
        <button
          type="button"
          className="btn-submit"
          onClick={add} // Agrega un nuevo medicamento
        >
          Agregar al inventario
        </button>
      )}
    </form>
    {/* // tabla de inventario */}
    
    <br></br>
          <div class="group">
    <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
      <g>
        <path
          d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
        ></path>
      </g>
    </svg>
  
    <input
      id="query"
      class="input"
      type="search"
      placeholder="Buscar"
      name="busqueda"
      value={search}
      onChange={buscador}
    />
  </div>

    <table className="inventario-table">
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Presentación</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            currentRecords.map((val) => (
              <tr key={val.id}>
                <td>{val.nombre}</td>
                <td>{val.presentacion}</td>
                <td>S/ {val.precio}</td>
                <td>{val.stock}</td>
                <td>
                  <button className="btn-blue" onClick={() => editarMedicamento(val)}>Editar</button>
                  <button className="btn-red" onClick={() => eliminar(val.id, val.nombre)}>Eliminar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="ventas-pagination">
        <span>
          Mostrando registros del {FiltrarMedicamentos.length === 0 ? 0 : indexOfFirstRecord + 1} al 
          {Math.min(indexOfLastRecord, FiltrarMedicamentos.length)} de un total de {FiltrarMedicamentos.length} registros
        </span>
        <div>
          <label htmlFor="records">Mostrar</label>
          <select id="records" value={recordsPerPage} onChange={handleRecordsPerPage}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          registros
        </div>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>Siguiente</button>
        </div>
      </div>

  </div>


  );
}

export default Inventario;