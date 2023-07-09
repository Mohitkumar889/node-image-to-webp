const { Validator } = require("node-input-validator");
const { validate, validations } = require("./index");

module.exports = () => {
	const authValidator = async (req, res, next) => {
	    const v = new Validator(req.body, {
			eId: validations.general.required,
			password: validations.general.required,
	    });
	    validate(v, res, next, req);
	};

	const validateAdminLogin = async (req, res, next) => {
	    const v = new Validator(req.body, {
	      email: validations.general.requiredString,
	      password: validations.general.requiredString,
	    });

	    validate(v, res, next, req);
	};


	return {
		authValidator,
		validateAdminLogin
	};

};