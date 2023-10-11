const multer = require("multer");
const path = require("path");

const configureMulter = (destinationFolder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
      const { citizenshipNo } = req.body;
      if (!citizenshipNo) {
        return cb(new Error("Citizenship number is required"));
      }

      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const fileName = citizenshipNo + "-" + uniqueSuffix + extension;
      cb(null, fileName);
    },
  });
  const imageFilter = (req, file, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true); // Accept the file
    } else {
      cb(
        new Error("Only image files (jpg, jpeg, png, gif) are allowed"),
        false
      );
    }
  };

  const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: 1024 * 1024 * 50, // 50MB file size limit
    },
  });

  return upload;
};
module.exports = configureMulter;
