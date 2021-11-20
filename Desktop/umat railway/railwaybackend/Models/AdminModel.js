//import Mongoose
const mongoose = require('mongoose');

//Define Schema
const admin_Schema = new mongoose.Schema(
  {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        isSuperAdmin: {
            type: Boolean,
            required: true
        }
   },
{
    timestamps: true
}
);

//Initialize Schema
const Admin = mongoose.model('Admin', admin_Schema);

//Export Schema
module.exports = Admin;