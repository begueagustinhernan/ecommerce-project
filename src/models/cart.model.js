import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: [true, "User is required"],
            unique: true  // un usuario, un carrito activo
        },
        products: {
            type: [
                {
                    product: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "products",
                        required: [true, "Product is required"]
                    },
                    quantity: {
                        type: Number,
                        required: [true, "Quantity is required"],
                        min: [1, "Quantity must be at least 1"],
                        default: 1
                    }
                }
            ],
            default: []
        }
    },
    {
        timestamps: true
    }
);

export const CartModel = mongoose.model(
    "cart",
    cartSchema
)