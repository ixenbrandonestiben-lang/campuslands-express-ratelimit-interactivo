import express from "express";
import { logger } from "./middlewares/logger.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { errroHandler } from "./middlewares/errorHandler.js";
import { autosDeportivosRouter } from "./routes/autosDeportivos.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) =>{
    res.status(200).json({
        mensaje: "Bienvenido a la api de autos deportivos protegida on express-rate-limit (campuslands)",
        seguridad:  "Middleware express-rate-limit activo en /api/ (Max. 5 peticiones por minuto por IP",
        almacenamiento: "Arreglo de autos deportivos en memoria RAM (sin base de datos externa)",
        endpoint: {
            listar_autos: "Get /api/autosdeportivos",
            buscar_por_id: "Get /api/videojuegos/:id",
            crear_juego: "POST /api/videojuegos",
            actualizar_juego: "PUT /api/videojuegos/:id",
            eliminar_juego: "DELETE /api/videojuegos/:id"
        }
    });
});

app.use('/api/', apiLimiter);

app.use('/api/autosdeportivos', autosDeportivosRouter);

app.use((req, res) =>{
    res.status(404).json({
        exito: false,
        error: `La ruta '${req.method} ${req.originalUrl}' no existe en el servidor de autosDeportivos.`
    });
});


app.use(errroHandler);


if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n=============================================================`);
    console.log(` Servidor de Autos Deportivos iniciado en http://localhost:${PORT}`);
    console.log(`🛡️  Rate Limit activo en /api/autosdeportivos (Máx: 5 req / min)`);
    console.log(`=============================================================\n`);
  });
}
 
export default app;