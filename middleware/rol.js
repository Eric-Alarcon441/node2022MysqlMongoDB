const { handleHttpError } = require('../utils/handleError');

/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
	try {
		const { user } = req;
		const rolesByUser = user.role;
		if (user.role != null) {
			const checkValueRol = roles.some((rolSingle) =>
				rolesByUser.includes(rolSingle)
			);
			if (!checkValueRol) {
				handleHttpError(res, 'User_not_permissions', 403);
				return;
			}
		}

		next();
	} catch (e) {
		console.log(e);
		handleHttpError(res, 'Error_permissions', 403);
	}
};

module.exports = { checkRol };
