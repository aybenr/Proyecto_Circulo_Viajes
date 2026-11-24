const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();
const PORT = process.env.PORT || 3005;

// Configuración
app.use(cors());
app.use(express.json());

// Cargar datos iniciales
const datos = JSON.parse(
  fs.readFileSync(path.join(__dirname, "datos.json"), "utf8")
);

let beneficios = datos.beneficios;
let solicitudes = datos.solicitudes;

// Documentación Swagger
const swaggerDocument = YAML.load(
  path.join(__dirname, "swagger.yaml")
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Consultar beneficios
app.get("/api/beneficios", (req, res) => {
  res.status(200).json(beneficios);
});

// Consultar solicitudes
app.get("/api/solicitudes", (req, res) => {
  res.status(200).json(solicitudes);
});

// Registrar solicitud
app.post("/api/solicitudes", (req, res) => {
  const { empleado, area, beneficio, motivo } = req.body;

if (!empleado || !area || !beneficio || !motivo) {
  return res.status(400).json({
    mensaje: "Todos los campos son obligatorios."
  });
}

const beneficioExiste = beneficios.some(
  (b) => b.nombre === beneficio
);

if (!beneficioExiste) {
  return res.status(400).json({
    mensaje: "El beneficio seleccionado no existe."
  });
}

  const nuevaSolicitud = {
    id: solicitudes.length
      ? Math.max(...solicitudes.map((s) => s.id)) + 1
      : 1,
    empleado,
    area,
    beneficio,
    motivo,
    estado: "Pendiente"
  };

  solicitudes.push(nuevaSolicitud);

  res.status(201).json(nuevaSolicitud);
});

// Eliminar solicitud
app.delete("/api/solicitudes/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = solicitudes.findIndex((s) => s.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "No se encontró la solicitud."
    });
  }

  solicitudes.splice(indice, 1);

  res.status(200).json({
    mensaje: "Solicitud eliminada correctamente."
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger: http://localhost:${PORT}/api-docs`);
});
