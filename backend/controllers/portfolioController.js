import { Portfolio } from "../model/portofolioModel.js";
import catchAsync from "../utils/catchAsync.js";

const addPortofolio = catchAsync(async (req, res, next) => {
  const { title, description, url } = req.body;

  let { id } = req.params; //user id from token

  // TODO : upload l file to cloud storage
  // delete it from the tmp storage

  await Portfolio.create({
    id,
    title,
    description,
    image: req.file.filename,
    url,
  });

  res.status(200).json({ message: "Portfolio added successfully" });
});

const updatePortfolio = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
  };

  if (req.file) {
    data.image = req.file.filename;
  }

  await Portfolio.findByIdAndUpdate(id, data, { new: true });

  res.status(200).json({ message: "Portfolio updated successfully" });
});

const deletePortfolio = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Portfolio.findByIdAndDelete(id);
  res.json({ message: "Portfolio deleted successfully" });
});

export { addPortofolio, updatePortfolio, deletePortfolio };
