import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../mongo/model/user";


const auth = Router();
const JWT_SECRET = "my_super_secret_key";

const authSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

// ✅ Signup
auth.post("/signup", async (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() })
    return
  }

  const { username, password } = parsed.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.create({ username, hashedPassword });

  res.json({ message: "User registered successfully" })

});

// ✅ Login
auth.post("/login", async (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() })
    return
  }

  const { username, password } = parsed.data;

  const user = await UserModel.findOne({ username });
  if (!user) throw new Error("Invalid username or password!")

  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!validPassword) throw new Error("Invalid username or password!")

  const token = jwt.sign({ user: { username: user.username, _id: user._id } }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful!", token });
});

export default auth;
