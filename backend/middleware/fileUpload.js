import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/my-uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

function fileFilter(req, file, cb) {
  let filetypes = ["image/jpeg", "image/png", "image/jpg", "pdf"];
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  console.log(file);
  if (!filetypes.includes(file.mimetype)) {
    cb(new Error("invalid extension"));
  }
  // To reject this file pass `false`, like so:
  cb(null, false);

  // To accept the file pass `true`, like so:
  cb(null, true);

  // You can always pass an error if something goes wrong:
}

export const upload = multer({ storage: storage, fileFilter });
