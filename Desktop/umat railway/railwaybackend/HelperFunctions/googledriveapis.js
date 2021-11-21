//Import Config
const config = require("config");

//Import google apis
const {google} = require('googleapis');
const fs = require('fs');

const CLIENT_ID = config.get('googleDrive_default.client_id');
const CLIENT_SECRET = config.get('googleDrive_default.client_secret');
const REDIRECT_URI = config.get('googleDrive_default.redirect_uri');
const REFRESH_TOKEN = config.get('googleDrive_default.refresh_token');

//Create oAuth
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oauth2Client .setCredentials({refresh_token: REFRESH_TOKEN});

//Initialize Drive.
const drive = google.drive({version: 'v3', auth: oauth2Client});

//Upload File
const uploadFile = async (file_name, mimeType, file_body)=>{
        try {
            const response = await drive.files.create({ requestBody: { name: file_name, mimeType}, 
                                                        media: {mimeType, body: fs.createReadStream("public/images/" + file_body)} });
            //
            const fileId = response.data.id;
            //Change Permissions
            await drive.permissions.create({ fileId, requestBody: {role: "reader", type: "anyone"} });
            // Return Response
            //console.log("Initial response: ", response);
            return response;
        } catch (error) {
            console.log(error);
        }
};

//Upload Delete
const deleteFile = async fileId =>{
    try {
        const response = await drive.files.delete({ fileId });
        return response;
    } catch (error) {
        console.log(error);
    }
};

//Upload Delete
const generatePublicUrl = async fileId =>{
    try {
        await drive.permissions.create({ fileId, requestBody: {role: "reader", type: "anyone"} });
        const result = await drive.files.get({fileId, fields: 'webViewLink, webContentLink'});
        // Return Response
        return result;
    } catch (error) {
        console.log(error);
    }
};


//Export Router
module.exports = {
    uploadFile, deleteFile, generatePublicUrl
};