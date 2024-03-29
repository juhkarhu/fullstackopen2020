const logger = require('./logger')
const User = require('../models/userModel')

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
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'token expired'
		})
	}
	logger.error(error.message)
	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		request.token = authorization.substring(7)
	}
	next()
}

// const userExtractor = (request, response, next) => {
// 	const authorization = request.get('authorization')
// 	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
// 		const id = authorization.substring(7)
// 		console.log('awdawda', id.id)
// 		request.user = User.findById(id)
// 	}
// 	next()
// }



module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
}