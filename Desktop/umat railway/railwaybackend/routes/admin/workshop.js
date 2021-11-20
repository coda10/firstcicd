//Import Router
const router = require('express').Router();

//Import Admin Model
const AdminModel = require('../../Models/AdminModel');

//Import Workshop Model
const Workshop = require('../../Models/WorkshopModel');

//Import Random Number Generator
const {verifyToken} = require('../../HelperFunctions/authToken');



//##########################################################
//                     {View Workshops Endpoint}
//##########################################################
router.get('/viewall', verifyToken, async (req, res)=>{
     try {
         //Get Data
         const email = req.adminEmail;

         //Check if email exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Check if email exist
         const createWorkshop = await Workshop.find({});

        //Send Token 
        res.send({message: "Fetch successful", "Workshops": createWorkshop});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {View One Workshop Endpoint}
//##########################################################
router.get('/getone/:workshop_id', verifyToken, async (req, res)=>{
     try {
         //Get Data
         const email = req.adminEmail;
         const _id = req.params.workshop_id;

         //Check if email exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Check if email exist
         const getWorkshop = await Workshop.findOne({_id});
         if(!getWorkshop) return res.status(404).send({error: "Workshop does not exist!"});

        //Send Token 
        res.send({message: "Fetch successful", "Workshop": getWorkshop});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                  {Create Workshop Endpoint}
//##########################################################
router.post('/create', verifyToken, async (req, res)=>{
    //Check if payload is not empty
    if(!req.body || req.body === "" || req.body === null || Object.entries(req.body).length < 6) return res.status(404).send({error: "Invalid Payload"});
     try {
         //Validate
         // await validateSchema.signin_Schema.validateAsync(req.body);

         //Get Data
         const workshop = req.body;
         const email = req.adminEmail;

         //Check if Admin exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Check create Workshop
         const createWorkshop = await Workshop(workshop).save();
         if(!createWorkshop) return res.status(404).send({error: "Workshop creation failed!"});

        //Send Response 
        res.send({message: "Workshop creation successful"});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {Update Workshop Endpoint}
//##########################################################
router.patch('/update/:workshop_id', verifyToken, async (req, res)=>{
    //Check if payload is not empty
    if(!req.body || req.body === "" || req.body === null || Object.entries(req.body).length < 6) return res.status(404).send({error: "Invalid Payload"});
     try {
         //Validate
         // await validateSchema.signin_Schema.validateAsync(req.body);

         //Get Data
         const _id = req.params.workshop_id;
         const workshop = req.body;
         const email = req.adminEmail;

         //Check if Admin exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Update Workshop
         const updateWorkshop = await Workshop.findOneAndUpdate({_id}, {$set: workshop});
         if(!updateWorkshop) return res.status(404).send({error: "Workshop update failed!"});

        //Send Response 
        res.send({message: "Workshop update successful"});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {Delete Workshop Endpoint}
//##########################################################
router.get('/delete/:workshop_id', verifyToken, async (req, res)=>{
     try {
         //Get Data
         const _id = req.params.workshop_id;
         const email = req.adminEmail;

         //Check if Admin exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Delete Workshop
         const deleteWorkshop = await Workshop.findOneAndDelete({_id});
         if(!deleteWorkshop) return res.status(404).send({error: "Workshop deletion failed!"});

        //Send Response
        res.send({message: "Workshop deletion successful"});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//Export Router
module.exports = router;