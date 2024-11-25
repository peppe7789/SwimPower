const { body, validationResult } = require("express-validator")

const ValidateUserBody = [
    body("name")
        .isString()
        .notEmpty()
        .isLowercase()
        .withMessage("Name is not valid, must be a string and lowercase"),
    
    body("surname")
        .isString()
        .notEmpty()
        .isLowercase()
        .withMessage("Surname is not valid, must be a string and lowercase"),
    
    body("email")
        .isEmail()
        .notEmpty()
        .isLowercase()
        .withMessage("Email is not valid, must be a email and lowercase"),
    
    body("password")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .notEmpty()
        .withMessage("Password is not vallid, must be 8 characters long, at least one character uppercase, one character lowercase, one number and one special character "),
    
    
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .send({
                    statusCode: 400,
                    message: "Validation failled",
                    errors: errors.array()
                })
        }
        next()
    }
]

module.exports = ValidateUserBody