const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const StorageScheme = new mongoose.Schema(
	{
		url: {
			type: String,
		},
		filename: {
			type: String,
		},
	},
	{
		timestamps: true, //createdAt, updateAt
		versionKey: false,
	}
);

StorageScheme.plugin(MongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('storage', StorageScheme);
