import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    phone: {
        type: Number,
        default: null
    },

    address: {
        type: String,
        default: null
    },

    city: {
        type: String,
        default: null
    },

    country: {
        type: String,
        default: null
    },

    avatar: {
        type: String,
        default: null
    },

    emailVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: "customer",
        enum: ["customer", "admin", "merchant"]
    },
}, {timestamps: true})


export default mongoose.model("UserModel", userSchema)