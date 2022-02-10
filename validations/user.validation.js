const { body, validationResult } = require('express-validator');
const { set_response } = require('../helpers/apiresponser');
const validationrules = require('../helpers/validationrules')


exports.userStatusValidation = [
    body('_id', 'User id is required').notEmpty(),
    body('status', 'Status is required').notEmpty(),
    body('status').isIn(['active', 'inactive']),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        if (! await  validationrules.ObjectIdValidity(req?.body?._id)) {
            return set_response(res, null, 422, 'failed', ['user id must be a valid ObjectId'])
        }
        
        if (! await  validationrules.exists('users', '_id', req?.body?._id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }

        next()
    }
]

exports.getUserValidation = [
    body('_id', 'User id is required').notEmpty(),

    async (req, res, next) => {
        
        // Form level
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors?.errors?.map(item => item?.msg))
        }

        if (! await  validationrules.ObjectIdValidity(req?.body?._id)) {
            return set_response(res, null, 422, 'failed', ['user id must be a valid ObjectId'])
        }

        // DB level validations
        if (! await  validationrules.exists('users', '_id', req?.body?._id)) {
            return set_response(res, null, 422, 'failed', ['Invalid id'])
        }
        
        next()
    }
]



exports.createUserValidation = [
    body('name', 'Name is required').not().isEmpty().trim().escape(),
    body('email', 'Email is required').not().isEmpty().trim().escape(),
    body('email', 'Email must be an email').isEmail(),
    body('password', 'Password is required').notEmpty(),
    body('password', 'Password length min 8 characters').isLength({ min: 8 }),
    body('role_ids', 'Role is required').not().isEmpty(),
    body('role_ids', 'Role must be an array').isArray(),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return set_response(res, null, 422, 'failed', errors.errors.map(item => item.msg))
        }

        // DB level validations
        if (! await  validationrules.unique('users', 'email', req?.body?.email)) {
            return set_response(res, null, 422, 'failed', ['Duplicate email already exists'])
        }

        next()
    }
]