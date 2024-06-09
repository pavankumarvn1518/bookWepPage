const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
        status: {
            type: String,
            default: "order placed",
            enum: ["order placed", "out for delivery", "delivered", "canceled"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
