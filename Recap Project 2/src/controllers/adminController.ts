import type { Request, Response } from "express";
import { getAllTrails, deleteTrail } from "../models/trailModel.js";

export async function showTrails(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const trails = await getAllTrails();
    response.render("admin/list.html", {
      trails: trails,
    });
  } catch (error) {
    console.error(
      "An error occured trying to fetch and display trails:",
      error,
    );
    response
      .status(500)
      .json({ error: "An error occured trying to display trails." });
  }
}

export async function removeTrail(
  request: Request<{ id: number }>,
  response: Response,
): Promise<void> {
  const id = request.params.id || 0;
  if (!id) {
    response.status(400).json({ error: "No valid ID provided." });
  }

  try {
    await deleteTrail(id);
    response.redirect("/admin");
  } catch (error) {
    console.error(
      `An error occured trying to delete trail with id ${id}`,
      error,
    );
    response.status(400).json({
      error: `An error occured while trying to delete trail with id ${id}.`,
    });
  }
}
