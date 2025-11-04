import mongoose from "mongoose";

export const couponSchema = new mongoose.Schema({
    courses: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    totalRedeemNumbers: {
        type: Number,
        required: true
    },
    currentRedeemNumbers: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
});