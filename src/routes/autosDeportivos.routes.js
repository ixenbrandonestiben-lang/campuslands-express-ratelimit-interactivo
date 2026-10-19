import { Router } from "express";
import { autosDeportivos } from "../data/autosDeportivos";
import { validarAtuos } from "../middlewares/validator";
import { crearAutoLimiter } from "../middlewares/rateLimiter";
import rateLimit from "express-rate-limit";

const router = Router();

router.get('/', (req, res)=>{
    res.status(200).json({
        exito: true,
        total: autosDeportivos.length,
        rateLimitInfo: req.rateLimit
        ? {
            limiteVentana: req.rateLimit.limit,
            usados: req.rateLimit.current,
            tokenRestantes: req.rateLimit.remaining
          }
        : undefined,
        datos: autosDeportivos
    });
});

router.get('/:id', (req, res) =>{
    const idBuscado = parseInt(req.params.id, 10);

    if(isNaN(idBuscado)){
        return res.status(400).json({
            exito: false,
            error: "El parametro ID debe ser un número entero válido."
        });
    }

    const autoEncontrado = autosDeportivos.find((a) => a.id === idBuscado);

    if(!autoEncontrado){
        return res.status(404).json({
            exito: false,
            error: `No se encontró ningún autoDeportivo con el ID ${idBuscado}`
        });
    }

    res.status(200).json({
        exito: true,
        mensaje: "Auto deportivo encontrado exitosamente.",
        autosDeportivos: autoEncontrado
    });
});