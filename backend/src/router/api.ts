import { Router, Request } from "express";

// เพิ่ม interface เพื่อขยาย Request type
interface AuthenticatedRequest extends Request {
    user: {
        user: {
            _id: string;
            username: string;
        }
    }
}

const apiRoutes = Router();

// ตัวอย่างการดึงข้อมูลผู้ใช้จาก token
apiRoutes.get("/user-info", (req, res) => {
    // ดึงข้อมูลผู้ใช้ที่ middleware authenticate เพิ่มไว้
    const userData = (req as AuthenticatedRequest).user;

    res.json({
        message: "ข้อมูลผู้ใช้จาก token",
        user: userData
    });
});

export default apiRoutes;
