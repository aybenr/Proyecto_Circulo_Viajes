const CLAVE_STORAGE = "solicitudes_beneficios_app";

// Plan B con ejemplos por si falla la carga de datos.json
const DATOS_RESPALDO = {
  beneficios: [
    {
      id: 1,
      nombre: "Auxilio de estudio",
      descripcion: "Apoyo económico para cursos, diplomados o formación técnica."
    },
    {
      id: 2,
      nombre: "Día libre compensatorio",
      descripcion: "Jornada libre adicional por cumplimiento de metas o apoyo en eventos."
    },
    {
      id: 3,
      nombre: "Bono de salud y bienestar",
      descripcion: "Auxilio para consultas médicas, óptica o actividades de bienestar."
    }
  ],
  solicitudes: [
    {
      id: 1,
      empleado: "Andrés Ramos",
      area: "Operaciones / TI",
      beneficio: "Auxilio educativo",
      motivo: "Diplomado de desarrollo web",
      estado: "Pendiente"
    },
	{
      id: 101,
      empleado: "Laura Gómez",
      area: "Operaciones",
      beneficio: "Auxilio de estudio",
      motivo: "Diplomado en desarrollo web",
      estado: "En revisión"
    },
    {
      id: 102,
      empleado: "Carlos Pérez",
      area: "Soporte",
      beneficio: "Día libre compensatorio",
      motivo: "Trámite personal programado",
      estado: "Aprobada"
    }
  ]
};

let estadoApp = {
  beneficios: [],
  solicitudes: []
};

// Elementos del HTML
const listaBeneficiosEl = document.getElementById("lista-beneficios");
const selectBeneficioEl = document.getElementById("beneficio");
const tablaSolicitudesEl = document.getElementById("tabla-solicitudes");
const formSolicitudEl = document.getElementById("form-solicitud");
const btnReiniciarEl = document.getElementById("btn-reiniciar");

// Trae los datos iniciales con Axios; si falla, usa los datos de respaldo
async function cargarDatosIniciales() {
  try {
    const res = await axios.get("datos.json");
    estadoApp.beneficios = res.data.beneficios || DATOS_RESPALDO.beneficios;
    estadoApp.solicitudes = obtenerSolicitudesGuardadas(
      res.data.solicitudes || DATOS_RESPALDO.solicitudes
    );
  } catch (error) {
    console.log("No se pudo cargar datos.json, usando respaldo");
    estadoApp.beneficios = DATOS_RESPALDO.beneficios;
    estadoApp.solicitudes = obtenerSolicitudesGuardadas(DATOS_RESPALDO.solicitudes);
  }

  renderizarBeneficios();
  renderizarSelectBeneficios();
  renderizarSolicitudes();
}

// Revisa si ya hay solicitudes en localStorage; si no, guarda las iniciales
function obtenerSolicitudesGuardadas(solicitudesIniciales) {
  const guardadas = localStorage.getItem(CLAVE_STORAGE);

  if (guardadas) {
    return JSON.parse(guardadas);
  }

  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(solicitudesIniciales));
  return solicitudesIniciales;
}

// Guarda las solicitudes actuales en localStorage
function guardarSolicitudes() {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estadoApp.solicitudes));
}

// Pinta las tarjetas de beneficios en #lista-beneficios
function renderizarBeneficios() {
  if (!listaBeneficiosEl) return;

  listaBeneficiosEl.innerHTML = "";

  estadoApp.beneficios.forEach(function (beneficio) {
    listaBeneficiosEl.innerHTML += `
      <div class="item-beneficio">
        <h3>${beneficio.nombre}</h3>
        <p>${beneficio.descripcion}</p>
      </div>
    `;
  });
}

// Llena las opciones del <select id="beneficio">
function renderizarSelectBeneficios() {
  if (!selectBeneficioEl) return;

  selectBeneficioEl.innerHTML = `<option value="">Selecciona un beneficio...</option>`;

  estadoApp.beneficios.forEach(function (beneficio) {
    selectBeneficioEl.innerHTML += `
      <option value="${beneficio.nombre}">${beneficio.nombre}</option>
    `;
  });
}

// Pinta las filas en <tbody id="tabla-solicitudes">
function renderizarSolicitudes() {
  if (!tablaSolicitudesEl) return;

  tablaSolicitudesEl.innerHTML = "";

  estadoApp.solicitudes.forEach(function (solicitud, indice) {
    tablaSolicitudesEl.innerHTML += `
      <tr>
        <td>${solicitud.id}</td>
        <td>${solicitud.empleado}</td>
        <td>${solicitud.area}</td>
        <td>${solicitud.beneficio}</td>
        <td>${solicitud.motivo}</td>
        <td>${solicitud.estado}</td>
        <td><button type="button" onclick="eliminarSolicitud(${indice})">Eliminar</button></td>
      </tr>
    `;
  });
}

// Agrega una solicitud nueva al enviar el formulario
if (formSolicitudEl) {
  formSolicitudEl.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nuevaSolicitud = {
      id: estadoApp.solicitudes.length + 1,
      empleado: document.getElementById("empleado").value.trim(),
      area: document.getElementById("area").value.trim(),
      beneficio: document.getElementById("beneficio").value,
      motivo: document.getElementById("motivo").value.trim(),
      estado: "Pendiente"
    };

    estadoApp.solicitudes.push(nuevaSolicitud);
    guardarSolicitudes();
    renderizarSolicitudes();
    formSolicitudEl.reset();
  });
}

// Elimina una solicitud por su posición y actualiza localStorage
function eliminarSolicitud(indice) {
  estadoApp.solicitudes.splice(indice, 1);
  guardarSolicitudes();
  renderizarSolicitudes();
}

// Restablece las solicitudes base borrando lo guardado en localStorage
if (btnReiniciarEl) {
  btnReiniciarEl.addEventListener("click", function () {
    localStorage.removeItem(CLAVE_STORAGE);
    cargarDatosIniciales();
  });
}

// Arranca la aplicación al cargar la página
cargarDatosIniciales();