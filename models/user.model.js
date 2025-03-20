import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    // not added the Id field as it is automatically added by mongoose for each document
name: {
    type: String,
    required: true,
    },
email: {
    type: String,
    unique: true,
    required: true,
    },
password: { 
    type: String, 
    required: true 
    },
},
    {
        timestamps: true, // this will add createdAt and updatedAt fields
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export const User = mongoose.model("User", userSchema);
