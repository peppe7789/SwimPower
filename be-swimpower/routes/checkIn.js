const express = require("express")
const checkIn = express.Router()
const UserModel = require("../models/UserModel")
const CheckInModel = require("../models/CheckInModel")


checkIn.get("/checkIn", async (req, res, next) => {

    try {
        const checkIn = await CheckInModel
            .find()
        if (checkIn.length === 0) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "CheckIn not found"
                })
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "CheckIn found with successfully",
                checkIn
            })
    } catch (e) {
        next(e)
    }
})

checkIn.post("/checkIn/create", async (req, res, next) => {
    const { checkIn } = req.body

    const user = await UserModel
        .findOne({ _id: req.body.user })

    const role = user.role

    const newCheckIn = new CheckInModel({
        user: user._id,
        checkIn: checkIn
    })

    try {
        const savedChekIn = await newCheckIn.save()
        await UserModel
            .updateOne(
                { _id: user._id },
                {$push: {checkIn: savedChekIn}}
        )
        
        if (role === "admin") {
            return res
                .status(400)
                .send({
                    statusCode: 400,
                    message: "Request not possible for Role Admin"
                })
        }

        res
            .status(201)
            .send({
                statusCode: 201,
                message: "CheckIn created with successfully",
                savedChekIn
        })
    } catch (e) {
        next(e)
    }
})

checkIn.delete("/checkIn/delete/:checkInId", async (req, res, next) => {
    const { checkInId } = req.params

    const checkIn = await CheckInModel
        .findById(checkInId)
    
    if (!checkIn) {
        return res
            .status(404)
            .send({
                statusCode: 404,
                message: "CheckIn not found"
        })
    }

    try {
        const deleteCheckInData = req.body 
        const options = { new: true }
        
        const result = await CheckInModel
            .findByIdAndDelete(checkInId, deleteCheckInData, options)
        
        res
            .status(200)
            .send({
                statusCode: 200,
                message: "CheckIn deleted with successfully",
                checkIn
        })

    } catch (e) {
        next(e)
    }
    
})

module.exports = checkIn