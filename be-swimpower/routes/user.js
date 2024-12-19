const express = require('express')
const user = express.Router()
const UserModel = require("../models/UserModel")
const multer = require("multer")
const cloudStorage = require("../middleware/updateUserImageCloudinaryMiddleware")
const cloud = require('../middleware/updateUserImageCloudinaryMiddleware')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const ValidateUserBody = require('../middleware/validateUserBody')



user.get("/user", async (req, res, next) => {
    const { page, pageSize = 12 } = req.query

    try {
        const user = await UserModel
            .find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .populate(['checkIn', 'ticketService'])
            .sort({ createdAt: -1 })  


        const count = await UserModel.countDocuments()
        const totalPages = Math.ceil(count / pageSize)

        if (user.length === 0) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "User not found"
                })
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Users found with successfully",
                user,
                count,
                totalPages,
            })
    } catch (e) {
        next(e)
    }
})

user.post("/user/create", [ValidateUserBody], async (req, res, next) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new UserModel({
        ...req.body,
        password: hashedPassword
    })

    try {
        const user = await newUser.save()

        res
            .status(201)
            .send({
                statusCode: 201,
                message: "User saved with successfully",
                user
            })
    } catch (e) {
        next(e)
    }
})

user.get("/user/userId/:userId", async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await UserModel
            .findById(userId)
            .populate(['checkIn', 'ticketService'])

        if (user.length === 0) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "User not found"
                })
        }
        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Users found with successfully",
                user
            })
    } catch (e) {
        next(e)
    }

})



user.delete("/user/delete/:userId", async (req, res, next) => {
    const { userId } = req.params


    const user = await UserModel.findById(userId)

    if (!user) {
        return res.status(400).send({
            statusCode: 400,
            message: "No user found"
        })
    }

    try {

        await UserModel.findByIdAndDelete(userId)


        const allUsers = await UserModel
            .find()


        res.status(200).send({
            statusCode: 200,
            message: "User deleted successfully",
            users: allUsers
        })
    } catch (e) {
        next(e)
    }
})

user.post("/user/uploads/cloud", cloud.single("avatar"), async (req, res, next) => {
    
    try {
        res
            .status(200)
            .json({
                avatar: req.file.path
            })


    } catch (e) {
        next(e)
    }
})

user.patch("/userpatch/:userId/avatar", cloud.single("avatar"), async (req, res, next) => {

    const { userId } = req.params

    const user = await UserModel
        .findById(userId)

    if (!user) {
        return res
            .status(404)
            .send({
                statusCode: 404,
                message: "User not found"
            })
    }
    try {
        const updateUserData = { avatar: req.file.path };
        const options = { new: true }

        const result = await UserModel
            .findByIdAndUpdate(userId, updateUserData, options)

        res
            .status(200)
            .send({
                statusCode: 200,
                message: 'Update image with successfully',
                result
            })

    } catch (e) {
        next(e)
    }

})

user.patch("/user/patch/:userId", async (req, res, next) => {
    const { userId } = req.params
    const user = await UserModel
        .findById(userId)

    if (!user) {
        return res
            .status(404)
            .send({
                statusCode: 404,
                message: "User not found"
            })
    }

    try {
        const updateUserData = req.body
        const options = { new: true }

        const result = await UserModel
            .findByIdAndUpdate(userId, updateUserData, options)

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Update User data with successfully",
                result
            })
    } catch (e) {
        next(e)
    }
})

user.post("/user/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                statusCode: 400,
                message: "Email e password sono obbligatori",
            });
        }

        const user = await UserModel
            .findOne({ email })

        if (!user) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "User not found with the given email"
                })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res
                .status(401)
                .send({
                    statusCode: 401,
                    message: 'Email or password not valid'
                })
        }

        const token = jwt.sign({
            _id: user._id, 
            email: user.email,
            role: user.role,
            name: user.name,
            surname: user.surname,
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        })

        res
            .header('authorization', `Bearer ${token}`)
            .status(200)
            .send({
                statusCode: 200,
                message: "Login successfully",
                token
            })

    } catch (e) {
        next(e)
    }
})

user.get('/user/bysurname/:surname', async (req, res, next) => {
    const { surname } = req.params;


    try {

        if (!surname) {
            return res.status(400).send({
                statusCode: 400,
                message: "Surname is required"
            });
        }

        const userFiltered = await UserModel
            .find({
                surname: {
                    $regex: '.*' + surname + '*.',
                    $options: 'i'
                }
            })
            .populate(['checkIn', 'ticketService']);


        if (!userFiltered || userFiltered.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "User not found"
            });
        }


        res.status(200).send({
            statusCode: 200,
            message: "User found",
            users: userFiltered,
        });

    } catch (e) {
        next(e);
    }
});

user.get('/user/byrole/:role', async (req, res, next) => {
    const { role } = req.params;


    try {

        if (!surname) {
            return res.status(400).send({
                statusCode: 400,
                message: "Role is required"
            });
        }

        const userFiltered = await UserModel
            .find({
                surname: {
                    $regex: '.*' + role + '*.',
                    $options: 'i'
                }
            })
            .populate(['checkIn', 'ticketService']);


        if (!userFiltered || userFiltered.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "User not found"
            });
        }


        res.status(200).send({
            statusCode: 200,
            message: "User found",
            users: userFiltered,
        });

    } catch (e) {
        next(e);
    }
});



module.exports = user