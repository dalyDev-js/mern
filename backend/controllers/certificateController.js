import { Certificate } from "../model/certificateModel.js";
import catchAsync from "../utils/catchAsync.js";

const addCertificate = catchAsync(async (req, res) => {
  const { name } = req.body;
  console.log({
    name,
    file: req.file,
  });
  //   let user = req.user.id;
  //   let certificate = await Certificate.create({ name, file: req.file.filename });
  res.status(200).json({ message: "Certificate added successfully" });
});

const updatedCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = {
    name: req.body.name,
  };
  if (req.file) {
    data.file = req.file.filename;
  }
  const foundCertificate = await Certificate.findById(id);
  if (!foundCertificate) {
    return res.status(404).json({ message: "Certificate not found" });
  } else {
    await Certificate.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({ message: "Certificate updated successfully" });
  }
});

const deleteCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const certificate = await Certificate.findById(id);
  if (certificate) {
    await Certificate.findByIdAndDelete(id);
    res.status(200).json({ message: "Certificate deleted successfully" });
  } else {
    res.status(404).json({ message: "Certificate not found" });
  }
});

export { addCertificate, updatedCertificate, deleteCertificate };
