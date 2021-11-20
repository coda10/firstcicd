//Import Router
const router = require('express').Router();

//Import Vacancy Model
const Vacancy = require('../../Models/VacancyModel');

//Import NewsandEvents Model
const NewsandEvents = require('../../Models/Newsandevents');

//Import Course Model
const Course = require('../../Models/CoursesModel');

//Import Carousel Model
const Carousel = require('../../Models/CarouselModel');


//##########################################################
//                   {Get All Vacancy Endpoint}
//##########################################################
router.get('/vacancies', async (req, res)=>{
    try {
        //Fetch all vacancies
        const getAllVacancy = await Vacancy.find({}, {createdAt:0, updatedAt:0, __v: 0});
        //if(!getAllVacancy) return res.status(404).send({error: "Vacancy creation failed!"});

       //Send Token 
       res.send({message: "Fetch successful", "vacancies": getAllVacancy});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//##########################################################
//                     {Get News and Even Endpoint}
//##########################################################
router.get('/eventsandnews', async (req, res)=>{
    try {
        //Get Data
        const getEventsandNews = await NewsandEvents.find({}, {event_image: {image_id: 0}, createdAt: 0, updatedAt: 0, __v: 0});

        //Send Response 
        res.send({message: "Fetch successfully!", getEventsandNews});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//##########################################################
//                     {Get All Courses Endpoint}
//##########################################################
router.get('/courses', async (req, res)=>{
    try {
        //Get Data
        const getAllData = await Course.find({}, {course_image: {image_id: 0}, createdAt: 0, updatedAt: 0, __v: 0});

        //Send Response 
        res.send({message: "Fetch successfully!", getAllData});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//##########################################################
//                     {Get All Course Names Endpoint}
//##########################################################
router.get('/coursenames', async (req, res)=>{
    try {
        //Get Data
        const getAllData = await Course.find({}, {course_name: 1});

        //Send Response 
        res.send({message: "Fetch successfully!", getAllData});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//##########################################################
//                     {Get All Carousel Endpoint}
//##########################################################
router.get('/carousel', async (req, res)=>{
    try {
        //Get Data
        const getAllData = await Carousel.find({}, {carousel_image: {image_id: 0}, createdAt: 0, updatedAt: 0, __v: 0});

        //Send Response 
        res.send({message: "Fetch successfully!", getAllData});

    } catch (error) {
        res.status(404).send({error: error.message});
    }
});


//Export Router
module.exports = router;