import { Router, Request } from "express";
import { z } from "zod";
import { ItemModel } from "../mongo/model/item";

// เพิ่ม interface เพื่อขยาย Request type
interface AuthenticatedRequest extends Request {
    user: {
        user: {
            _id: string;
            username: string;
        }
    }
}

const item = Router();

item.get("/", async ({ query }, res) => {
    console.log("🚀 ~ item.get ~ query:", query)
    const pageQ = Number(query.page);
    const limitQ = Number(query.limit);

    const queryT = { page: pageQ, limit: limitQ }
    const schema = z.object({
        page: z.number().min(1),
        limit: z.number().min(1),
    })
    const parsed = schema.safeParse(queryT)
    if (!parsed.success) {
        res.status(400).json({ error: parsed.error.format() });
        return
    }
    const { limit, page } = parsed.data
    const result = await ItemModel.aggregatePaginate([], { limit, page, sort: "price" })
    res.json(result)
})

item.post("/add", async (req, res) => {
    const { body, user } = req as AuthenticatedRequest;
    const { name, price, quantity, image } = body;
    const userId = user.user._id;

    const schema = z.object({
        user_id: z.string(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        image: z.string(),
    })

    const parsed = schema.safeParse({
        user_id: userId,
        name,
        price,
        quantity,
        image,
    })
    if (!parsed.success) {
        res.status(400).json({ error: parsed.error.format() });
        return
    }
    const { data } = parsed
    const result = await ItemModel.create({
        user_id: data.user_id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        image: data.image,
    })
    res.json({ message: "add item success", result })
})

export default item;