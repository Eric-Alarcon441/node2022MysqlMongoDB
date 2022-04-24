const { handleHttpError } = require('../utils/handleError');
const { verifyToken } = require('../utils/handleJwt');
const { usersModel } = require('../models/index');
const getPropierties = require('../utils/handlePropiertiesEngine');
const propiertiesKey = getPropierties();
const ENGINE_DB = process.env.ENGINE_DB;

const authMiddleware = async (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			handleHttpError(res, 'No_token', 401);
			return;
		}

		const token = req.headers.authorization.split(' ').pop();
		const dataToken = await verifyToken(token);

		if (!dataToken) {
			handleHttpError(res, 'Not_Payload_data', 401);
			return;
		}

		const query = {
			[propiertiesKey.id]: dataToken[propiertiesKey.id],
		};

		const user =
			ENGINE_DB == 'nosql'
				? await usersModel.findOne(query)
				: await usersModel.findOne({ where: query });
		req.user = user;

		next();
	} catch (e) {
		handleHttpError(res, 'Not_Session', 401);
	}
};

module.exports = { authMiddleware };
