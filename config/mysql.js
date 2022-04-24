const { Sequelize } = require('sequelize');

const database = process.env.MSQL_DATABASE;
const username = process.env.MSQL_USER;
const password = process.env.MSQL_PASSWORD;
const host = process.env.MSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
	host,
	dialect: 'mysql',
});

const dbConnectMysql = async () => {
	try {
		await sequelize.authenticate();
		console.log('mysql conexion exitosa');
	} catch (e) {
		console.log('mysql error de conexion', e);
	}
};

module.exports = { sequelize, dbConnectMysql };
