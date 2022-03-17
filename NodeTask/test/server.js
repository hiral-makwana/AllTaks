const express = require("express");
const { Sequelize, DataTypes } = require('@sequelize/core');
const app = express();
const db = require('./models');
//const Team = db.teams;
const PORT = 3030;
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));   

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
});
});
//association
// app.get('/user', async (req, res) => {
//     try {
//       const user = await db.Team.findAll({
//           include:[db.Player]
//       });
//        res.send(user);
//     } catch (err) {
//       res.send(err);
//     }
//   })
// app.get('/hooks', async (req, res) =>{
//   let data = await db.Team.create({name:"india"})
//   res.send(data);
// })

//query interface
// app.get('/query', async (req,res) => {
//   const sequelize = new Sequelize(config.database, config.username, config.password, config);
//   const qi = sequelize.getQueryInterface();
  // qi.createTable('place',{
  //   name:DataTypes.STRING
  // });
  // qi.addColumn('place','address',{
  //   type:DataTypes.STRING
  // })
  // qi.changeColumn('place','address',{
  //     type:DataTypes.INTEGER
  //   })
//   qi.dropTable('place');
//   res.send("query")
// })

//sub queries... using hasmany and belongsTo
// const query = {
  
//     attributes:{
//       include:[
//         [
//           Sequelize.literal(`(SELECT COUNT (*) FROM players AS player WHERE player.TeamId = team.id AND player.run = 60)`),
//           'total'
//         ]
//       ]
//     }
  
// }
// app.get('/subq',async (req,res) => {
//  const d = await db.Team.findAll(query)
//     res.send(d)
// // console.log(d)
// });
app.post('/post', async (req,res) => {
  const data = {
    name:req.body.name
  }
db.Team.create(data).then(data => {
  res.send(data);
})
.catch(err => {
  res.status(500).send({
    message:
      err.message 
  });
});
})