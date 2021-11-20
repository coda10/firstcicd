//import Mongoose
const mongoose = require('mongoose');

//Define Schema
const newsandevents_Schema = new mongoose.Schema(
  {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      event_image: {
        public_url: {type: String, required: true},
        image_id: {type: String, required: true},
      }
  },
{
    timestamps: true
}
);

//Initialize Schema
const NewsAndEvents = mongoose.model('NewsAndEvents', newsandevents_Schema);

//Export Schema
module.exports = NewsAndEvents;