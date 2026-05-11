import express from "express";
import nunjucks from "nunjucks";
import routes from "./routes/websiteRoutes.js";
import { logger } from "./middleware/logger.js";
import { connectDB, closeDB } from "./models/db.js";

type ExitSignal = "SIGINT" | "SIGTERM";

/**
 * App setup
 */
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(logger);
app.use("/", routes);

/**
 * Nunjucks setup
 */
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

/**
 * App start
 */
await connectDB();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

/**
 * Exit listeners
 */
process.on("SIGINT", (signal) => {
  console.log("sigint?");
  shutdown(signal);
});

process.on("SIGTERM", (signal) => {
  console.log("sigterm?");
  shutdown(signal);
});

async function shutdown(signal: ExitSignal): Promise<void> {
  console.log(`${signal} received, shutting down application.`);
  await closeDB();
  process.exit(0);
}
