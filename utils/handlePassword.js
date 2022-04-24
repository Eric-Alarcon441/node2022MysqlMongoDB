const bcryptjs = require('bcryptjs');

/**
 * Contraseña sin encriptar
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) => {
	return await bcryptjs.hash(passwordPlain, 10);
};
/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = async (passwordPlain, hashPassword) => {
	return await bcryptjs.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
