import { Schema, model } from "mongoose"

export const modelNameUser = "user"
const schema = new Schema({
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
},
    { timestamps: true, versionKey: false },)
export const UserModel = model(modelNameUser, schema, modelNameUser)