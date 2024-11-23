const mongoose = require("mongoose")

const PostEventModel = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel"
        },
        title: {
            type: String,
            required: true,
            lowercase: true
        },
        subtitle: {
            type: String,
            required: true,
            lowercase: true
        },
        paragraph: {
            type: String,
            require: true,
            lowercase: true
        },
        img: {
            type: String,
            require: true,
            trim: true
        }
    }, {
        timestamps: true,
        strict: true
    }
)

module.exports = mongoose.model("postEventModel", PostEventModel, "postEvent")