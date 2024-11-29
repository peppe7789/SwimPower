
const express = require("express")
const ticketService = express.Router()
const TicketServiceModel = require("../models/TicketServiceModel")
const UserModel = require("../models/UserModel")
const ValidateTicketService = require("../middleware/validateTicketService")


ticketService.get("/ticketService", async (req, res, next) => {

    try {
        const ticketService = await TicketServiceModel
            .find()
        if (ticketService.length === 0) {
            return res
                .status(400)
                .send({
                    statusCode: 400,
                    message: "Ticket not found"
                })
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Ticket found with successfully",
                ticketService
            })
    } catch (e) {
        next(e)
    }
})


ticketService.post("/ticketService/create",[ValidateTicketService], async (req, res, next) => {

    const { typeLesson, instructor, dateLesson } = req.body

    const user = await UserModel
        .findOne({ _id: req.body.user })

    const role = user.role

    const newTicketService = new TicketServiceModel({
        user: user._id,
        typeLesson: typeLesson,
        instructor: instructor,
        dateLesson: dateLesson
    })

    try {
        const savedTicketService = await newTicketService.save()
        await UserModel
            .updateOne(
                { _id: user._id },
                { $push: { ticketService: savedTicketService } }
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
                message: "Ticket created with successfully",
                savedTicketService
            })
    } catch (e) {
        next(e)
    }

})


ticketService.delete("/ticketService/delete/:ticketServiceId", async (req, res, next) => {
    const { ticketServiceId } = req.params

    const ticketService = await TicketServiceModel
        .findById(ticketServiceId)

    if (!ticketService) {
        return res
            .status(400)
            .send({
                statusCode: 400,
                message: " Ticket not found "
            })
    }
    try {
        const deleteTicketData = req.body
        const options = { new: true }

        const result = await TicketServiceModel
            .findByIdAndDelete(ticketServiceId, deleteTicketData, options)

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Ticket deleted with successfully",
                result
            })
    } catch (e) {
        next(e)
    }
})


ticketService.patch("/ticketService/patch/:ticketServiceId", async (req, res, next) => {
    const { ticketServiceId } = req.params

    const ticketService = await TicketServiceModel
        .findById(ticketServiceId)

    if (!ticketService) {
        return res
            .status(400)
            .send({
                statusCode: 400,
                message: " Ticket not found"
            })
    }

    try {
        const updateTicketData = req.body
        const options = { new: true }

        const result = await TicketServiceModel
            .findByIdAndUpdate(ticketServiceId, updateTicketData, options)
        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Ticket updated with successfully",
                result
        })
    } catch (e) {
        next(e)
    }
})


ticketService.get("/ticketService/ticketServiceId/:ticketServiceId", async (req, res, next) => {
    const { ticketServiceId } = req.params
    
    try {
        const ticketService = await TicketServiceModel
            .findById(ticketServiceId)
        
        if (ticketService.length === 0) {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    message: "Ticket not found"
                })
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                message: "Ticket found with successfully",
                ticketService
        })
    } catch (e) {
        next(e)
    }
})


module.exports = ticketService