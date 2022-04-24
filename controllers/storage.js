const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models/index');
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const ENGINE_DB = process.env.ENGINE_DB;
/**
 * listar los registros
 * @param {*} req
 * @param {*} res
 */

const getItems = async (req, res) => {
	try {
		console.log('hola');
		const data =
			ENGINE_DB == 'nosql'
				? await storageModel.find({})
				: await storageModel.findAll();
		res.send({ data: data });
	} catch (e) {
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
		const { id } = matchedData(req);
		const data =
			ENGINE_DB == 'nosql'
				? await storageModel.findById(id)
				: await storageModel.findOne({ where: { id } });
		res.send({ data });
	} catch (e) {
		handleHttpError(res, 'Error_get_item');
	}
};
/**
 * crear un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
	try {
		const { file } = req;
		console.log(req);
		const fileData = {
			filename: file.filename,
			url: `${PUBLIC_URL}/${file.filename}`,
		};
		const data = await storageModel.create(fileData);
		res.send({ data });
	} catch (e) {
		handleHttpError(res, 'Error_create_item');
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
		const dataFile =
			ENGINE_DB == 'nosql'
				? await storageModel.findById(id)
				: await storageModel.findOne({ where: { id } });
		ENGINE_DB == 'nosql'
			? await storageModel.deleteOne(id)
			: await storageModel.destroy({
					where: { id },
			  });
		const { filename } = dataFile;
		const filePath = `${MEDIA_PATH}/${filename}`;
		fs.unlinkSync(filePath);
		const data = {
			filePath,
			deleted: 1,
		};
		res.send({ data });
	} catch (e) {
		console.log(e);
		handleHttpError(res, 'Error_delete_item');
	}
};

module.exports = { getItems, getItem, createItem, deleteItem };
