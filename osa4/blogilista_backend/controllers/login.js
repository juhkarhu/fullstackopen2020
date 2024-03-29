/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')

loginRouter.post('/', async (request, response) => {
	const body = request.body
	// console.log('body', body)

	const user = await User.findOne({ username: body.username })
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(body.password, user.passwordHash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(
		userForToken,
		process.env.SECRET,
		{ expiresIn: 60*60 }
		// 60 sec * 60 sec = 1 hour
	)

	response
		.status(200)
		.send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter