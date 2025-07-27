const { validationResult } = require('express-validator');
const AppResponse = require('../utils/AppResponse');

const validate = (validations) => {
    return async (req, res, next) => {
        // Run all validations
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // Format errors for response
        const formattedErrors = {};
        errors.array().forEach(error => {
            if (!formattedErrors[error.param]) {
                formattedErrors[error.param] = error.msg;
            }
        });

        return AppResponse.validation(formattedErrors).send(res);
    };
};

module.exports = validate;
