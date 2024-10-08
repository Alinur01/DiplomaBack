import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String, // Changed to String to match phone number input
        required: true
    },
    time: {
        type: Number, // Ensure time is a number
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    orders: {
        type: Array,
        required: true
    },
    number: {
        type: String, // Changed to String to match UUID
        required: true
    },
}, {
    timestamps: true,
});

export default mongoose.model('Orders', OrdersSchema);
