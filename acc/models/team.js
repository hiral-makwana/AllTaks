module.exports = (sequelize, Datatypes) => {
    const Team = sequelize.define("Team", {
      name: {
        type: Datatypes.STRING
      }
    });
Team.associate = models => {
    Team.hasMany(models.Player,{
        onDelete:"cascade"
    });
};
  return Team;
};