const express    = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
});

const { Student } = require('./sequelize');
app.get("/student-list", (req, res) => {
  Student.findAll({raw:true}).then(function(students) {
    console.log(students);
  });
});