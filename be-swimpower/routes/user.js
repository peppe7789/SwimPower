const express = require('express')
const user = express.Router()
const UserModel = require("../models/UserModel")
const multer = require("multer")
const cloudStorage = require("../middleware/updateUserImageCloudinaryMiddleware")
const cloud = multer({ storage: cloudStorage })
const bcrypt = require("bcrypt")

const ValidateUserBody = require('../middleware/validateUserBody')



user.get("/user", async (req, res, next) => {

    try {
        const user = await UserModel
            .find() 

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
            .populate("subscription")

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

    const user = await UserModel
        .findById(userId)

    if (!user) {
        return res
            .status(400)
            .send({
                statusCode: 400,
                message: "No user found"
            })
    }

    try {
        const deleteUserData = req.body
        const options = { new: true }

        const result = await UserModel
            .findByIdAndDelete(userId, deleteUserData, options)

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "User deleted with successfully",
                user
            })
    } catch (e) {
        next(e)
    }
})

user.patch("/user/:userId/avatar", cloud.single("avatar"), async (req, res, next) => {

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
        const updateUserAvatarData = { avatar: req.file.path }
        const options = { new: true }

        const result = await UserModel
            .findByIdAndUpdate(userId, updateUserAvatarData, options)

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


module.exports = user