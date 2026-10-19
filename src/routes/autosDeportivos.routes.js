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