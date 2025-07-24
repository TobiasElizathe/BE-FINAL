import connectDB from "./database"; // Función para conectar a la base de datos (MongoDB, MySQL, etc.)
import express from "express"; // Framework para crear el servidor HTTP
import cors from "cors"; // Middleware para permitir solicitudes cross-origin (desde frontend)
import routes from "./routes/index"; // Importa todas las rutas definidas en ./routes/index.ts o .js
import "dotenv/config"; // Carga variables de entorno desde archivo .env

const app = express(); // Crea la instancia del servidor Express
const PORT = process.env.PORT || 3000; // Puerto para el servidor (puede venir de .env o 3000 por defecto)

app.use(cors()); // Aplica middleware CORS para permitir llamadas externas (desde cliente)
app.use(express.json()); // Middleware para parsear JSON en el body de peticiones POST/PUT

connectDB(); // Ejecuta la función para conectar a la base de datos (importante hacerlo antes de usar rutas)

app.get("/", (req, res) => {
  // Ruta base / para testear que el servidor está activo
  res.send("Mira los Jugadores");
});

app.use("/api", routes); 
// Usa el router principal en la ruta /api, que agrupa todas las rutas de la API
// Por ejemplo /api/jugadores, /api/clubes, etc.

app.listen(PORT, () => {
  // Inicia el servidor y escucha en el puerto definido
  console.log(`Server is running on http://localhost:${PORT}`);
});
