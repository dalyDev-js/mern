import { Engineer } from "../model/engineerModel.js";

// const getAllEngineers = (async(req,res,next)=>{
//     let engineers = await Engineer.find()
//     res.status(200).json({message:"Success",engineers})
// })



const addEducation = async (req, res, next) => {
  let engineerId = req.user.id; //user id from token
  let engineerEducation = await Engineer.findByIdAndUpdate(
    engineerId,
    { education: req.body.education },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Education added successfully", engineerEducation });
};

const addTitle = async (req, res, next) => {
  let engineerId = req.user.id; //user id from token
  let engineerTitle = await Engineer.findByIdAndUpdate(
    engineerId,
    { title: req.body.title },
    { new: true }
  );
  res.status(200).json({ message: "Title added successfully", engineerTitle });
};

const addSkill = async (req, res, next) => {
  let engineerId = req.user.id; //user id from token
  let { skillsToAdd } = req.body;
  const engineerSkill = await Engineer.findByIdAndUpdate(
    engineerId,
    { skills: { skillsToAdd } },
    { new: true }
  );
  res.json({message:"Skills:",engineerSkill});
};

const addCertificate = async (req, res, next) => {
  let engineerId = req.user.id; //user id from token
  let engineerCertificate = await Engineer.findByIdAndUpdate(
    engineerId,
    { certificates: req.body.certificates },
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Certificate added successfully", engineerCertificate });
};

export {  addEducation, addTitle, addSkill, addCertificate };
