import { Certificate } from "../model/certificateModel.js";
import { Engineer } from "../model/engineerModel.js";
import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";

const getCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const engineer = await Engineer.findOne({ user: id });
  const certificates = (await Certificate.find({ engineer })).map((cert) => {
    return {
      _id: cert._id,
      name: cert.name,
      file: `${cert.file}`,
    };
  });

  res.status(200).json({ certificates });
});

const addCertificate = catchAsync(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params; // This is the user ID

  // Find the user and corresponding engineer
  const user = await User.findById(id);
  const engineer = await Engineer.findOne({ user: user._id });

  if (!engineer) {
    return res.status(404).json({ message: "Engineer not found" });
  }

  // Create a new certificate
  const certificate = await Certificate.create({
    name,
    file: `http://localhost:8000/my-uploads/certificates/${req.file.filename}`,
    engineer: engineer._id,
  });

  // Push the certificate into the engineer's certificates array
  engineer.certificates.push(certificate._id);

  // Save the updated engineer document
  await engineer.save();

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

export {
  addCertificate,
  updatedCertificate,
  deleteCertificate,
  getCertificate,
};
