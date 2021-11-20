//import Mongoose
const mongoose = require('mongoose');

//Define Schema
const workShop_Schema = new mongoose.Schema(
  {
      workshop_name: { type: String, required: true },
      start_date: { type: String, required: true },
      start_time: String,
      end_date: String,
      venue: {type: String, required: true},
      registration_link: {type: String, required: true}
  },
{
    timestamps: true
}
);

//Initialize Schema
const Workshop = mongoose.model('Workshop', workShop_Schema);

//Export Schema
module.exports = Workshop;