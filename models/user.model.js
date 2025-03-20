import mongoose from "mongoose";

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

export default User = mongoose.model("User", userSchema);
