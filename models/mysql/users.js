const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
	'Users',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		edad: {
			type: DataTypes.NUMBER,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.ENUM(['user', 'admin']),
		},
	},
	{
		timestamps: true,
	}
);

module.exports = User;
