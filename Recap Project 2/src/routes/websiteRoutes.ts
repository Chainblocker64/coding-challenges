import express from "express";
import * as trailController from "../controllers/trailController.js";
import * as regionController from "../controllers/regionController.js";

const router = express.Router();

router.get("/", trailController.showTrails);
router.get("/trails/:slug", trailController.showTrail);
router.get("/regions", regionController.showRegions);
router.get("/regions/:slug", regionController.showRegion);

export default router;
