import express from "express";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();

router.get("/", adminController.showTrails);
router.get("/trails/new", adminController.showForm);
router.post("/trails", adminController.createTrail);
router.post("/trails/:id/delete", adminController.removeTrail);

export default router;
