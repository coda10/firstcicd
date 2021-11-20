//Import Router
const router = require('express').Router();

//Import Admin Model
const AdminModel = require('../../Models/AdminModel');

//Import NewsandEvents Model
const NewsandEvents = require('../../Models/Newsandevents');

//Import Random Number Generator
const {verifyToken} = require('../../HelperFunctions/authToken');

//Import Multer Model
const {railwayImage, upload} = require('../../HelperFunctions/multerImageHandler');

//Import google apis
const {uploadFile, deleteFile, generatePublicUrl} = require('../../HelperFunctions/googledriveapis');



//##########################################################
//                     {Create News and Event Endpoint}
//##########################################################
router.post('/create', verifyToken, upload.single('EventImage'), async (req, res)=>{
    //Check if payload is not empty
    if(!req.body || req.body === "" || req.body === null || Object.entries(req.body).length !== 2) return res.status(404).send({error: "Invalid Payload"});
     try {
         //Get file data
         const {originalname, mimetype} = req.file;
         //Get body data 
         const event_and_newsData = req.body;
         const event_image = {};
         const email = req.adminEmail;

            //Validate
            // await validateSchema.signin_Schema.validateAsync(req.body);

            //Chech if User exist
            const chechEmail = await AdminModel.findOne({email});
            if(!chechEmail) return res.status(404).send({error: "User already exist"});

            //Upload Image
            const uploadImage = await uploadFile(originalname, mimetype, originalname);
            if(uploadImage.status !== 200) return res.status(404).send({error: "Image Upload failed!!", code: uploadImage.status, statusText: uploadImage.statusText});
            
            // Get File id
            const fileId = uploadImage.data.id;

            //Re-create event_and_newsData Object
            event_image.image_id = fileId;
            event_image.public_url = `https://drive.google.com/uc?id=${fileId}`;
            event_and_newsData.event_image = event_image;

            //Save Data
            const saveData = await NewsandEvents(event_and_newsData).save();
            if(!saveData) return res.status(404).send({error: "Save Failed!!"});

            //Send Response 
            res.send({message: "successfully!"});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {Get All News and Even Endpoint}
//##########################################################
router.get('/getall', verifyToken, async (req, res)=>{
        try {
            //Get Data
            const email = req.adminEmail;

            //Chech if User exist
            const chechEmail = await AdminModel.findOne({email});
            if(!chechEmail) return res.status(404).send({error: "User already exist"});

            //Get Data
            const getAllData = await NewsandEvents.find({}, {event_image: {image_id: 0}, createdAt: 0, updatedAt: 0, __v: 0});

            //Send Response 
            res.send({message: "Fetch successfully!", getAllData});

        } catch (error) {
            res.status(404).send({error: error.message});
        }
});


//##########################################################
//                     {Get One News and Even Endpoint}
//##########################################################
router.get('/getone/:eventandnews_id', verifyToken, async (req, res)=>{
        try {
            //Get Data
            const email = req.adminEmail;
            const _id = req.params.eventandnews_id;

            //Chech if User exist
            const chechEmail = await AdminModel.findOne({email});
            if(!chechEmail) return res.status(404).send({error: "User already exist"});

            //Get Data
            const getAllOne = await NewsandEvents.findOne({_id}, {event_image: {image_id: 0}, createdAt: 0, updatedAt: 0, __v: 0});
            if(!getAllOne) return res.status(404).send({error: "Event does not exist!!"});

            //Send Response 
            res.send({message: "Fetch successfully!", getAllOne});

        } catch (error) {
            res.status(404).send({error: error.message});
        }
});


//##########################################################
//                     {Delete News and Even Endpoint}
//##########################################################
router.get('/delete/:eventandnews_id', verifyToken, async (req, res)=>{
    try {
        //Get Data
        const email = req.adminEmail;
        const _id = req.params.eventandnews_id;

        //Chech if User exist
        const chechEmail = await AdminModel.findOne({email});
        if(!chechEmail) return res.status(404).send({error: "User already exist"});

        //Get Data
        const getData = await NewsandEvents.findOne({_id});
        if(!getData) return res.status(404).send({error: "Event does not exist!!"});
        
        //Get Image id
        const fileId = getData.event_image.image_id;

        //Delete image from Google Drive
        const deleteFromDrive = await deleteFile(fileId);
        if(deleteFromDrive.status !== 204) return res.status(404).send({error: "Failed to delete Image from Drive!", code: deleteFromDrive.status, statusText: deleteFromDrive.statusText});
        //console.log("Deletion Response =>: ", deleteFromDrive);

        //Delete Data From DB
        const deleteDataFromDb = await NewsandEvents.findOneAndDelete({_id});
        if(!deleteDataFromDb) return res.status(404).send({error: "Event Deletion Failed!!"});

        //Send Response 
        res.send({message: "Deletion successfully!"});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//Export Router
module.exports = router;