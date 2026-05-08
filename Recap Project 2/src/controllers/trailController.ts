import { Request, Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel.js";

export async function showTrails(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const trails = await getAllTrails();
    response.render("index.html", {
      trails: trails.map((trail) => {
        return { ...trail, createdAt: formatDate(trail.createdAt) };
      }),
    });
  } catch (error) {
    console.error(
      "Encountered an error while trying to fetch and display trails :",
      error,
    );
    response
      .status(500)
      .json({ error: "An error occured while trying to display trails." });
  }
}

export async function showTrail(
  request: Request<{ slug: string }>,
  response: Response,
): Promise<void> {
  //TODO Do I need to sanitize the slug?
  const slug = request.params.slug;

  try {
    const trail = await getTrailBySlug(slug);
    if (!trail) {
      response.status(400).json({ error: "No trail found by the given slug" });
      return;
    }
    response.render("trail.html", {
      trail: { ...trail, createdAt: formatDate(trail.createdAt) },
    });
  } catch (error) {
    console.error("Encountered an error while trying to get trails:", error);
    response
      .status(500)
      .json({ error: "An error occured while trying to fetch trails." });
  }
}

export function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
