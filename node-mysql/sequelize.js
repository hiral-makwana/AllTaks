const Sequelize = require('sequelize');
const sequelize = new Sequelize('test_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const StudentModel = require('./models/student');
const Student = StudentModel(sequelize, Sequelize);
const jane = Student.build({ name: "Jane",roll_number:"1" });
console.log(jane instanceof Student); // true
console.log(jane.name); // "Jane"
 jane.save();
console.log('Jane was saved to the database!')
sequelize.sync({ force: false })
  .then(() => {
    console.log('\nDatabase table is created!')
});

module.exports = {
  Student
}