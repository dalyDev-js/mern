import { Engineer } from "../model/engineerModel.js";

const getAllEngineers = (async(req,res,next)=>{
    let engineers = await Engineer.find()
  if(engineers){
    res.status(200).json({message:"All Engineers found",engineers})

  }else{
    res.status(404).json({message:"No Engineers found",engineers})

  }
})

const addEngineer = async(req,res,next) =>{

  let engineer = await Engineer.create(req.body)
  if(engineer){
    res.status(200).json({message:"Engineer added successfully",engineer})
  }else{
    res.status(404).json({message:"Engineer not added",engineer})
  }
}




const updateEducation = async (req, res, next) => {
  let engineerId = req.user.id; //user id from token
  let engineerEducation = await Engineer.findByIdAndUpdate(
    engineerId,
    {
      education: {
        title: req.body.title,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
      },
    },
    { new: true }
  );

  res
    .status(200)
    .json({ message: "Education added successfully", engineerEducation });
};

const addTitle = async (req, res, next) => {
  let engineerId = req.user.id;
  let engineerTitle = await Engineer.findByIdAndUpdate(
    engineerId,
    { title: req.body.title },
    { new: true }
  );
  res.status(200).json({ message: "Title added successfully", engineerTitle });
};

const addSkill = async (req, res, next) => {
  let engineerId = req.user.id;
  let { skillsToAdd } = req.body;
  const engineerSkill = await Engineer.findByIdAndUpdate(
    engineerId,
    { skills: { skillsToAdd } },
    { new: true }
  );

  res.json({ message: "Skills:", engineerSkill });
};

export { updateEducation, addTitle, addSkill,getAllEngineers,addEngineer };
