const express = require('express');
const router = express.Router();
const {
	getItems,
	getItem,
	createItem,
	updateItem,
	deleteItem,
} = require('../controllers/tracks.js');
const { checkRol } = require('../middleware/rol.js');
const { authMiddleware } = require('../middleware/session.js');
const {
	validatorCreateItem,
	validatorGetItem,
} = require('../validators/tracks');

//localhost/tracks GET POST PUT DELETE
/**
 * Lista todos los items
 */
router.get('/', authMiddleware, getItems);
/**
 * Obtener el detalle de un item
 */
router.get('/:id', authMiddleware, validatorGetItem, getItem);
/**
 * Crear un registro
 */
router.post(
	'/',
	authMiddleware,
	checkRol(['admin', 'user', 'null']),
	validatorCreateItem,
	createItem
);
/**
 * Actualizar un registro
 */
router.put(
	'/:id',
	authMiddleware,
	validatorGetItem,
	validatorCreateItem,
	updateItem
);
/**
 * Borrar un registro
 */
router.delete('/:id', authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
