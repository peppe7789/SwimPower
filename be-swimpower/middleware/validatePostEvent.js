const { body, validationResult } = require("express-validator")

const ValidatePostEvent = [
    body("title")
        .isString()
        .notEmpty()
        .withMessage("Title is not valid, must be a string  lowercase"),
    
    body("subtitle")
        .isString()
        .notEmpty()
        .isLowercase()
        .withMessage("Subtitle is not valid, must be a string lowercase"),
    
    body("paragraph")
        .isString()
        .notEmpty()
        .withMessage("Paragraph is not valid, must be a string lowercase"),
    
    body("img")
        .isString()
        .notEmpty()
        .withMessage("Image is not valid, must be a string"),
    
    
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .send({
                statusCode:400,
                    message: "Validation failled",
                errors:errors.array()
            })
        }
        next()
    }
]

module.exports = ValidatePostEvent