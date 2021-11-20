//Import Router
const router = require('express').Router();

//Import Admin Model
const AdminModel = require('../../Models/AdminModel');

//Import Vacancy Model
const Vacancy = require('../../Models/VacancyModel');

//Import Random Number Generator
const {verifyToken} = require('../../HelperFunctions/authToken');



//##########################################################
//                     {View All Vacancy Endpoint}
//##########################################################
router.get('/viewall', verifyToken, async (req, res)=>{
     try {
         //Get Data
         const email = req.adminEmail;

         //Check if email exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Check if email exist
         const createVacancy = await Vacancy.find({});
         //if(!createVacancy) return res.status(404).send({error: "Vacancy creation failed!"});

        //Send Token 
        res.send({message: "Fetch successful", "vacancies": createVacancy});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {View One Vacancy Endpoint}
//##########################################################
router.get('/viewall/:vacancy_id', verifyToken, async (req, res)=>{
     try {
         //Get Data
         const email = req.adminEmail;
         const _id = req.params.vacancy_id;

         //Check if email exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Check if email exist
         const getVacancy = await Vacancy.findOne({_id});
         if(!getVacancy) return res.status(404).send({error: "Vacancy does not exist!"});

        //Send Token 
        res.send({message: "Fetch successful", "vacancy": getVacancy});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {Create Vacancy Endpoint}
//##########################################################
router.post('/create', verifyToken, async (req, res)=>{
    //Check if payload is not empty
    if(!req.body || req.body === "" || req.body === null || Object.entries(req.body).length < 3) return res.status(404).send({error: "Invalid Payload"});
     try {
         //Validate
         // await validateSchema.signin_Schema.validateAsync(req.body);

         //Get Data
         const vacancy = req.body;
         const email = req.adminEmail;

         //Check if Admin exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Check create vacancy
         const createVacancy = await Vacancy(vacancy).save();
         if(!createVacancy) return res.status(404).send({error: "Vacancy creation failed!"});

        //Send Response 
        res.send({message: "Vacancy creation successful"});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {Update Vacancy Endpoint}
//##########################################################
router.patch('/update/:vacancy_id', verifyToken, async (req, res)=>{
    //Check if payload is not empty
    if(!req.body || req.body === "" || req.body === null || Object.entries(req.body).length < 3) return res.status(404).send({error: "Invalid Payload"});
     try {
         //Validate
         // await validateSchema.signin_Schema.validateAsync(req.body);

         //Get Data
         const vacancyId = req.params.vacancy_id;
         const vacancy = req.body;
         const email = req.adminEmail;

         //Check if Admin exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Update Vacancy
         const updateVacancy = await Vacancy.findOneAndUpdate({_id: vacancyId}, {$set: vacancy});
         if(!updateVacancy) return res.status(404).send({error: "Vacancy update failed!"});

        //Send Response 
        res.send({message: "Vacancy update successful"});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//##########################################################
//                     {Delete Vacancy Endpoint}
//##########################################################
router.get('/delete/:vacancy_id', verifyToken, async (req, res)=>{
     try {
         //Get Data
         const vacancyId = req.params.vacancy_id;
         const email = req.adminEmail;

         //Check if Admin exist
         const checkAdmin = await AdminModel.findOne({email});
         if(!checkAdmin) return res.status(404).send({error: "User does not exist!"});

         //Delete Vacancy
         const deleteVacancy = await Vacancy.findOneAndDelete({_id: vacancyId});
         if(!deleteVacancy) return res.status(404).send({error: "Vacancy deletion failed!"});

        //Send Response
        res.send({message: "Vacancy deletion successful"});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//Export Router
module.exports = router;