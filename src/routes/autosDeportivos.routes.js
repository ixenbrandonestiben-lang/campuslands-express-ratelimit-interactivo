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

router.post('/', crearAutoLimiter, validarAtuos, (req, res) =>{
    const { modelo, marca, potenciaHP, precio } = req.body;

    const nuevoId = autosDeportivos.length > 0
        ? Math.max(...autosDeportivos.map((a) => a.id)) + 1
        : 1;

        const nuevoAuto = {
            id: nuevoId,
            modelo: modelo.trim(),
            marca: marca.trim(),
            potenciaHP: potenciaHP.trim(),
            precio: Number(precio)
        };

        autosDeportivos.push(nuevoAuto);

        res.status(201).json({
            exito: true,
            mensaje: "Atuo deportivo agregado exitosamente al catalogo en memoria",
            autosDeportivos: nuevoAuto
        });
})

router.put('/:id', validarAtuos, (req, res)=>{
    const idBuscado = parseInt(req.params.id, 10);

    if(isNaN(idBuscado)){
        return res.status(400).json({
            exito: false,
            error: "El parámetro ID debe ser un numero entero válido."
        });
    }

    const indice = autosDeportivos.findIndex((a) => a.id === idBuscado);

    if(indice === -1){
        return res.status(404).json({
            exito: false,
            error: `No se puede actualizar: No existe el auto deportivo con el ID: ${idBuscado}`
        });
    }

    const { modelo, marca, potenciaHP, precio } = req.body;

    autosDeportivos[indice] = {
        id: idBuscado,
        modelo: modelo.trim(),
        marca: marca.trim(),
        potenciaHp: potenciaHP.trim(),
        precio: Number(precio)
    };

    res.status(200).json({
        exito: true,
        mensaje: `Auto Deportivo con ID ${idBuscado} actualizado exitosamente`,
        autosDeportivos: autosDeportivos[indice]
    });
});


router.delete('/:id', (req, res) =>{
    const idBuscado = parseInt(req.paraq.id, 10);

    if(isNaN(idBuscado)){
        return res.status(400).json({
            exito: false,
            error: "El parámetro ID debe ser un numero entero válido."
        });
    }


    const indice = autosDeportivos.findIndex((a) => a.id === idBuscado);

    if(indice === -1 ){
        return res.status(400).json({
            exito: false,
            error: `No se puede eliminar: No existe Videojuego con ID ${idBuscado}`
        });
    }

    const [ autoEliminado ] = autosDeportivos.splice(indice, 1);

    res.status(200).json({
        exito: true,
        mensaje: `Auto deportivo con ID ${idBuscado} eliminado correctamente del catálogo.`,
        autosDeportivos: autoEliminado
    });
});

export default router;