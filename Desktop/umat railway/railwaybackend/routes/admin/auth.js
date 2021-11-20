//Import Router
const router = require('express').Router();

//Import Admin Model
const AdminModel = require('../../Models/AdminModel');

//Import Bcrypt
const bcrypt = require('bcrypt');

//Import Random Number Generator
const {getRandomNumber, generateToken, verifyToken} = require('../../HelperFunctions/authToken');



//##########################################################
//                     {Signup Endpoint}
//##########################################################
router.post('/register', async (req, res)=>{
    //Check if payload is not empty
    if(!req.body || req.body === "" || req.body === null || Object.entries(req.body).length < 5) return res.status(404).send({error: "Invalid Payload"});
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
                    signupData.isSuperAdmin =true;
                    delete signupData.confirmPassword;
                    // Store data in DB.
                    const registerAdmin = await AdminModel(signupData).save();
                    if(!registerAdmin) return res.status(404).send({error: "Registration Failed"});
                    // Response
                    res.send({message: "Singup Successful!"});
            });
            });
        }
    } catch (error) {
        res.status(404).send({error: error.message});
    }
});



//##########################################################
//                     {Login Endpoint}
//##########################################################
router.post('/login', async (req, res)=>{
    //Check if payload is not empty
    if(!req.body || req.body === "" || req.body === null || Object.entries(req.body).length !== 2) return res.status(404).send({error: "Invalid Payload"});
     try {
         //Validate
         // await validateSchema.signin_Schema.validateAsync(req.body);

         //Get Data
         const {email, password} = req.body;

         //Check if email exist
         const checkEmail = await AdminModel.findOne({email});
         if(!checkEmail) return res.status(404).send({error: "User does not exist!"});

         //Compare Passwords
         const match = await bcrypt.compare(password, checkEmail.password);
         if(!match) return res.status(404).send({error: "Invalid Password"});

         //Generate Token
         const token = await generateToken({_id: checkEmail._id, first_name: checkEmail.first_name, 
                                                 last_name: checkEmail.last_name, email: checkEmail.email}, '58m');

        //Send Token 
        res.send({message: "Login Successful", token});

     } catch (error) {
         res.status(404).send({error: error.message});
     }
});


//Export Router
module.exports = router;