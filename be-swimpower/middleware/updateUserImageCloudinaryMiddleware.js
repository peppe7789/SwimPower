const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APY_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'SWIMPOWERSERVERUPLOAD', 
        allowed_formats: ['jpg', 'png', 'gif', 'mp4','webp'], 
        format: async (req, file) => 'png',
        public_id: (req, file) => file.name
    },
});

const cloud = multer({storage:cloudStorage})

module.exports = cloud;
