require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);


async function checkModels(){

    try{

        const models = await genAI.listModels();

        console.log(models);

    }
    catch(error){

        console.log(error.message);

    }

}


checkModels();