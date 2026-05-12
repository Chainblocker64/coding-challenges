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
    return;
  } catch (error) {
    console.error(
      "An error occured while trying to fetch and display trails:",
      error,
    );
    response
      .status(500)
      .json({ error: "An error occured while trying to display trails." });
    return;
  }
}

export async function showTrail(
  request: Request<{ slug: string }>,
  response: Response,
): Promise<void> {
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
    return;
  } catch (error) {
    console.error(
      `An error occured while trying to fetch and display trail with slug ${slug}:`,
      error,
    );
    response
      .status(500)
      .json({ error: "An error occured while trying to display trail." });
    return;
  }
}

//Duplicate across different controlelrs but we don't have a "central" utils collection
export function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
