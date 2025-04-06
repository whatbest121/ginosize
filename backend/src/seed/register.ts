import bcrypt from "bcrypt";
import { UserModel } from "../mongo/model/user";

export async function seedRegister() {
    const count = await UserModel.countDocuments();
    if (count < 1) {

        for (let i = 0; i < 10; i++) {
            const username = `admin${i}`
            const hashedPassword = await bcrypt.hash("123456", 10);
            await UserModel.create({ username, hashedPassword });
        }
        console.log("seed user success")
    }
    console.log("user in mongo")
}