const mongoose = require("mongoose");


const fileSchema = new mongoose.Schema({

    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },


    name:{
        type:String,
        required:true
    },


    content:{
        type:String,
        default:""
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "File",
    fileSchema
);