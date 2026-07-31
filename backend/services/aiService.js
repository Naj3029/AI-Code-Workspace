const axios = require("axios");


// Real AI Assistant using OpenRouter

async function askGemini(prompt, projectFiles = []) {


    try {


        let fileContext = "";



        if(projectFiles.length > 0){


            fileContext = projectFiles.map(file => {


                return `

File Name:
${file.name}


Code:
${file.content}


`;

            }).join("\n");


        }




        const systemPrompt = `

You are a professional AI coding assistant inside an AI-powered coding workspace.

Your job:

- Help developers build applications
- Analyze project files
- Generate clean production-ready code
- Debug errors
- Improve UI/UX
- Create websites using HTML, CSS, JavaScript and React
- Explain technical concepts clearly


Project Files:

${fileContext}


Always provide professional developer-level answers.


`;






        const response = await axios.post(


            "https://openrouter.ai/api/v1/chat/completions",


            {


                model: "deepseek/deepseek-chat",


                messages: [


                    {

                        role:"system",

                        content:systemPrompt

                    },


                    {

                        role:"user",

                        content:prompt

                    }


                ],


                temperature:0.7


            },


            {


                headers:{


                    "Authorization":

                    `Bearer ${process.env.OPENROUTER_API_KEY}`,


                    "Content-Type":

                    "application/json",


                    "HTTP-Referer":

                    "http://localhost:5173",


                    "X-Title":

                    "AI Coding Workspace"


                }


            }


        );





        return response.data.choices[0].message.content;



    }

    catch(error){



        console.log(

            "OpenRouter AI Error:",

            error.response?.data || error.message

        );



        return "AI service is temporarily unavailable. Please try again.";



    }



}



module.exports = askGemini;