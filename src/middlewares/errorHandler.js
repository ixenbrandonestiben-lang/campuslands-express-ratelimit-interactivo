export function errroHandler(err, req, res, next){
    console.error("🚨 [ERROR CAPTURADO EN EL SERVIDOR]:", err.message || err);

    const codigoEstado = err.statusCode || 500;
    const mensaje = err.message || "Error interno en el sevidor de autosDEportivos.";

    res.status(codigoEstado).json({
        exito: false,
        error: {
            codigo: codigoEstado,
            mensaje: mensaje
        }
    });
}