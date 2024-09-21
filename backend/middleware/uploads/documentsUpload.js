import multer from "multer";
import { createFileName } from "../../utils/helper.js";

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      cb(null, "./tmp/my-uploads/documents");
    } catch (error) {
      console.error("Error in destination function:", error);
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    try {
      const filename = createFileName(file);

      cb(null, filename);
    } catch (error) {
      console.error("Error in filename function:", error);
      cb(error);
    }
  },
});

function fileFilter(req, file, cb) {
  let filetypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];

  if (!filetypes.includes(file.mimetype)) {
    const error = new Error("Invalid file extension");
    console.error("File filter error:", error);
    return cb(error);
  }

  cb(null, true);
}

const upload = multer({
  storage: documentStorage,
  fileFilter: fileFilter,
}).single("file");

export default upload;
