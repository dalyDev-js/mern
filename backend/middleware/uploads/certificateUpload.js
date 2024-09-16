import multer from "multer";
import { createFileName } from "../../utils/helper.js";

const certificateStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/my-uploads/certificates");
  },
  filename: function (req, file, cb) {
    const filename = createFileName(file);
    cb(null, filename);
  },
});

function certificateFileFilter(req, file, cb) {
  let filetypes = ["image/jpeg", "image/png", "image/jpg", "pdf"];

  console.log(file);
  if (!filetypes.includes(file.mimetype)) {
    cb(new Error("invalid extension"));
  }

  cb(null, true);
}

export default multer({
  storage: certificateStorage,
  fileFilter: certificateFileFilter,
});
