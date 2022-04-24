const customHeader = (req, res, next) => {
	console.log(req.headers);
	next();
};

module.exports = customHeader;
