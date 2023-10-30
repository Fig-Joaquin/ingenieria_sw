import multer from 'multer';
import sharp from 'sharp';

// Se le asigna el espacio y lo guarda con la fecha
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    }
});

// Helper del optimizador
const helperImg = (filePath, fileName, size=300) => {
    return sharp(filePath)
        .resize(size)
        .toFile(`optimize/${fileName}`);
}

// Validador de PNG
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png') {
        cb(null, true); // Acepta el archivo
    } else {
        cb(new Error('Solo se permiten archivos PNG'), false);
    }
};

const upload = multer({ storage, fileFilter });

// Funcion que sube el comprobante
const uploadComprobante = (req, res) => {
    upload.single('comprobante')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: 'Error al subir el comprobante' });
        }
        try {
            helperImg(req.file.path, `resize-${req.file.filename}`, 300);
            res.json({ data: 'Comprobante subido con éxito' });
        } catch (error) {
            return res.status(500).json({ error: 'Error al procesar la imagen' });
        }
    });
};


export {uploadComprobante};
