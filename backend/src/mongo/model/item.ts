import { Schema, model } from "mongoose"
import aggregatePaginate from "mongoose-aggregate-paginate-v2"
import { modelNameUser } from "./user";

export const modelNameItem = "item"
const mySchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: modelNameUser, required: true, },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, require: true }
},
    { timestamps: true, versionKey: false },)

mySchema.plugin(aggregatePaginate);

export const ItemModel = model(modelNameItem, mySchema, modelNameItem)