export const createFileName = (file) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const extension = file.originalname.split(".")[1];

  return file.fieldname + "-" + uniqueSuffix + "." + extension;
};
