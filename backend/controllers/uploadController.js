import multer from 'multer';
import sharp from 'sharp';
import RutaArchivo from '../models/rutaArchivo.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const helperImg = (filePath, fileName, size = 300) => {
  return sharp(filePath).resize(size).toFile(`optimize/${fileName}`);
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PNG'), false);
  }
};

const upload = multer({ storage, fileFilter });

const uploadComprobante = async (req, res) => {
  upload.single('comprobante')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error al subir el comprobante. Revise si su archivo es png' });
    }
    try {
      const filePath = req.file.path;
      const resizedFileName = `resize-${req.file.filename}`;
      const resizedFilePath = `optimize/${resizedFileName}`;

      await helperImg(filePath, resizedFileName, 300);

      // Guarda la ruta del archivo y el RUT del usuario en la base de datos
      const rutaArchivo = new RutaArchivo({
        original: filePath,
        resized: resizedFilePath,
        rutUsuario: req.body.rutUsuario, // RUT que está en el cuerpo de la solicitud.
      });

      await rutaArchivo.save();

      res.json({ data: 'Comprobante subido con éxito', ruta: rutaArchivo });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al procesar la imagen' });
    }
  });
};

export { uploadComprobante };
