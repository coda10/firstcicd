//import Mongoose
const mongoose = require('mongoose');

//Define Schema
const vacancy_Schema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duties_responsibilities: {
        type: String,
        required: true
    },
    application_link: String,
    application_email: String,
    // application_link_is_available: Boolean,
    // application_email_is_available: Boolean
  },
{
    timestamps: true
}
);

//Initialize Schema
const Vacancy = mongoose.model('Vacancy', vacancy_Schema);

//Export Schema
module.exports = Vacancy;