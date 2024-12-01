const mongoose = require("mongoose")
const dayjs = require('dayjs')
const dateNow = new Date()




const CheckInSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel"
        },
        checkIn: {
            type: Date,
            required: true,
            default: dayjs().toDate()
        }
    }, {
        timestamps: true,
        strict: true
    }
)



module.exports = mongoose.model("checkInModel", CheckInSchema, "checkIn")