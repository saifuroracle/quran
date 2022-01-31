const { body, validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
// const validationrules = require('../helpers/validationrules')




exports.loginValidation = [
    body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }).trim(),
    body('password', 'Password is required').notEmpty().trim(),
    body('password', 'Password must be 8 or more characters').isLength({ min: 8 }).trim(),
    async (req, res, next) => {
        const errors = validationResult(req);

        // Form level
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        // if (! await  validationrules.exists('users', 'email', req?.body?.email)) {
        //     return set_response(res, null, 422, 'failed', ['Invalid email'])
        // }

        next()
    }
]

