export function logger(req, res, next){
    const timestamp = new Date().toISOString();
    const metodo = req.method;
    const url = req.originUrl || req.url;

    console.llog(`[${timestamp}] ${metodo} -> ${url}`);

    next();
}