import { useState, useEffect } from "react";
import ProjectWorkspace from "./ProjectWorkspace";
import "./ProjectDashboard.css";


function ProjectDashboard() {


    const [projects, setProjects] = useState([]);

    const [projectName, setProjectName] = useState("");

    const [workspaceType, setWorkspaceType] = useState("JavaScript");

    const [selectedProject, setSelectedProject] = useState(null);



    // =========================
    // LOAD PROJECTS
    // =========================

    useEffect(()=>{

        loadProjects();

    },[]);



    async function loadProjects(){

        try{


            const response = await fetch(

                "http://localhost:5000/api/projects",

                {

                    headers:{

                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );


            const data = await response.json();


            setProjects(data);



        }
        catch(error){

            console.log(
                "Load projects error",
                error
            );

        }


    }





    // =========================
    // CREATE PROJECT
    // =========================


    async function createProject(){


        if(projectName.trim()===""){

            return;

        }



        try{


            const response = await fetch(

                "http://localhost:5000/api/projects",

                {

                    method:"POST",

                    headers:{


                        "Content-Type":"application/json",


                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`

                    },


                    body:JSON.stringify({

                        name:projectName,

                        type:workspaceType

                    })


                }

            );



            const data = await response.json();



            if(response.ok){


                setProjects([

                    ...projects,

                    data.project

                ]);



                setProjectName("");

            }
            else{


                alert(data.message);


            }



        }
        catch(error){

            console.log(
                "Create project error",
                error
            );

        }


    }







    // =========================
    // DELETE PROJECT
    // =========================


    async function deleteProject(id){


        const confirmDelete = window.confirm(

            "Are you sure you want to delete this project?"

        );


        if(!confirmDelete){

            return;

        }



        try{


            const response = await fetch(

                `http://localhost:5000/api/projects/${id}`,

                {

                    method:"DELETE",

                    headers:{

                        Authorization:
                        `Bearer ${localStorage.getItem("token")}`

                    }


                }

            );



            const data = await response.json();



            if(response.ok){


                setProjects(

                    projects.filter(

                        project=>project._id !== id

                    )

                );



                if(
                    selectedProject &&
                    selectedProject._id===id
                ){

                    setSelectedProject(null);

                }



            }
            else{


                alert(data.message);


            }



        }
        catch(error){

            console.log(
                "Delete error",
                error
            );

        }



    }








    return (

        <div className="project-dashboard">


            <h1>
                My Projects
            </h1>



            <div className="create-box">


                <input

                type="text"

                placeholder="Enter project name"

                value={projectName}

                onChange={
                    e=>setProjectName(e.target.value)
                }

                />




                <select

                value={workspaceType}

                onChange={
                    e=>setWorkspaceType(e.target.value)
                }

                >


                    <option>
                        JavaScript
                    </option>


                    <option>
                        Python
                    </option>


                    <option>
                        Website Builder
                    </option>


                </select>




                <button

                onClick={createProject}

                >

                + Create Project

                </button>


            </div>







            {

            projects.length===0 ?


            (

                <div>

                    <h3>
                        No projects
                    </h3>

                    <p>
                        Create your first project.
                    </p>

                </div>

            )


            :


            (


            projects.map(project=>(



                <div

                key={project._id}

                className="project-card"

                >



                    <h3>

                    🚀 {project.name}

                    </h3>



                    <p>

                    Type: {project.type}

                    </p>




                    <button

                    onClick={

                        ()=>setSelectedProject(project)

                    }

                    >

                    🚀 Open Project

                    </button>






                    <button

                    onClick={

                        ()=>deleteProject(project._id)

                    }

                    style={{

                        background:"#dc2626",

                        marginLeft:"10px"

                    }}

                    >

                    🗑 Delete Project

                    </button>




                </div>


            ))


            )


            }








            {


            selectedProject &&


            <div>


                <hr/>


                <h2>

                Open Workspace:

                {" "}

                {selectedProject.name}


                </h2>




                <ProjectWorkspace

                projectId={selectedProject._id}

                projectType={selectedProject.type}

                />


            </div>


            }



        </div>


    );


}


export default ProjectDashboard;