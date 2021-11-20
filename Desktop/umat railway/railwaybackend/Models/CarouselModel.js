//import Mongoose
const mongoose = require('mongoose');

//Define Schema
const carousel_Schema = new mongoose.Schema(
  {
       text: String,
       carousel_image: {
            public_url: {type: String, required: true},
            image_id: {type: String, required: true}
      }
  },
{
    timestamps: true
}
);

//Initialize Schema
const Carousel = mongoose.model('Carousel', carousel_Schema);

//Export Schema
module.exports = Carousel;