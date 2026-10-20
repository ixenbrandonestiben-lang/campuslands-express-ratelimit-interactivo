export function validarAtuos(req, res, next){
    if(!req.body || typeof req.body !== "object"){
        return res.status(400).json({
            exito: false,
            error: "Se requiere enviar un cuerpo JSON válido en la solicitud."
        });
    }

    const { modelo, marca, potenciaHP, precio } = req.body;

    if(!modelo || typeof modelo !== "string" || modelo.trim().length === 0){
        return res.status(400).json({
            exito: false,
            error: "EL campo 'modelo' del auto deportivo es obligatorio."
        });
    }

    if(!marca || typeof marca !== "string" || marca.trim().length === 0){
        return res.status(400).json({
            exito: false,
            error: "El campo 'marca' es obligatorio (ej. Lamborghini, Ferrari, etc ...)"
        });
    }

    const PotenciaHP = Number(potenciaHP);

    if(potenciaHP === undefined || potenciaHP === null || isNaN(PotenciaHP) || PotenciaHP < 100 ){
        return res.status(400).json({
            exito: false,
            error: "El campo 'potenciaHP' es obligatorio (ej. 360, 220, 400)"
        });
    }

    const precioNum = Number(precio);

    if(precio === undefined || precio === null || isNaN(precioNum) || precioNum < 0){
        return res.status(400).json({
            exito: false,
            error: "El campo 'precio' deber ser un número válido mayor o igual a 0."
        });
    }

    next();
}