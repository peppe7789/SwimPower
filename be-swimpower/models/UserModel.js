const mongoose = require("mongoose")


const avatarBoy = "./assets/avatar-boy.png"
const avatarGirl = "./assets/avatar-girl.png"
const allowedGenders = ["M","F"]
const allowedRole = ["admin", "payuser", "freeuser"]

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
        enum: allowedGenders,
        required: false,
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
    }

}, {
    timestamp: true,
    strict:true
})

module.exports = mongoose.model("usermodel", UserSchema, "users")