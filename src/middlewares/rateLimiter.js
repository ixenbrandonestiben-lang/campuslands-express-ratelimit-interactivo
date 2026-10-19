import { rateLimit } from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 60 *1000,
    limit: 5,
    statusCode: 429,
    standardHeaders: true,
    message: {
        exito: false,
        status: 429,
        error: "Demaciadas solicitudes desde esta IP, por favor intenta de nuevo en un minuto.",
        detalle: "Has agotado tus 5 tokens disponibles en la ventana actual de 60 segundos."
    }
});


export const crearAutoLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 3,
    statusCode: 429,
    standardHeaders: "draft-7",
    standardHeaders: true,
    message: {
        exito: false,
        status: 429,
        error: "Limite de creacion alcanzado: Solo puedes registrar 3 Autos por minuto.",
        detalle: "Espera a que se reinicie la ventana de tiempo antes de enviar otro POST"
    }
});