module.exports = (sequelize, Datatypes) => {
    const Team = sequelize.define("Team", {
      name: {
        type: Datatypes.STRING
      }
    });
      // HOOks 
    // },{
    //   hooks:{
    //     beforeValidate:(Team,option)=>{
    //       Team.name = "IN";
    //      // console.log(Team)
    //     },
    //     afterValidate:(Team,option)=>{
    //       Team.name = "INDIA";
    //      // console.log(Team)
    //     }
    //   }
    // }
    //);
    // Team.addHook('beforeValidate','customname',(team,op) =>{
    //   team.name = "IN";
    // })
    // Team.removeHook('beforeValidate','customname')
    //association
// Team.associate = models => {
//     Team.hasMany(models.Player,{
//         onDelete:"cascade"
//     });
// };
//Team
  return Team;
};

