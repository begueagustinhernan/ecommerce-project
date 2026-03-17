import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const orderSchema = new Schema(
    {
        code: {
            type: String,
            unique: true,
            default: () => uuidv4()
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: [true, "User is required"]
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "product",
                    required: [true, "Product is required"]
                },
                quantity: {
                    type: Number,
                    required: [true, "Quantity is required"],
                    min: [1, "Quantity must be at least 1"]
                },
                unitPrice: {        // precio al momento de la compra
                    type: Number,
                    required: [true, "Unit price is required"],
                    min: [0, "Unit price cannot be negative"]
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: [true, "Total amount is required"],
            min: [0, "Total amount cannot be negative"]
        },
        status: {
            type: String,
            enum: {
                values: ["pending", "confirmed", "delivered", "cancelled"],
                message: "{VALUE} is not a valid status"
            },
            default: "pending"
        }
    },
    {
        timestamps: true        // reemplaza purchase_datetime
    }
);

export const OrderModel = mongoose.model("order", orderSchema);