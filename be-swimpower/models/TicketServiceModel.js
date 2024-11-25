const mongoose = require("mongoose")
const ticketService = require("../routes/ticketService")

const allowedLesson = ["personal-pro", "personal-middle", "personal-base"]
const allowedInstructor = ["Andrea", "Ettore", "Manuel"]
const TicketServiceModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel"
        },
        typeLesson: {
            type: String,
            required: true,
            enum: allowedLesson,
            default: "personal-base"
        },
        instructor: {
            type: String,
            required: true,
            enum: allowedInstructor,
            default: "not specificated"
        },
        dateLesson: {
            type: Date,
            required: true,
        }
    }, {
        timestamps: true,
        strict: true
    }
)

module.exports = mongoose.model("ticketServiceModel", TicketServiceModel, "ticketService")