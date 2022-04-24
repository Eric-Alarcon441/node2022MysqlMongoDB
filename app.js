require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morganBody = require('morgan-body');
const dbConnectNoSql = require('./config/mongo');
const { loggerStream, webhook } = require('./utils/handleLogger');
const { dbConnectMysql } = require('./config/mysql');
const ENGINE_DB = process.env.ENGINE_DB;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('storage'));

morganBody(app, {
	noColors: true,
	stream: loggerStream,
	skip: (req, res) => {
		return res.statusCode < 400;
	},
});

const port = process.env.PORT || 3000;

//Aqui invocamos a las rutas
app.use('/api', require('./routes'));

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});

ENGINE_DB === 'nosql' ? dbConnectNoSql() : dbConnectMysql();
