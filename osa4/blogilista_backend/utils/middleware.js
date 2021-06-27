const logger = require('./logger')

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:', request.path)
	logger.info('Body:', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unkonwn endpoint' })
}

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token'
		})
	}
	logger.error(error.message)
	next(error)
}

const tokenExtractor = (request, response, next) => {
	// console.log('aluksi request', request.token)
	const authorization = request.get('authorization')
	if (authorization !== undefined) {
		request.token = authorization.substring(7)
	}
	next()
}



module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
}