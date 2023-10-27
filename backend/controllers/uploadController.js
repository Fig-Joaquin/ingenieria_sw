const multer = require('multer');
const sharp = require('sharp');

// Se le asigna el espacio y lo guarda con la fecha
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    }
});

// Helper del optimizador
const helperImg = (filePath, fileName, size = 300) => {
    return sharp(filePath)
        .resize(size)
        .toFile(`./optimize/${fileName}`);
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
    upload.single('file')(req, res, (err) => {
        
        if (err) {
            return res.status(400).json({ error: 'Error al subir el comprobante' });
        }
        helperImg(req.file.path, `resize-${req.file.filename}`, 300);
        res.json({ data: 'Comprobante subido con éxito' });
    });
};

export {uploadComprobante};
