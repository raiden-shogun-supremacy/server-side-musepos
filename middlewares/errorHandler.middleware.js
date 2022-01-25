require('express');

// Handling "404: NOT FOUND"
const errorNotfound = (req, res, next) => {
    const error = new Error(`Not found : ${req.originalUrl}`);

	res.status(404);
	// interrupt by showing the error in next procedure
	next(error);
};

// Handling other errors
const errorHandler = (err, req, res, next) => {
    // check the status code of the response we got
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	// send back new status
	res.status(statusCode);
	res.json({
		// the error we created will be thrown and display through this.
		status : res.statusCode,
		message : err.message
	});
}

module.exports = { errorNotfound, errorHandler };