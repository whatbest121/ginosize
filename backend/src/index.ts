import express, { Router } from "express";
import apiRoutes from "./router/api";
import { connectDB } from "./mongo/initial";
import auth from "./router/auth";
import item from "./router/item";
import { authenticate } from "./middleware/jwt";
import { seedItem } from "./seed/seedItem";

const app = express();
const PORT = process.env.PORT || 3023;
const test = Router();

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

