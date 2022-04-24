const { matchedData } = require('express-validator');
const { tracksModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const ENGINE_DB = process.env.ENGINE_DB;

/**
 * listar los registros
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
	try {
		const user = req.user;
		const data = await tracksModel.findAllData();
		res.send({ data, user });
	} catch (e) {
		console.log(e);
		handleHttpError(res, 'Error_get_items');
	}
};
/**
 * obtener un registro
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
	try {
		req = matchedData(req);
		const { id } = req;
		const data = await tracksModel.findOneData(id);
		res.send({ data });
	} catch (e) {
		console.log(e);
		handleHttpError(res, 'Error_get_Item');
	}
};
/**
 * crear un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
	try {
		const body = matchedData(req);
		const data = await tracksModel.create(body);
		res.send({ data });
	} catch (e) {
		handleHttpError(res, 'Error_create_item');
	}
};
/**
 * actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
	try {
		const { id, ...body } = matchedData(req);

		const data =
			ENGINE_DB == 'nosql'
				? await tracksModel.findOneAndUpdate(id, body)
				: await tracksModel.update(body, {
						where: {
							id: id,
						},
				  });
		res.send({ messageUpdated: data });
	} catch (e) {
		console.log(e);
		handleHttpError(res, 'Error_update_item');
	}
};
/**
 * eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
	try {
		const { id } = matchedData(req);
		console.log(id);
		const data =
			ENGINE_DB == 'nosql'
				? await tracksModel.delete({ _id: id })
				: await tracksModel.destroy({
						where: { id },
				  });

		res.send({ messageDeleted: data });
	} catch (e) {
		handleHttpError(res, 'Error_delete_item');
	}
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
