//Import Router
const router = require('express').Router();

//Import User
const AdminModel = require('../../Models/AdminModel');

//Import Bcrypt
const bcrypt = require('bcrypt');

//Import Random Number Generator
const {getRandomNumber, generateToken, verifyToken} = require('../../HelperFunctions/authToken');



//##########################################################
//                     {View All Users Endpoint}.
//##########################################################
router.get('/viewallusers', verifyToken, async(req, res)=>{
        try {
            //Get Admin email
            const email = req.adminEmail;
            //Check if Admin exist
            const checkUser = await AdminModel.findOne({email});
            if(!checkUser) return res.status(404).send({error: "User does not exist!"});
            //
            const getUsers = await AdminModel.find({}, {password:0});
            //Response
            res.send({message: "Fetch Successful!", Users: getUsers});
        } catch (error) {
            res.status(404).send({error: error.message});
        }
});


//##########################################################
//                     {Create User Endpoint}
//##########################################################
router.post('/createuser', verifyToken, async (req, res)=>{
    //Check if payload is not empty
    if(!req.body || req.body === "" || req.body === null || Object.entries(req.body).length < 6) return res.status(404).send({error: "Invalid Payload"});
    try {
        // Validate
        // await validateSchema.signup_Schema.validateAsync(req.body);
        //Get Signup data
        const signupData = req.body;
        const {email} = signupData;

        //check if email exist
        const chechEmail = await AdminModel.findOne({email});
        if(chechEmail) return res.status(404).send({error: "User already exist"});

        //Check if passwords match
        if(signupData.password !== signupData.confirmPassword) return res.status(404).send({error: "Password does not match!"});
    
        else{
            //Generate Salt
            const saltRounds = 10;
            const plainPassword = signupData.password;

            //Hash password
            bcrypt.genSalt(saltRounds, async function(err, salt) {
                bcrypt.hash(plainPassword, salt, async function(err, hash) {
                    //Create User Object
                    signupData.password = hash;
                    delete signupData.confirmPassword;
                    // Store data in DB.
                    const registerAdmin = await AdminModel(signupData).save();
                    if(!registerAdmin) return res.status(404).send({error: "User Creation Failed!"});
                    // Response
                    res.send({message: "User Creation Successful!"});
            });
            });
        }
    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//##########################################################
//                     {Update User User Endpoint}
//##########################################################


//##########################################################
//                     {Delete User Endpoint}
//##########################################################
router.get('/deleteuser/:user_id', verifyToken, async(req, res)=>{
    try {
        //Get Admin email
        const email = req.adminEmail;
        const _id = req.params.user_id;
        //Check if Admin exist
        const checkUser = await AdminModel.findOne({email});
        if(!checkUser) return res.status(404).send({error: "User does not exist!"});
        //
        const deleteUser = await AdminModel.findOneAndDelete({_id});
        if(!deleteUser) return res.status(404).send({error: "Deletion Failed!!"});
        //Response
        res.send({message: "Deletion Successful!"});
    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//Export Router
module.exports = router;