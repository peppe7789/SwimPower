const mongoose = require("mongoose")

const allowedGenders = ["M","F","not specified"]
const allowedRole = ["admin","instructor", "payuser", "freeuser"]

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    },
    role: {
        type: String,
        required: false,
        default: "freeuser",
        enum: allowedRole
    },
    gender: {
        type: String,
        required: false,
        enum: allowedGenders,
        default: "not specified"
    },
    avatar: {
        type: String,
        required: false,
        default: "./assets/avatar-boy.png"
    },
    dob: {
        type: Date,
        required: false,
        default: Date.now
    },
    startSubscription: {
        type: Date,
        required: false
    },
    endSubscription: {
        type: Date,
        required: false
    },
    checkIn: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "checkInModel"
        }
    ],
    postEvent: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:"postEventModel"
        }
    ],
    ticketService: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticketServiceModel"
        }
    ]

}, {
    timestamp: true,
    strict:true
})

module.exports = mongoose.model("userModel", UserSchema, "user")