const { matchedData } = require('express-validator');
const { usersModel } = require('../models/index');
const { tokenSign } = require('../utils/handleJwt');
const { encrypt, compare } = require('../utils/handlePassword');
const { handleHttpError } = require('../utils/handleError');
const ENGINE_DB = process.env.ENGINE_DB;

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req
 * @param {*} res
 */
const registerCtrl = async (req, res) => {
	try {
		req = matchedData(req);
		const password = await encrypt(req.password);
		const body = { ...req, password };
		const dataUser = await usersModel.create(body);
		dataUser.set('password', undefined, { strict: false });

		const data = {
			token: await tokenSign(dataUser),
			user: dataUser,
		};
		res.send({ data });
	} catch (e) {
		console.log(e);
		handleHttpError(res, 'Error_register');
	}
};

const loginCtrl = async (req, res) => {
	try {
		req = matchedData(req);

		const queryModels =
			ENGINE_DB === 'nosql'
				? { email: req.email }
				: { where: { email: req.email } };

		const user = await usersModel.findOne(queryModels);
		if (!user) {
			handleHttpError(res, 'User_not_exist');
			return;
		}
		const hashPassword = user.password;

		const check = await compare(req.password, hashPassword);
		if (!check) {
			handleHttpError(res, 'Invalid_password', 401);
			return;
		}

		const data = {
			token: await tokenSign(user),
			user,
		};
		res.send({ data });
	} catch (e) {
		console.log(e);
		handleHttpError(res, 'Error_login');
	}
};

module.exports = { registerCtrl, loginCtrl };
