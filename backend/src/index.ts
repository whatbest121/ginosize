import express, { Router } from "express";
import apiRoutes from "./router/api";
import { connectDB } from "./mongo/initial";

const app = express();
const PORT = process.env.PORT || 3023;
const test = Router();

app.use(express.json());
app.use("/", test.get("/", (_, res) => {
    res.json("hello")
}))
app.use("/api", apiRoutes);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})

