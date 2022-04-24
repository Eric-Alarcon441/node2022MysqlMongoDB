const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');

const TracksScheme = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		album: {
			type: String,
		},
		cover: {
			type: String,
			validate: {
				validator: (req) => {
					return true;
				},
				message: 'ErrorUrl',
			},
		},
		artist: {
			name: {
				type: String,
			},
			nickname: {
				type: String,
			},
			nationality: {
				type: String,
			},
		},
		duration: {
			start: {
				type: Number,
			},
			end: {
				type: Number,
			},
		},
		mediaId: {
			type: mongoose.Types.ObjectId,
		},
	},
	{
		timestamps: true, //createdAt, updateAt
		versionKey: false,
	}
);

/**
 * Implemetar metodo propio con relacion a storage
 */
TracksScheme.statics.findAllData = function () {
	const joinData = this.aggregate([
		{
			$lookup: {
				from: 'storages',
				localField: 'mediaId',
				foreignField: '_id',
				as: 'audio',
			},
		},
		{
			$unwind: '$audio',
		},
	]);
	return joinData;
};

TracksScheme.statics.findOneData = function (id) {
	const joinData = this.aggregate([
		{
			$match: {
				_id: mongoose.Types.ObjectId(id),
			},
		},
		{
			$lookup: {
				from: 'storages',
				localField: 'mediaId',
				foreignField: '_id',
				as: 'audio',
			},
		},
		{
			$unwind: '$audio',
		},
	]);
	return joinData;
};

TracksScheme.plugin(MongooseDelete, { overrideMethods: 'all' });
module.exports = mongoose.model('tracks', TracksScheme);
