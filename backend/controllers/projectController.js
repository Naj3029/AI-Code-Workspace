const Project = require("../models/Project");
const File = require("../models/File");


// =====================================
// CREATE PROJECT
// =====================================

exports.createProject = async (req, res) => {

    try {

        console.log("CREATE PROJECT API CALLED");


        const { name, type } = req.body;


        if (!name || !type) {

            return res.status(400).json({

                message: "Name and type required"

            });

        }



        const project = await Project.create({

            name,

            type,

            userId: req.user.id

        });



        let defaultFiles = [];



        // JavaScript Workspace

        if (type === "JavaScript") {

            defaultFiles = [

                {

                    projectId: project._id,

                    name: "index.js",

                    content:
`// JavaScript Workspace

console.log("Hello AI Workspace");`

                }

            ];

        }



        // Python Workspace

        else if (type === "Python") {

            defaultFiles = [

                {

                    projectId: project._id,

                    name: "main.py",

                    content:
`# Python Workspace

print("Hello AI Workspace")`

                }

            ];

        }



        // Website Builder

        else if (type === "Website Builder") {


            defaultFiles = [


                {

                    projectId: project._id,

                    name:"index.html",

                    content:
`<!DOCTYPE html>

<html>

<head>

<title>AI Website Builder</title>

<link rel="stylesheet" href="style.css">

</head>


<body>


<h1>Hello AI Website</h1>


<script src="script.js"></script>


</body>

</html>`

                },



                {

                    projectId: project._id,

                    name:"style.css",

                    content:
`body{

font-family:Arial;

padding:40px;

background:#111827;

color:white;

}`

                },



                {

                    projectId: project._id,

                    name:"script.js",

                    content:
`console.log("Website Builder Ready");`

                }


            ];


        }




        if(defaultFiles.length > 0){

            await File.insertMany(defaultFiles);

            console.log("DEFAULT FILES CREATED");

        }



        res.status(201).json({

            message:"Project created successfully",

            project

        });



    }

    catch(error){


        console.log(error);


        res.status(500).json({

            message:error.message

        });


    }

};





// =====================================
// GET USER PROJECTS
// =====================================


exports.getProjects = async(req,res)=>{


    try{


        const projects = await Project.find({

            userId:req.user.id

        });


        res.json(projects);


    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};






// =====================================
// DELETE PROJECT
// =====================================


exports.deleteProject = async(req,res)=>{


    try{


        const project = await Project.findById(req.params.id);



        if(!project){


            return res.status(404).json({

                message:"Project not found"

            });


        }




        if(project.userId.toString() !== req.user.id){


            return res.status(403).json({

                message:"Access denied"

            });


        }




        await File.deleteMany({

            projectId:req.params.id

        });



        await Project.findByIdAndDelete(req.params.id);



        res.json({

            message:"Project deleted successfully"

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};