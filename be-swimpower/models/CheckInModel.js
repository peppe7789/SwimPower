const mongoose = require("mongoose")

const CheckInModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel"
        },
        checkIn: {
            type: Date,
            required: true,
            default: Date.now
        }
    }, {
        timestamps: true,
        strict: true
    }
)

module.exports = mongoose.model("checkInModel", CheckInModel, "checkIn")