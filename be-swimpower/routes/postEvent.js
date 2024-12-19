const express = require("express")
const postEvent = express.Router()
const multer = require("multer")
const cloudStorage = require("../middleware/updateUserImageCloudinaryMiddleware")
const cloud = require("../middleware/updateUserImageCloudinaryMiddleware")


const PostEventModel = require("../models/PostEventModel")
const UserModel = require("../models/UserModel")
const badReqHandler = require("../middleware/badReqHandler")
const ValidatePostEvent = require("../middleware/validatePostEvent")



postEvent.post("/postEvent/create", [ValidatePostEvent], async (req, res, next) => {
    const { title, subtitle, paragraph, img } = req.body

    const user = await UserModel
        .findOne({ _id: req.body.user })
   
    if (!user) {
        return res
            .status(404)
            .send({
                statusCode: 404,
                message: "User not found",
            });
    }

    const newPostEvent = new PostEventModel({
        user: user._id,
        title: title,
        subtitle: subtitle,
        paragraph: paragraph,
        img: img
    })

    try {
        const savedPostEvent = await newPostEvent.save()
        await UserModel
            .updateOne(
                { _id: user._id },
                { $push: { postEvent: savedPostEvent } }
            )


        res
            .status(201)
            .send({
                statusCode: 201,
                message: "PostEvent created with successfully",
                savedPostEvent
            })
    } catch (e) {
        next(e)
    }
})

postEvent.post("/postEvent/uploads/cloud", cloud.single("img"), async (req, res, next) => {
    try {
        res
            .status(200)
            .json({
                img: req.file.path
            })

    } catch (e) {
        next(e)
    }
})

postEvent.get("/postEvent", async (req, res, next) => {
    const limit = parseInt(req.query.limit) || ""
    try {
        const postEvent = await PostEventModel
            .find()
            .limit(limit)

        if (postEvent.length === 0) {
            return res
                .status(400)
                .send({
                    statusCode: 400,
                    message: " Post not found"
                })

        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Post found with successfully",
                postEvent
            })
    } catch (e) {
        next(e)
    }
})

postEvent.delete("/postEvent/delete/:postEventId", async (req, res, next) => {
    const { postEventId } = req.params

    const postEvent = await PostEventModel
        .findById(postEventId)

    if (!postEvent) {
        return res
            .status(404)
            .send({
                statusCode: 404,
                message: "Post not found"
            })
    }

    try {
        await PostEventModel.findByIdAndDelete(postEventId)

        // const allPostEvent = await PostEventModel
        //     .find()

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Post deleted with successfully",
                
            })
    } catch (e) {
        next(e)
    }
})

postEvent.patch("/postEvent/uploadImg/:postEventId/img", cloud.single("img"), async (req, res, next) => {
    const { postEventId } = req.params

    const postEvent = await PostEventModel
        .findById(postEventId)

    if (!postEvent) {
        return res
            .status(404)
            .send({
                statusCode: 404,
                message: "Post not found"
            })
    }
    try {
        const updatePostEventData = { img: req.file.path }
        console.log(updatePostEventData);
        const options = { new: true }

        const result = await PostEventModel
            .findByIdAndUpdate(postEventId, updatePostEventData, options)


        res
            .status(200)
            .send({
                statuscode: 200,
                message: "Update image with successfully",
                result
            })

    } catch (e) {
        next(e)
    }

})

postEvent.patch("/postEvent/patch/:postEventId", async (req, res, next) => {
    const { postEventId } = req.params
    const postEvent = await PostEventModel
        .findById(postEventId)

    if (!postEvent) {
        return res
            .status(404)
            .send({
                statusCode: 404,
                message: "Post not found"
            })
    }

    try {
        const updatePostEventData = req.body
        const options = { new: true }

        const result = await PostEventModel
            .findByIdAndUpdate(postEventId, updatePostEventData, options)

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Update post data with successfully",
                result
            })
    } catch (e) {
        next(e)
    }
})

postEvent.get("/postEvent/postEventId/:postEventId", async (req, res, next) => {
    const { postEventId } = req.params

    try {
        const postEvent = await PostEventModel
            .findById(postEventId)

        if (postEvent.length === 0) {
            return res
                .status(404)
                .send({
                    statuscode: 404,
                    message: "Post not found"
                })
        }
        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Post found with successfully",
                postEvent
            })
    } catch (e) {
        next(e)
    }
})

module.exports = postEvent