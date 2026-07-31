import { useState } from "react";
import ProjectDashboard from "./ProjectDashboard";
import "./Dashboard.css";

import {
  FaJs,
  FaPython,
  FaGlobe,
  FaRocket,
  FaRobot
} from "react-icons/fa";


function Dashboard({ logout }) {


  const [showProjects, setShowProjects] = useState(false);



  const workspaces = [

    {
      title: "JavaScript Workspace",

      description:
      "Build modern JavaScript applications with AI assistance.",

      type:"JavaScript",

      icon:<FaJs />

    },


    {
      title:"Python Workspace",

      description:
      "Create AI scripts, automation and data applications.",

      type:"Python",

      icon:<FaPython />

    },


    {
      title:"Website Builder",

      description:
      "Create websites using HTML, CSS, JavaScript and Tailwind CSS.",

      type:"Website Builder",

      icon:<FaGlobe />

    }

  ];




  return (

    <div className="dashboard">


      {/* TOP NAVBAR */}

      <nav className="topbar">


        <div className="brand">

          <FaRobot />

          <h2>
            AI Code Workspace
          </h2>

        </div>



        <button
          className="logout-btn"
          onClick={logout}
        >

          Logout

        </button>


      </nav>





      {/* HERO SECTION */}


      <section className="hero">


        <h1>

          Build Applications With AI

        </h1>


        <p>

          Create, edit, manage and improve your projects
          with an intelligent AI coding assistant.

        </p>



        <button

          className="primary-btn"

          onClick={()=>setShowProjects(true)}

        >

          <FaRocket />

          Start Building

        </button>


      </section>







      {/* WORKSPACE CARDS */}



      <h2 className="section-title">

        Development Workspaces

      </h2>




      <div className="workspace-grid">


        {

          workspaces.map((workspace,index)=>(


            <div

              className="workspace-card"

              key={index}

            >



              <div className="workspace-icon">

                {workspace.icon}

              </div>




              <h3>

                {workspace.title}

              </h3>




              <p>

                {workspace.description}

              </p>




              <button

                onClick={()=>setShowProjects(true)}

              >

                Open Workspace

              </button>



            </div>


          ))

        }


      </div>







      {/* PROJECT DASHBOARD */}



      {

        showProjects &&

        <div className="projects-section">


          <ProjectDashboard />


        </div>


      }




    </div>


  );

}



export default Dashboard;