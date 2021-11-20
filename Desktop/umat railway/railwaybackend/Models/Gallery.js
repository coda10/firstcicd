//import Mongoose
const mongoose = require('mongoose');

//Define Schema
const gallery_Schema = new mongoose.Schema(
  {
       event_title: {
         type: String,
         required: true
       },
       image_urls: {
         type: Array,
        required:true
      }
  },
{
    timestamps: true
}
);

//Initialize Schema
const Gallery = mongoose.model('Gallery', gallery_Schema);

//Export Schema
module.exports = Gallery;