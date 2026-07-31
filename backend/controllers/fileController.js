const File = require("../models/File");


// Create new file

exports.createFile = async (req, res) => {

    try {

        const { projectId, name, content } = req.body;


        const file = await File.create({

            projectId,

            name,

            content

        });


        res.status(201).json({

            message: "File created successfully",

            file

        });


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};




// Get project files

exports.getFiles = async (req, res) => {

    try {


        const { projectId } = req.params;


        const files = await File.find({

            projectId

        });


        res.json(files);


    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

};




// Update file content

exports.updateFile = async (req,res)=>{


    try{


        const { id } = req.params;


        const { content } = req.body;



        const file = await File.findByIdAndUpdate(

            id,

            {
                content
            },

            {
                new:true
            }

        );


        res.json({

            message:"File updated successfully",

            file

        });


    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};




// Delete file

exports.deleteFile = async(req,res)=>{


    try{


        await File.findByIdAndDelete(

            req.params.id

        );


        res.json({

            message:"File deleted successfully"

        });


    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};