import multer, { StorageEngine, Multer } from "multer";
import { Request, Express } from "express";
import path from "path";

export const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request | any, file: Express.Multer.File, cb) => {
    // Directorio donde se guardarán los archivos
    cb(null, "uploads/");
  },
  filename: (req: Request | any, file: Express.Multer.File, cb) => {
    // Nombre personalizado del archivo en el servidor
    const nombreArchivo = req.body.nombreArchivo || file.originalname;
    cb(null, nombreArchivo);
  },
});

export const upload: Multer = multer({ storage });
