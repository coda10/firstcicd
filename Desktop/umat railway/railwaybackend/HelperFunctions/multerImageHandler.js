//Import Multer Package
const multer = require('multer');

//Import Path
const path = require('path');

//Image Validation Schema
const railwayImage = multer({
    limits: {
        fileSize: 1000000
    },fileFilter(req, file, callback){
        if(!file.originalname.match(/\.(png|PNG|JPG|jpg|JPEG|jpeg|mp4)/))
        return callback(new Error('File format not support'));
        callback(undefined, true);
    }
});

//
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/");
    },
    filename: function(req, file, cb) {
        //cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        cb(null, file.originalname);
    }
});

//
const upload = multer({
    storage: storage
});

//Export Module
module.exports = {
    railwayImage, upload
};