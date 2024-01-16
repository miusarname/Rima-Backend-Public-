import rateLimit from "express-rate-limit";
import { Response } from "express";

export let limitGrt = () => {
    return rateLimit({
        windowMs: 50 * 1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req: any, res: Response) => {
            if (parseInt(req.headers["content-length"]) > 690) {
                res.status(413).send({
                    status: 413,
                    message: "Tamaño de la solicitud alcanzado"
                });
                return true;
            }
            return false;
        },
        message: (req:any, res:Response) => {
            res.status(429).send({
                status: 429,
                message: "Limite alcanzado"
            });
        }
    });
}


export let GetAll = () => {
    return rateLimit({
        windowMs: 60 * 1000,
        max: 50,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req: any, res: Response) => {
            if (parseInt(req.headers["content-length"]) > 690) {
                res.status(413).send({
                    status: 413,
                    message: "Tamaño de la solicitud alcanzado"
                });
                return true;
            }
            return false;
        },
        message: (req:any, res:Response) => {
            res.status(429).send({
                status: 429,
                message: "Limite alcanzado"
            });
        }
    });
}


export let search = () => {
    return rateLimit({
        windowMs: 30*60 * 1000,
        max: 15,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req: any, res: Response) => {
            if (parseInt(req.headers["content-length"]) > 690) {
                res.status(413).send({
                    status: 413,
                    message: "Tamaño de la solicitud alcanzado"
                });
                return true;
            }
            return false;
        },
        message: (req:any, res:Response) => {
            res.status(429).send({
                status: 429,
                message: "Limite alcanzado"
            });
        }
    });
}

export let post = () => {
    return rateLimit({
        windowMs:  30 * 60 * 1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req: any, res: Response) => {
            if (parseInt(req.headers["content-length"]) > 690) {
                res.status(413).send({
                    status: 413,
                    message: "Tamaño de la solicitud alcanzado"
                });
                return true;
            }
            return false;
        },
        message: (req:any, res:Response) => {
            res.status(429).send({
                status: 429,
                message: "Limite alcanzado"
            });
        }
    });
}

export let deleteLimiter = () => {
    return rateLimit({
        windowMs:   3600 * 1000,
        max: 5,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req: any, res: Response) => {
            if (parseInt(req.headers["content-length"]) > 690) {
                res.status(413).send({
                    status: 413,
                    message: "Tamaño de la solicitud alcanzado"
                });
                return true;
            }
            return false;
        },
        message: (req:any, res:Response) => {
            res.status(429).send({
                status: 429,
                message: "Limite alcanzado"
            });
        }
    });
}