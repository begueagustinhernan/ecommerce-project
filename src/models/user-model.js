import mongoose, { Schema } from "mongoose";
import { hashPassword } from "../../utils/password.utils.js";

const userSchema = new Schema(
    {
        first_name: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minlength: [2, "First name must be at least 2 characters long"]
        },
        last_name: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minlength: [2, "Last name must be at least 2 characters long"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Invalid email format"]  // validación en el schema
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"]
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: "cart"
        },
        role: {
            type: String,
            enum: {
                values: ["admin", "user"],
                message: "{VALUE} is not a valid role"
            },
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

// Un solo pre-save hook, más organizado
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await hashPassword(this.password);
    next();
});

export const UserModel = mongoose.model("user", userSchema);