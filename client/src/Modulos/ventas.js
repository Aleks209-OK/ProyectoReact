import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import jsPDF from 'jspdf';
import './ventas.css';
import { useNavigate } from 'react-router-dom';

function Ventas() {
  const [medicamentoList, setMedicamentoList] = useState([]); // Lista de medicamentos // Producto seleccionado

  const [idcliente, setIdecliente] = useState("");
  const [nombrecliente, setNombrecliente] = useState("");
  const [producto, setProducto] = useState("");
  const [dni, setDni] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precioventa, setPrecioventa] = useState("");
  const [total, setTotal] = useState("");
  const [fecha, setFecha] = useState("");
  const [clienteList, setClientes] = useState([]);
  const [editar, setEditar] = useState(false);
  const [searchcliente, setSearchcliente] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const navigator = useNavigate();

  // Función para obtener los medicamentos desde el backend
  const getMedicamentos = () => {
    Axios.get("http://localhost:3001/medicamentos").then((response) => {
      setMedicamentoList(response.data); // Asume que el backend devuelve un array de medicamentos
    }).catch((error) => {
      console.error("Error al obtener los medicamentos:", error);
    });
  };

  // Función para agregar cliente
  const agregarcliente = () => {
    Axios.post("http://localhost:3001/crearcliente", {
      nombrecliente: nombrecliente,
      producto: producto,
      dni: dni,
      cantidad: cantidad,
      precioventa: precioventa,
      total: total,
      fecha: fecha,
      
    }).then((response) => {
      alert("Venta registrada");
      getClientes();
      limpiarcliente();
    }).catch((error) => {
      console.error("Error al realizar la compra:", error);
      alert("No se pudo realizar la compra. Verifica la conexión con el servidor.");
    });
  };

  // Función para listar clientes
  const getClientes = () => {
    Axios.get("http://localhost:3001/clientes").then((response) => {
      setClientes(response.data);
    });
  };

  // Función para actualizar cliente
  const actualizarcliente = () => {
    Axios.put("http://localhost:3001/actualizarcliente", {
      idcliente: idcliente,
      nombrecliente: nombrecliente,
      producto: producto,
      dni: dni,
      cantidad: cantidad,
      precioventa: precioventa,
      total: total,
      fecha: fecha,
    }).then((response) => {
      alert("Cliente actualizado con exito");
      getClientes();
      limpiarcliente();
    }).catch((error) => {
      console.error("Error al actualizar el cliente:", error);
      alert("No se pudo actualizar el cliente. Verifica la conexión con el servidor.");
    });
  };

  // Función para eliminar cliente
  const eliminarcliente = (idcliente, nombrecliente) => {
    if (window.confirm(`¿Estás seguro de eliminar el cliente ${nombrecliente}?`)) {
      Axios.delete(`http://localhost:3001/deletecliente/${idcliente}`).then((response) => {
        getClientes();
        limpiarcliente();
        alert("Cliente eliminado con exito");
      }).catch((error) => {
        console.error("Error al eliminar el cliente:", error);
        alert("No se pudo eliminar el cliente. Verifica la conexión con el servidor.");
      });
    }
  };

  // Función para editar cliente
  const editarcliente = (idcliente, nombrecliente, producto, dni, cantidad, precioventa, total, fecha) => {
    setIdecliente(idcliente);
    setNombrecliente(nombrecliente);
    setProducto(producto);
    setDni(dni);
    setCantidad(cantidad);
    setPrecioventa(precioventa);
    setTotal(total);
    setFecha(fecha);
    setEditar(true);
  };

  // Función para limpiar formulario
  const limpiarcliente = () => {
    setIdecliente("");
    setNombrecliente("");
    setProducto("");
    setDni("");
    setCantidad("");
    setPrecioventa("");
    setTotal("");
    setFecha("");
    setEditar(false);
  };

  // Barra de búsqueda
  const buscador = (e) => {
    setSearchcliente(e.target.value.toLowerCase());
  };

  // Filtrado y paginación
  const FiltrarCliente = clienteList.filter((venta) =>
    venta.nombrecliente.toLowerCase().includes(searchcliente) ||
    venta.producto.toLowerCase().includes(searchcliente) ||
    venta.dni.toLowerCase().includes(searchcliente) ||
    venta.cantidad.toString().includes(searchcliente) ||
    venta.precioventa.toString().includes(searchcliente) ||
    venta.total.toString().includes(searchcliente) ||
    venta.fecha.toLowerCase().includes(searchcliente)
  );

  // Paginación
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = FiltrarCliente.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(FiltrarCliente.length / recordsPerPage);

  // Cambiar página
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

  useEffect(() => {
    getClientes();
    getMedicamentos();
  }, []);


  // Efecto para calcular el total automáticamente
  useEffect(() => {
    if (cantidad && precioventa) {
      setTotal(cantidad * precioventa); // Multiplica cantidad por precio
    } else {
      setTotal(""); // Limpia el total si no hay valores
    }
  }, [cantidad, precioventa]); // Se ejecuta cuando cambian cantidad o precio


///////

const generarFactura = (venta) => {
  const doc = new jsPDF();

  // Título del documento
  doc.setFontSize(18);
  doc.text("Factura de Venta", 20, 20);

  // Información del cliente y venta
  doc.setFontSize(12);
  doc.text(`Cliente: ${venta.nombrecliente}`, 20, 40);
  doc.text(`DNI: ${venta.dni}`, 20, 50);
  doc.text(`Producto: ${venta.producto}`, 20, 60);
  doc.text(`Cantidad: ${venta.cantidad}`, 20, 70);
  doc.text(`Precio Unitario: S/ ${venta.precioventa}`, 20, 80);
  doc.text(`Total: S/ ${venta.total}`, 20, 90);
  doc.text(`Fecha: ${venta.fecha.split('T')[0]}`, 20, 100);

  // Pie de página
  doc.setFontSize(10);
  doc.text("Gracias por su compra.", 20, 120);

  // Guardar el PDF
  doc.save(`Factura_${venta.nombrecliente}.pdf`);
};


const retroceder = () => {
  navigator("/menu"); 
}

//////



  return (
    <div className="ventas-container">
      {/* boton  */}
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

      {/* fin de boton */}
      <h2>Punto de Venta</h2>
      <form className="ventas-form">
        <div className="form-group1">
          <label htmlFor="nombreProducto">Nombre del Producto:</label>
          <input
            type="text"
            placeholder="Ingrese el nombre del Producto"
            list="medicamentos" // Vincula el input al datalist
            value={producto}
            onChange={(event) => {
              const selectedProducto = event.target.value;
              setProducto(selectedProducto);

              // Busca el producto en la lista de medicamentos
              const medicamento = medicamentoList.find(
                (med) => med.nombre === selectedProducto
              );

              // Si se encuentra el producto, actualiza el precio
              if (medicamento) {
                setPrecioventa(medicamento.precio);
              } else {
                setPrecioventa(""); // Limpia el precio si no se encuentra el producto
              }
            }}
          />
          <datalist id="medicamentos">
            {medicamentoList.map((medicamento, index) => (
              <option key={index} value={medicamento.nombre} />
            ))}
          </datalist>
        </div>

        <div className="form-group1">
          <label htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            placeholder="Ingrese el nombre del Cliente"
            value={nombrecliente}
            onChange={(event) => setNombrecliente(event.target.value)}
          />
        </div>

        <div className="form-group1">
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            placeholder="Ingrese el DNI"
            value={dni}
            onChange={(event) => setDni(event.target.value)}
          />
        </div>

        

        <div className="form-group1">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            placeholder="Ingrese la Cantidad"
            value={cantidad}
            onChange={(event) => setCantidad(event.target.value)}
          />
        </div>

        <div className="form-group1">
          <label htmlFor="fecha">Fecha de venta:</label>
          <input
            type="date"
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}
          />
        </div>

        <div className="form-group1">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            value={precioventa}
            onChange={(event) => setPrecioventa(event.target.value)}
            readOnly //Hace que el campo no se pueda modificar
          />
        </div>
        
        <div className="form-group1">
        <div className="ventas-total">
        <strong>Total Venta:</strong>
      </div>
          <input
            type="number"
            value={total}
            onChange={(event) => setTotal(event.target.value)}
            readOnly
          />
        </div>
      </form>

      <br></br>

      { editar ?(
      <div className="ventas-actions">
        <button className="btn-green" onClick={actualizarcliente}>Actualizar</button>
        <button className="btn-black" onClick={limpiarcliente}>Cancelar</button>
      </div>
      ) : (
        
        <div className="ventas-actions">
        <button className="btn-blue" onClick={agregarcliente}>Realizar Venta</button>
        <button className="btn-red" onClick={limpiarcliente}>Vaciar Listado</button>
      </div>
      )}
      {/* Barra de búsqueda */}
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
      value={searchcliente}
      onChange={buscador}
    />
  </div>
<br></br>
      {/* Tabla de ventas */}
      <table className="ventas-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cliente</th>
            <th>DNI</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            currentRecords.map((val, key) => {
              return (
                <tr key={val.idcliente}>
                  <td>{val.producto}</td>
                  <td>{val.nombrecliente}</td>
                  <td>{val.dni}</td>
                  <td>{val.cantidad}</td>
                  <td>S/ {val.precioventa}</td>
                  <td>S/ {val.total}</td>
                  <td>{val.fecha.split('T')[0]}</td>
                  <td>
                    <button className="btn-blue" onClick={() => {
                      editarcliente( val.idcliente, val.nombrecliente, val.producto,  val.dni, val.cantidad,  val.precioventa,  val.total,  val.fecha
                      );
                    }}>Editar</button>
                    <button className="btn-red" onClick={() => {
                      eliminarcliente(val.idcliente, val.nombrecliente);
                    }}>Eliminar</button>
                    <button className="btn-green" onClick={() => generarFactura(val)}>Factura</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <div className="ventas-pagination">
        <span>
          Mostrando registros del {FiltrarCliente.length === 0 ? 0 : indexOfFirstRecord + 1} al {Math.min(indexOfLastRecord, FiltrarCliente.length)} de un total de {FiltrarCliente.length} registros
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

export default Ventas;