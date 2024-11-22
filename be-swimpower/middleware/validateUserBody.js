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
            minNumbers: 1,
        })
        .notEmpty()
        .withMessage("Password is not vallid, must be 8 characters long, at least one character uppercase, one character lowercase, one number and one special character "),
    
    body("role")
        .isString()
        .withMessage("Role is not valid, must be a string"),
    
    body("gender")
        .isString()
        .withMessage("Gender is not valid, must be a string"),
    
    body("avatar")
        .isString()
        .withMessage("Image is not valid, must be a string"),
    
    body("dob")
        .isDate()
        .withMessage("Dob is not vali, must be a data"),
    
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