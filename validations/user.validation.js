const { body, validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const validationrules = require('../helpers/validationrules')


exports.getUserValidation = [
    body('id', 'User id is required').notEmpty(),
    body('id', 'User id is must be numeric').isNumeric(),

    async (req, res, next) => {
        
        // Form level
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors?.errors?.map(item => item?.msg))
        }

        // DB level validations
        if (! await  validationrules.exists('users', 'id', req?.body?.id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        
        next()
    }
]
