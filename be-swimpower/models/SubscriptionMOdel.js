const mongoose = require("mongoose")

const allowedState = ["active", "disactive"]
const SubscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel"
    },
    state: {
        type: String,
        required: true,
        default: "disactive", 
        enum: allowedState
    },
    startSubscription: {
        type: Date,
        required: false
    },
    endSubscription: {
        type: Date,
        required: false
    }
}, {
    timestamp: true,
    strict: true
})

module.exports = mongoose.model("subscriptionModel", SubscriptionSchema, "subscription")