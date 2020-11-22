const multer = require("multer");
const { v1: uuidv1 } = require("uuid");

const MIME_TYPES = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/images");
    },
    filename: (req, file, callback) => {
      const ext = MIME_TYPES[file.mimetype];
      callback(null, uuidv1() + "." + ext);
    },
  }),
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPES[file.mimetype];
    const error = isValid ? null : new Error("Invalid File Type");
    callback(error, isValid);
  },
});

module.exports = fileUpload;
