const mongoose = require("mongoose")


const avatarBoy = "./assets/avatar-boy.png"
const avatarGirl = "./assets/avatar-girl.png"
const allowedGenders = ["M","F"]
const avatarImage = gender === "M" ? avatarBoy : avatarGirl
const allowedRole = ["admin", "payuser", "freeuser"]

const UserSchema = new mongoose, Schema({
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
        default: avatarImage
    },
    dob: {
        type: Date,
        required: false,
        default: Date.now
    }

})