import multer from "multer";
import { createFileName } from "../../utils/helper.js";

const idVerification = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/my-uploads/validate-user-id");
  },
  filename: function (req, file, cb) {
    const filename = createFileName(file);
    cb(null, filename);
  },
});

function fileFilter(req, file, cb) {
  let filetypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!filetypes.includes(file.mimetype)) {
    cb(new Error("invalid extension"));
  }

  cb(null, true);
}

export default multer({
  storage: idVerification,
  fileFilter,
});
