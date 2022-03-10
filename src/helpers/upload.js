const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fName = file.originalname.split('.');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${fName[0]}-${uniqueSuffix}.${fName[fName.length - 1]}`);
  },
});

const fileFilter = (req, file, cb) => {
  const supportedMime = [
    'image/jpeg',
    'image/png',
    'image/gif',
  ];
  if (supportedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(Error('Filetype mismatch!'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
