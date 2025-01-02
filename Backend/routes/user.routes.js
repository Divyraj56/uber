const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post(
	'/register',
	[
		body('email').isEmail().withMessage('Invalid email'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long'),
		body('fullname')
			.exists()
			.withMessage('Fullname is required')
			.bail()
			.custom((value) => typeof value === 'object')
			.withMessage('Fullname must be an object'),
		body('fullname.firstname')
			.isLength({ min: 3 })
			.withMessage('First name must be at least 3 characters long'),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
	userController.registerUSer
);

module.exports = router;
