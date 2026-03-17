import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters long"],
            maxlength: [100, "Title cannot exceed 100 characters"]
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"]
        },
        code: {
            type: String,
            required: [true, "Product code is required"],
            unique: true,
            trim: true,
            uppercase: true
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"]
        },
        isActive: {
            type: Boolean,
            default: true
        },
        stock: {
            type: Number,
            required: true,
            min: [0, "Stock cannot be negative"],
            default: 0
        },
        category: {
            type: String,
            required: [true, "Category is required"]
        },
        thumbnails: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model(
    "product",
    productSchema
)