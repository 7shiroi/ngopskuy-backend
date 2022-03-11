const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const responseHandler = require('./responseHandler');

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: (req) => {
      let { baseUrl } = req;
      if (baseUrl === '/profile') {
        baseUrl = '/user';
      }
      return `ngopskuy/uploads/${baseUrl}`;
    },
    format: async () => 'png', // supports promises as well
    public_id: (req) => {
      const timestamp = Date.now();
      let { baseUrl } = req;
      if (baseUrl === '/profile') {
        baseUrl = '/user';
      }
      return `${baseUrl}-${timestamp}`;
    },
  },
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const fName = file.originalname.split('.');
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
//     cb(null, `${fName[0]}-${uniqueSuffix}.${fName[fName.length - 1]}`);
//   },
// });

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
