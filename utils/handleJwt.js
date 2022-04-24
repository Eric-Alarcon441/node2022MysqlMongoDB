const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const getPropierties = require('../utils/handlePropiertiesEngine');
const propiertiesKey = getPropierties();
/**
 * Debes para el objeto del usuario
 * @param {*} user
 */
const tokenSign = async (user) => {
	const sign = await jwt.sign(
		{
			[propiertiesKey.id]: user[propiertiesKey.id],
			role: user.role,
		},
		JWT_SECRET,
		{
			expiresIn: '2h',
		}
	);
	return sign;
};
/**
 * Debes de pasar el token de session, el JWT
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt) => {
	try {
		return jwt.verify(tokenJwt, JWT_SECRET);
	} catch (e) {
		return null;
	}
};

module.exports = { tokenSign, verifyToken };
