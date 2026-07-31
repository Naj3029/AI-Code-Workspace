const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const fileRoutes = require("./routes/fileRoutes");
const chatRoutes = require("./routes/chatRoutes");


console.log("CHAT ROUTE FILE LOADED");


const app = express();


// Database Connection

connectDB();


// Middleware

app.use(cors());

app.use(express.json());



// Routes

console.log("Loading routes...");


app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/files", fileRoutes);

app.use("/api/chat", chatRoutes);



// Home Test

app.get("/", (req,res)=>{

    res.send(
        "AI Coding Workspace Backend Running"
    );

});



// Server Start

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});