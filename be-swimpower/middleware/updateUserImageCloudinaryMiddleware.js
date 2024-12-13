const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'SWIMPOWERSERVERUPLOAD', 
        allowed_formats: ['jpg', 'png', 'gif', 'mp4','webp'], 
        public_id: (req, file) => {
            
            const timestamp = Date.now();
            const cleanName = file.originalname.replace(/\.[^/.]+$/, ""); 
            return `${cleanName}-${timestamp}`;
        },
    },
});


module.exports = cloudStorage;
