module.exports = (sequelize, DataTypes) => {
	return sequelize.define('student', {
		student_id: {
			type: DataTypes.INTEGER(11),
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
		
		},
		class: {
			type: DataTypes.STRING(50),
		
		},
		section: {
			type: DataTypes.STRING(50),
			
		},
		roll_number: {
			type: DataTypes.STRING(10),
		},
	},
	{
		tableName: "student_student"
	});
}