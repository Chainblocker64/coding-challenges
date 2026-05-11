import type { Request, Response, NextFunction } from "express";
import path from "node:path";
import { appendFile, writeFile, access, constants } from "node:fs/promises";

const LOG_FILE = path.join(process.cwd(), "logs", "logs.txt");

async function writeLogEntry(message: string): Promise<void> {
  if (!message) {
    return;
  }
  try {
    await appendFile(LOG_FILE, message);
  } catch (error) {
    console.error("Error occured while trying to write log entry:", error);
  }
}

async function logFileExists(): Promise<Boolean> {
  try {
    await access(LOG_FILE, constants.W_OK);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

(async function createLogFile(): Promise<void> {
  const fileExists = await logFileExists();

  if (!fileExists) {
    try {
      await writeFile(LOG_FILE, "", { encoding: "utf-8" });
    } catch (error) {
      console.error(error);
    }
  }
})();

export async function logger(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  response.on("finish", () => {
    const dateTime = new Date().toISOString();
    const { ip, method, originalUrl: url } = request;
    const logEntry =
      [ip, dateTime, method, url, response.statusCode].join(" ") + "\n";
    writeLogEntry(logEntry);
  });

  next();
}
