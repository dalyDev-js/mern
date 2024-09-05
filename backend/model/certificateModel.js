
import mongoose from "mongoose";

const certificateSchema = new Schema({
    name:{
        String,
        required: true,
        unique: true  
    } ,
    file: {
        type: String,
        required: true
    }
})