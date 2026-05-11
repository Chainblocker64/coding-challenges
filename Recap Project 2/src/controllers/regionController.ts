import { Request, Response } from "express";
import { getTrailsByRegionId } from "../models/trailModel";
import { getAllRegions, getRegionBySlug } from "../models/regionModel.js";

export async function showRegions(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const regions = await getAllRegions();
    response.render("regions.html", {
      regions: regions,
    });
  } catch (error) {
    console.error(
      "An error occured while trying to fetch and display regions:",
      error,
    );
    response
      .status(500)
      .json({ error: "An error occured while trying to display regions." });
  }
}

export async function showRegion(
  request: Request<{ slug: string }>,
  response: Response,
): Promise<void> {
  //TODO Do I need to sanitize the slug?
  const slug = request.params.slug;

  try {
    const region = await getRegionBySlug(slug);
    if (!region) {
      response.status(400).json({ error: "No trail found by the given slug" });
      return;
    }
    const regionId = region.id;
    const trails = await getTrailsByRegionId(regionId);

    response.render("region.html", {
      region: region,
      trails: trails.map((trail) => {
        return { ...trail, createdAt: formatDate(trail.createdAt) };
      }),
    });
  } catch (error) {
    console.error(
      `An error occured while trying to fetch and display region with slug ${slug}:`,
      error,
    );
    response
      .status(500)
      .json({ error: "An error occured while trying to display region." });
  }
}

//Could be reused but we don't have a "central" utils collection
export function formatDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
