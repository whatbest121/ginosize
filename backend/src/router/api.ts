import { Router } from "express";

const apiRoutes = Router();

apiRoutes.get("/:id", ({ params: { id } }, res) => {

    res.json({ message: id });
})

export default apiRoutes;
