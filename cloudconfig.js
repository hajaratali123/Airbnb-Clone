const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_APL_KEY,
    api_secret: process.env.CLOUD_APL_SECRET

});


  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'some-folder-name',
      allowedFormats:["png", "jpg", "jpeg"],
   
    },
  });
  const storage2 = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'userimage',
      allowedFormats:["png", "jpg", "jpeg"],
   
    },
  });

  module.exports ={
    cloudinary,
    storage,
    storage2

  }