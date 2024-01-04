import mongoose from "mongoose"
// const bcrypt = require('bcrypt');


const UserSchema = mongoose.Schema({
    username: { type: String},
    password: { type: String},
    email : {type: String, }
})

export default mongoose.model("users", UserSchema)
