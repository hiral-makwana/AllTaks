const db = require("../models");
const Tutorial = db.csvfiles;
const fs = require('fs');
const csv = require('fast-csv');
const sentmail = require ('../middelewares/sendmail')
exports.create = (req, res) => {
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message 
      });
    });
  };
  exports.upload = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
      let csvfiles = [];
      let path = "uploads/" + req.file.filename;
      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          csvfiles.push(row);
        })
        .on("end", () => {
          Tutorial.bulkCreate(csvfiles)
            .then(file => {
              res.status(200).send({
                data:file,
                message:
                  "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  };
  exports.getbooks = (req, res) => {
    Tutorial.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  };
  exports.sendmail = async (req, res) => {
    try{
    await sentmail("hiral@yopmail.com","testMail","hii..This is test Mail..")
    res.send("mail sent..")
    }catch(e){
      res.send(e)
    }
  }