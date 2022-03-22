const multer = require("multer");

const csvfilter = (req,file,callback) => {
    if(file.mimetype.includes('csv')){
        callback(null, true)
    }else{
    callback('please upload only csv file..', false)
    }
};
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    },
});
var uploadFile = multer({ storage:storage, fileFilter:csvfilter });

module.exports = uploadFile;