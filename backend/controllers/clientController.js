import { Client } from "../model/clientModel.js"
const getAllClients = (async (req,res,next) =>{

    let clients = await Client.find()

    if(clients){
        res.status(200).json(clients)
    }else{
        res.status(404).json({message: "No Clients found",clients})
    }
})

const getClientById = (async (req,res,next) =>{
     
    const id = req.params.id;
    const client = await Client.findById(id)

    if(client){
        res.status(200).json(client)
    }else{
        res.status(404).json({message: "No Client found",client})
    }
})


const addClient = async(req,res,next) =>{

    let client = await Client.create(req.body)
    if(client){
      res.status(200).json({message:"Client added successfully",client})
    }else{
      res.status(404).json({message:"Client not added",client})
    }
  }

export {
    getAllClients,
    getClientById,
    addClient
}

