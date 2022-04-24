const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const UserScheme = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		edad: {
			type: Number,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
		},
		role: {
			type: ['user', 'admin'],
			default: 'user',
		},
	},
	{
		timestamps: true, //createdAt, updateAt
		versionKey: false,
	}
);
UserScheme.plugin(MongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model('users', UserScheme);
