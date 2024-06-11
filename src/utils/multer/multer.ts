// src/utils/multer/multer.ts
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 

// Configuración de Multer para el almacenamiento de productos
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images/temp'));
  },
  filename: (req, file, cb) => {
    // Genera un nombre de archivo único
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: productStorage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      // Pasar 'null' como primer argumento y 'false' para rechazar el archivo
      cb(null, false);
      // Registrar el error para información adicional
      console.error('File is not an image');
    } else {
      cb(null, true);
    }
  },
});

export default upload;
