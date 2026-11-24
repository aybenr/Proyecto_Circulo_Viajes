import { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useRequests } from "./context/RequestContext.jsx";

const API_URL = "https://proyecto-circulo-viajes.onrender.com/api";

function Inicio() {
  const [beneficios, setBeneficios] = useState([]);
  const [empleado, setEmpleado] = useState("");
  const [area, setArea] = useState("");
  const [beneficio, setBeneficio] = useState("");
  const [motivo, setMotivo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { agregarSolicitud } = useRequests();

  useEffect(() => {
    axios.get(`${API_URL}/beneficios`)
      .then((respuesta) => setBeneficios(respuesta.data))
      .catch(() => setMensaje("No fue posible cargar los beneficios."));
  }, []);

  const registrarSolicitud = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await agregarSolicitud({ empleado, area, beneficio, motivo });
      setMensaje("Solicitud registrada correctamente.");
      setEmpleado("");
      setArea("");
      setBeneficio("");
      setMotivo("");
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al registrar la solicitud.");
    }
  };

  return (
    <main className="contenedor">
      <section className="tarjeta">
        <h2>Beneficios disponibles</h2>
        <div className="grid-beneficios">
          {beneficios.map((item) => (
            <article className="item-beneficio" key={item.id}>
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tarjeta">
        <h2>Registrar solicitud</h2>
        <form className="formulario" onSubmit={registrarSolicitud}>
          <div className="campo">
            <label>Nombre del empleado</label>
            <input
              value={empleado}
              onChange={(e) => setEmpleado(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Área</label>
            <input
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          <div className="campo">
            <label>Beneficio</label>
            <select
              value={beneficio}
              onChange={(e) => setBeneficio(e.target.value)}
              required
            >
              <option value="">Seleccione un beneficio</option>
              {beneficios.map((item) => (
                <option key={item.id} value={item.nombre}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label>Motivo de la solicitud</label>
            <input
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              required
            />
          </div>

          <button className="btn-primario" type="submit">
            Registrar solicitud
          </button>
        </form>

        {mensaje && <p>{mensaje}</p>}
      </section>
    </main>
  );
}

function Solicitudes() {
  const { solicitudes, eliminarSolicitud } = useRequests();
  const [mensaje, setMensaje] = useState("");

  const eliminar = async (id) => {
    try {
      await eliminarSolicitud(id);
      setMensaje("Solicitud eliminada correctamente.");
    } catch {
      setMensaje("No fue posible eliminar la solicitud.");
    }
  };

  return (
    <main className="contenedor">
      <section className="tarjeta">
        <div className="cabecera-tabla">
          <h2>Solicitudes registradas</h2>
          <Link to="/">Volver al inicio</Link>
        </div>

        {mensaje && <p>{mensaje}</p>}

        <div className="tabla-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empleado</th>
                <th>Área</th>
                <th>Beneficio</th>
                <th>Motivo</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.empleado}</td>
                  <td>{item.area}</td>
                  <td>{item.beneficio}</td>
                  <td>{item.motivo}</td>
                  <td>
                    <span className="badge-estado">{item.estado}</span>
                  </td>
                  <td>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminar(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {solicitudes.length === 0 && <p>No hay solicitudes registradas.</p>}
      </section>
    </main>
  );
}

function App() {
  return (
    <>
      <header className="encabezado">
        <h1>Portal de Beneficios de Empleados</h1>
        <p>Círculo de Viajes - Gestión de solicitudes</p>
        <nav>
          <Link to="/" style={{ color: "white", marginRight: "20px" }}>
            Inicio
          </Link>
          <Link to="/solicitudes" style={{ color: "white" }}>
            Ver solicitudes
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
      </Routes>
    </>
  );
}

export default App;
