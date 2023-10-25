import { Schema , models , model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    name: String,
    lastName: String,
    todos: [{title: String, status: String}]
})

const User = models.User || model("User" , userSchema)
export default User