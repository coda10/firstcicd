//Import Router
const router = require('express').Router();

//Import Admin Model
const AdminModel = require('../../Models/AdminModel');

//Import Gallery Model
const Gallery = require('../../Models/Gallery');

//Import Random Number Generator
const {verifyToken} = require('../../HelperFunctions/authToken');

//Import Multer Model
const {railwayImage, upload} = require('../../HelperFunctions/multerImageHandler');

//Import google apis
const {uploadFile, deleteFile, generatePublicUrl} = require('../../HelperFunctions/googledriveapis');



//##########################################################
//                     {Create GallaryEndpoint}
//##########################################################
router.post('/create', upload.fields([{name: "GallaryImages"}]), async (req, res)=>{
    try {
        const imageData = req.files;
        //
        console.log(imageData);

        //Send Response 
        res.send({message: "Multi Image successfully!", imageData});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//Export Router
module.exports = router;