import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const auth = Router()
auth.post("/register", async ({ body: { username, password }, res }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
})