const Chat = require("../models/Chat");
const File = require("../models/File");

const askGemini = require("../services/aiService");



// ==========================
// SEND CHAT MESSAGE
// ==========================

exports.sendChat = async (req, res) => {


    try {


        const {

            projectId,

            message

        } = req.body;




        // Get project files for AI context

        const files = await File.find({

            projectId

        });





        // Send message to AI

        const aiResponse = await askGemini(

            message,

            files

        );





        // Save chat history

        const chat = await Chat.create({

            projectId,

            userId: req.user.id,

            message,

            response: aiResponse

        });





        // Professional API response

        res.json({

            response: aiResponse,

            chat

        });



    }


    catch (error) {


        console.log(
            "Chat Controller Error:",
            error.message
        );



        res.status(500).json({

            message: error.message

        });


    }


};






// ==========================
// GET CHAT HISTORY
// ==========================

exports.getChatHistory = async (req, res) => {


    try {



        const chats = await Chat.find({

            projectId: req.params.projectId

        })
        .sort({

            createdAt: 1

        });





        res.json(chats);



    }


    catch (error) {


        console.log(
            "Chat History Error:",
            error.message
        );



        res.status(500).json({

            message: error.message

        });


    }


};