module.exports = (sequelize, Datatypes) => {
    const Player= sequelize.define("Player", {
      name: {
        type: Datatypes.STRING
      },
      run:{
          type:Datatypes.STRING
      }
    });
Player.associate = models => {
    Player.belongsTo(models.Team,{
        foreignKey:{

            allowNull:false
        }
    });
};
  return Player;
};
  