const express = require("express");

const router = express.Router();


const {

    createFile,
    getFiles,
    updateFile,
    deleteFile

} = require("../controllers/fileController");



router.post(
    "/",
    createFile
);



router.get(
    "/:projectId",
    getFiles
);



router.put(
    "/:id",
    updateFile
);



router.delete(
    "/:id",
    deleteFile
);



module.exports = router;