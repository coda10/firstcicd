//Import Router
const router = require('express').Router();

//Import Admin Model
const AdminModel = require('../../Models/AdminModel');

//Import Carousel Model
const CarouselModel = require('../../Models/CarouselModel');

//Import Random Number Generator.
const {verifyToken} = require('../../HelperFunctions/authToken');

//Import Multer Model
const {railwayImage, upload} = require('../../HelperFunctions/multerImageHandler');

//Import google apis
const {uploadFile, deleteFile, generatePublicUrl} = require('../../HelperFunctions/googledriveapis');



//##########################################################
//                   {Create Carousel Endpoint}
//##########################################################
router.post('/create', verifyToken, upload.single('CarouselImage'), async (req, res)=>{
    //Check if payload is not empty
    if(!req.body) return res.status(404).send({error: "Invalid Payload"});
     try {console.log(!req.body);
         //Get file data
         const {originalname, mimetype} = req.file;
         //Get body data 
         const carouselData = req.body;
         const carousel_image = {};
         const email = req.adminEmail;

            //Validate
            // await validateSchema.signin_Schema.validateAsync(req.body);

            //Chech if User exist
            const chechEmail = await AdminModel.findOne({email});
            if(!chechEmail) return res.status(404).send({error: "User Does not exist"});

            //Upload Image
            const uploadImage = await uploadFile(originalname, mimetype, originalname);
            if(uploadImage.status !== 200) return res.status(404).send({error: "Image Upload failed!!", code: uploadImage.status, statusText: uploadImage.statusText});
            
            // Get File id
            const fileId = uploadImage.data.id;

            //Re-create Carousel Object
            carousel_image.image_id = fileId;
            carousel_image.public_url = `https://drive.google.com/uc?id=${fileId}`;
            carouselData.carousel_image = carousel_image;

            //Save Data
            const saveData = await CarouselModel(carouselData).save();
            if(!saveData) return res.status(404).send({error: "Save Failed!!"});

            //Send Response 
            res.send({message: "successfully!"});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {Get All Carousel Endpoint}
//##########################################################
router.get('/getall', verifyToken, async (req, res)=>{
        try {
            //Get Data
            const email = req.adminEmail;

            //Chech if User exist
            const chechEmail = await AdminModel.findOne({email});
            if(!chechEmail) return res.status(404).send({error: "User does not exist"});

            //Get Data
            const getAllData = await CarouselModel.find({}, {carousel_image: {image_id: 0}, createdAt: 0, updatedAt: 0, __v: 0});

            //Send Response 
            res.send({message: "Fetch successfully!", getAllData});

        } catch (error) {
            res.status(404).send({error: error.message});
        }
});


//##########################################################
//                     .{Delete A Carousel Endpoint}
//##########################################################
router.get('/delete/:carousel_id', verifyToken, async (req, res)=>{
    try {
        //Get Data
        const email = req.adminEmail;
        const _id = req.params.carousel_id;

        //Chech if User exist
        const chechEmail = await AdminModel.findOne({email});
        if(!chechEmail) return res.status(404).send({error: "User does not exist"});

        //Get Data
        const getData = await CarouselModel.findOne({_id});
        if(!getData) return res.status(404).send({error: "Carousel does not exist!!"});
        
        //Get Image id
        const fileId = getData.carousel_image.image_id;

        //Delete image from Google Drive.
        const deleteFromDrive = await deleteFile(fileId);
        if(deleteFromDrive.status !== 204) return res.status(404).send({error: "Failed to delete Image from Drive!", code: deleteFromDrive.status, statusText: deleteFromDrive.statusText});
        //console.log("Deletion Response =>: ", deleteFromDrive);

        //Delete Data From DB
        const deleteDataFromDb = await CarouselModel.findOneAndDelete({_id});
        if(!deleteDataFromDb) return res.status(404).send({error: "Carousel Deletion Failed!!"});

        //Send Response 
        res.send({message: "Deletion successfully!"});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//Export Router
module.exports = router;