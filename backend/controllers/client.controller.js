import { ClientModel } from "../model/clientModel.js"


const getAllProposals = async (req,res,next) =>{

    let proposals = await ClientModel.find()

    if(!proposals){
        return res.status(404).json({message:"No proposals found"})
    }

    res.status(200).json({message: "All proposals get successfully",proposals})
}
export {getAllProposals}