import { Engineer } from "../model/engineerModel.js";
import { Portfolio } from "../model/portofolioModel.js";
import User from "../model/userModel.js";
import catchAsync from "../utils/catchAsync.js";

const getPortfolios = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const portfolios = (await Portfolio.find({ user: id })).map((portfolio) => {
    return {
      _id: portfolio._id,
      title: portfolio.title,
      description: portfolio.description,
      image: `${portfolio.image}`,
      url: portfolio.url,
    };
  });

  res.status(200).json({ portfolios });
});

const addPortofolio = catchAsync(async (req, res, next) => {
  const { title, description, url } = req.body;
  const { id } = req.params; // User ID from token

  // Find the user and corresponding engineer
  const user = await User.findById(id);
  const engineer = await Engineer.findOne({ user: user._id });

  if (!engineer) {
    return res.status(404).json({ message: "Engineer not found" });
  }

  // Create a new portfolio
  const portfolio = await Portfolio.create({
    user: id,
    title,
    description,
    image: `http://localhost:8000/my-uploads/portfolios/${req.file.filename}`,
    url,
  });

  // Push the portfolio ID into the engineer's portfolios array
  engineer.portfolios.push(portfolio._id);

  // Save the updated engineer document
  await engineer.save();

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

export { addPortofolio, updatePortfolio, deletePortfolio, getPortfolios };
