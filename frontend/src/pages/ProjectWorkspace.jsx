import { useState, useEffect } from "react";
import "./ProjectWorkspace.css";


function ProjectWorkspace({ projectId, projectType }) {


    const [files, setFiles] = useState([]);

    const [newFile, setNewFile] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const [fileContents, setFileContents] = useState({});

    const [message, setMessage] = useState("");

    const [chat, setChat] = useState([]);

    const [aiCode, setAiCode] = useState("");

    const [showPreview, setShowPreview] = useState(false);

    const [loading, setLoading] = useState(false);



    // =====================================
    // LOAD PROJECT FILES
    // =====================================


    useEffect(()=>{


        async function loadFiles(){


            try{


                const response = await fetch(

                    `http://localhost:5000/api/files/${projectId}`

                );


                const data = await response.json();



                setFiles(data);



                const contents = {};



                data.forEach(file=>{


                    contents[file.name] = file.content;


                });



                setFileContents(contents);



                if(data.length > 0){


                    setSelectedFile(data[0]);


                }



            }


            catch(error){


                console.log(error);


            }


        }



        if(projectId){


            loadFiles();


        }


    },[projectId]);





    // =====================================
    // LOAD CHAT HISTORY
    // =====================================


    useEffect(()=>{


        async function loadChat(){


            try{


                const response = await fetch(


                    `http://localhost:5000/api/chat/${projectId}`,

                    {

                    headers:{

                        "Authorization":

                        "Bearer " +

                        localStorage.getItem("token")

                    }

                    }

                );



                const data = await response.json();



                const history=[];



                data.forEach(item=>{


                    history.push({

                        role:"You",

                        text:item.message

                    });



                    history.push({

                        role:"AI",

                        text:item.response

                    });


                });



                setChat(history);


            }


            catch(error){


                console.log(error);


            }


        }



        if(projectId){


            loadChat();


        }


    },[projectId]);
        // =====================================
    // CREATE FILE
    // =====================================


    async function createFile(){


        if(newFile.trim()===""){


            return;


        }



        try{


            const response = await fetch(

                "http://localhost:5000/api/files",

                {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    projectId,

                    name:newFile,

                    content:""

                })


                }

            );



            const data = await response.json();



            setFiles([

                ...files,

                data.file

            ]);



            setFileContents({

                ...fileContents,

                [newFile]:""

            });



            setNewFile("");



        }


        catch(error){


            console.log(error);


        }


    }





    // =====================================
    // SAVE FILE
    // =====================================


    async function saveFile(){


        if(!selectedFile){


            return;


        }



        try{


            const response = await fetch(


                `http://localhost:5000/api/files/${selectedFile._id}`,

                {


                method:"PUT",


                headers:{


                    "Content-Type":"application/json"


                },


                body:JSON.stringify({


                    content:fileContents[selectedFile.name]


                })


                }


            );



            if(response.ok){


                alert("File saved successfully");


            }



        }


        catch(error){


            console.log(error);


        }


    }






    // =====================================
    // UPDATE CODE EDITOR
    // =====================================


    function updateCode(value){



        if(!selectedFile){


            return;


        }



        setFileContents({


            ...fileContents,


            [selectedFile.name]:value



        });



    }





    // =====================================
    // AI ASSISTANT
    // =====================================


    async function sendMessage(){



        if(message.trim()===""){


            return;


        }



        const userMessage = message;




        setChat(prev=>[


            ...prev,


            {


            role:"You",


            text:userMessage


            }


        ]);



        setMessage("");

        setLoading(true);




        try{



            const response = await fetch(



                "http://localhost:5000/api/chat/",


                {


                method:"POST",



                headers:{


                    "Content-Type":"application/json",


                    "Authorization":


                    "Bearer " +


                    localStorage.getItem("token")


                },



                body:JSON.stringify({


                    projectId,


                    message:userMessage,


                    files:fileContents


                })


                }



            );



            const data = await response.json();




            console.log("AI RESPONSE:",data);



            setAiCode(data.response);



            setChat(prev=>[


                ...prev,


                {


                role:"AI",


                text:data.response || "No AI response"


                }


            ]);



        }



        catch(error){



            console.log(error);



            setChat(prev=>[


                ...prev,


                {


                role:"AI",


                text:"AI service connection failed."


                }


            ]);



        }



        finally{


            setLoading(false);


        }




    }
        // =====================================
    // APPLY AI CODE
    // =====================================


    function applyAICode(){


        if(!selectedFile || !aiCode){


            return;


        }



        setFileContents({


            ...fileContents,


            [selectedFile.name]:aiCode


        });



        setSelectedFile({


            ...selectedFile,


            content:aiCode


        });



    }







    // =====================================
    // LIVE PREVIEW GENERATOR
    // =====================================


    function generatePreview(){



        if(projectType==="Website Builder"){



            return `


            <!DOCTYPE html>

            <html>

            <head>


            <style>


            ${fileContents["style.css"] || ""}


            </style>


            </head>



            <body>


            ${fileContents["index.html"] || ""}



            <script>


            ${fileContents["script.js"] || ""}


            </script>



            </body>


            </html>



            `;


        }




        if(projectType==="JavaScript"){



            return `


            <html>


            <body>


            <h2>JavaScript Preview</h2>


            <pre>


            ${fileContents["index.js"] || ""}


            </pre>



            </body>


            </html>


            `;



        }






        if(projectType==="Python"){



            return `


            <html>


            <body>


            <h2>Python Preview</h2>



            <pre>


            ${fileContents["main.py"] || ""}


            </pre>



            </body>


            </html>



            `;



        }



        return "";



    }







    return (


<div className="workspace">



<h2>

🚀 {projectType} Workspace

</h2>






<div className="file-panel">


<h3>

📁 Files

</h3>





<input


placeholder="New file name"


value={newFile}


onChange={(e)=>setNewFile(e.target.value)}


/>





<button onClick={createFile}>


➕ Add File


</button>






{


files.map(file=>(


<p


key={file._id}


onClick={()=>setSelectedFile(file)}



>


📄 {file.name}


</p>



))


}



</div>








<div className="editor-panel">



<h3>

💻 Code Editor

</h3>






{


selectedFile &&


<>



<h4>


{selectedFile.name}


</h4>






<textarea


value={

fileContents[selectedFile.name] || ""

}



onChange={(e)=>updateCode(e.target.value)}



/>







<button onClick={saveFile}>


💾 Save


</button>






<button

onClick={()=>setShowPreview(!showPreview)}

>


🌐 Live Preview


</button>






</>



}



</div>
{
showPreview &&


<div className="preview-panel">


<h3>

🌐 Live Preview

</h3>




<iframe


title="preview"


srcDoc={generatePreview()}


style={{

width:"100%",


height:"700px",


border:"none",


borderRadius:"16px"


}}


/>



</div>



}








<div className="chat-panel">



<h3>


🤖 AI Assistant


</h3>





<div className="chat-history">





{


loading &&


<p className="ai-loading">


AI is thinking...


</p>



}





{


chat.map((item,index)=>(


<div


key={index}


className={

item.role==="AI"

?

"ai-message"

:

"user-message"

}




>


<b>

{item.role}:

</b>



<pre>


{item.text}


</pre>



</div>



))


}





</div>







<input


placeholder="Ask AI about your project..."


value={message}


onChange={(e)=>setMessage(e.target.value)}



/>







<button onClick={sendMessage}>


🚀 Send


</button>






{


aiCode && selectedFile &&



<button


onClick={applyAICode}


>


⚡ Apply AI Code


</button>



}





</div>





</div>


);


}





export default ProjectWorkspace;