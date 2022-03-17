const express = require('express');
const cors = require('cors');
const path = require('path')
const multer = require('multer');
const db = require('./db')
const app = express();

app.use(cors());
  
app.use(express.json())
app.use(express.urlencoded( { extended:true } ))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, __dirname);
    },
    filename: function (req, file, cb) {
       cb(null, file.originalname);
    }
 });
 
 var upload = multer({ storage: storage });
 app.use(express.static(__dirname));
 app.get('/', (req, res) => {
    res.send('Node js file upload rest apis');
});


app.post('/upload',upload.single('file'),(req, res, next) => {
    const file = req.file;
    if (!file) {
       return res.status(400).send({ message: 'Please upload a file.' });
    }
    var sql = "INSERT INTO `files`(`name`) VALUES ('" + req.file.filename + "')";
    console.log(sql)
    var query = db.query(sql, function(err, result) {
        if(err){
           console.log('file was not saved..',err)
        }else{
            console.log('File uploaded successfully.', file );
        }
    });
});
app.post('/uploadarray',upload.array('files',3),(req, res, next) => {
    const files = req.files;
    if (!files) {
       return res.status(400).send({ message: 'Please upload a file.' });
    }
    for(let f in files){
        var sql = "INSERT INTO `files`(`name`) VALUES ('" + files[f].filename + "')";
    
    var query = db.query(sql, function(err, result) {
        if(err){
           console.log('file was not saved..',err)
        }else{
            console.log('File uploaded successfully.', files );
        }
    });
}
});
app.listen(3000, () => {
    console.log(`Server is running on port 3000.`);

});
