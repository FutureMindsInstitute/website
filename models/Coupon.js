import mongoose from "mongoose";

export const couponSchema = new mongoose.Schema({
    courses: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }],
        required: false,
        default: [],
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    totalRedeemNumbers: {
        type: Number,
        required: true
    },
    currentRedeemNumbers: {
        type: Number,
        default: 0,
        required: false
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

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);

export default Coupon;