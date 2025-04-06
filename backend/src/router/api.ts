import { Router, Request } from "express";

interface AuthenticatedRequest extends Request {
    user: {
        user: {
            _id: string;
            username: string;
        }
    }
}

const apiRoutes = Router();

apiRoutes.get("/user-info", (req, res) => {
    const userData = (req as AuthenticatedRequest).user;

    res.json({
        message: "ข้อมูลผู้ใช้จาก token",
        user: userData
    });
});

export default apiRoutes;
