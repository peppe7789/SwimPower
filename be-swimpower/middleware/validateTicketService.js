const { body, validationResult } = require("express-validator")

const ValidateTicketServiceBody = [
    body("typeLesson")
        .isString()
        .notEmpty()
        .isLowercase()
        .withMessage("TypeLesson is not valid, must be a string lowercase"),
    
    body("instructor")
        .isString()
        .notEmpty()
        .isLowercase()
        .withMessage("Instructor is not valid, must be a string lowercase"),
    
    body("dateLesson")
        .isString()
        .notEmpty()
        .isLowercase()
        .withMessage("DateLesson is not valid, must be a string lowercase"),
    
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

module.exports = ValidateTicketServiceBody