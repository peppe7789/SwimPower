const mongoose = require("mongoose")

const CheckInSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel"
        },
        checkIn: {
            type: Date,
            required: true,
            default: new Date()
        }
    }, {
        timestamps: true,
        strict: true
    }
)

module.exports = mongoose.model("checkInModel", CheckInSchema, "checkIn")