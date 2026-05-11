import express from "express";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/", adminController.showTrails);
router.post("/trails/:id/delete", adminController.removeTrail);

export default router;
