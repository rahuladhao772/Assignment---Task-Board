import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const registerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required']
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: [6, "min length should be grater than 6"]
    }
}, { timestamps: true })


registerSchema.pre('save', async function () {
    if (!this.isModified("password")) { return };
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})


// compare passowrd
registerSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}

export default mongoose.model('user', registerSchema)