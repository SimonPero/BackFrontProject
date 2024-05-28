// src/utils/multer/multer.ts
import multer from 'multer';
import path from 'path';

// Configuración de Multer para el almacenamiento de productos
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/images/temp'));
  },
  filename: (req, file, cb) => {
    // Usa el nombre original del archivo
    cb(null, file.originalname);
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
