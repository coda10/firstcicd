//import Mongoose
const mongoose = require('mongoose');

//Define Schema
const courses_Schema = new mongoose.Schema(
  {
      course_name: { type: String, required: true },
      description: { type: String, required: true },
      course_structure: { type: Array, required: true },
      minimum_requirement: {type: String, required: true},
      course_image: {
        public_url: {type: String, required: true},
        image_id: {type: String, required: true}
      }
  },
{
    timestamps: true
}
);

//Initialize Schema
const Courses = mongoose.model('Courses', courses_Schema);

//Export Schema
module.exports = Courses;