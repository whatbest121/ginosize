import express, { Router } from "express";
import apiRoutes from "./router/api";
import { connectDB } from "./mongo/initial";
import auth from "./router/auth";
import item from "./router/item";
import { authenticate } from "./middleware/jwt";
import { seedItem } from "./seed/seedItem";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3023;
const test = Router();

// เพิ่ม CORS middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://172.20.10.2:3000"], // อนุญาตให้ origin เหล่านี้เรียกใช้ API
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/", test.get("/", (_, res) => {
    res.json("hello")
}))
app.use("/auth", auth);
app.use(function (req, res, next) {
    authenticate(req, res, next);
});

app.use("/api", apiRoutes);
app.use("/item", item);
connectDB().then(async () => {

    await seedItem();

    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})

