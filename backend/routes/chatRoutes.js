const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    sendChat,
    getChatHistory
} = require("../controllers/chatController");


// ============================
// TEST ROUTE (NO LOGIN REQUIRED)
// ============================

router.get("/test", (req, res) => {

    res.send("Chat API working");

});



// ============================
// SEND MESSAGE TO AI
// ============================

router.post(
    "/",
    authMiddleware,
    sendChat
);



// ============================
// GET CHAT HISTORY
// ============================

router.get(
    "/:projectId",
    authMiddleware,
    getChatHistory
);



module.exports = router;