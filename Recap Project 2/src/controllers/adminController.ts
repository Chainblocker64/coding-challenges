import type { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import type { TrailPayload, Difficulty } from "../models/trailModel";
import { getAllTrails, addTrail, deleteTrail } from "../models/trailModel.js";
import { getAllRegions } from "../models/regionModel.js";

const disallowAllTags = {
  allowedTags: [],
  allowedAttributes: {},
};

export async function showTrails(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const trails = await getAllTrails();
    response.render("admin/list.html", {
      trails: trails,
    });
    return;
  } catch (error) {
    console.error(
      "An error occured trying to fetch and display trails:",
      error,
    );
    response
      .status(500)
      .json({ error: "An error occured trying to display trails." });
    return;
  }
}

export async function showForm(
  _request: Request,
  response: Response,
): Promise<void> {
  try {
    const regions = await getAllRegions();
    response.render("admin/form.html", {
      regions: regions,
    });
    return;
  } catch (error) {
    console.error(
      "An error occured while trying to fetch regions and display the admin form:",
      error,
    );
    response.status(500).json({
      error: "An error occured while trying to display the admin form.",
    });
    return;
  }
}

export async function createTrail(
  request: Request<
    {},
    {},
    {
      title: string;
      difficulty: string;
      distance: string;
      image: string;
      description: string;
      regionId: string;
    }
  >,
  response: Response,
): Promise<void> {
  /**
   * Sanitize and brief-check HTML form input
   */
  const title = sanitizeHtml(request.body.title, disallowAllTags);
  const difficulty = sanitizeHtml(
    request.body.difficulty,
    disallowAllTags,
  ) as Difficulty;
  const distance = sanitizeHtml(request.body.distance, disallowAllTags);
  if (isNaN(Number(distance))) {
    response
      .status(400)
      .json({ error: `Distance ${distance} is not a number!` });
  }
  const image = sanitizeHtml(request.body.image, disallowAllTags);
  const description = sanitizeHtml(request.body.description, {
    allowedTags: ["p", "b"],
    allowedAttributes: {},
  });
  const regionId = sanitizeHtml(request.body.regionId, disallowAllTags);
  if (isNaN(Number(regionId))) {
    response
      .status(400)
      .json({ error: `Region ID ${regionId} is not a number!` });
  }

  const trail: TrailPayload = {
    title: title,
    slug: "",
    difficulty: difficulty,
    distanceKm: Number(distance),
    description: description,
    imageUrl: image,
    regionId: Number(regionId),
    createdAt: Date.now(),
  };

  try {
    const id = await addTrail(trail);
    if (!id) {
      console.error("Trail was not created:", trail);
      response.status(500);
      return;
    }
    response.redirect("/admin");
  } catch (error) {
    console.error(
      "An error occured while trying to create new trail:",
      trail,
      error,
    );
    response.status(500);
  }
}

export async function removeTrail(
  request: Request<{ id: number }>,
  response: Response,
): Promise<void> {
  const id = request.params.id || 0;
  if (!id) {
    response.status(400).json({ error: "Provided Id is invalid." });
    return;
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
    return;
  }
}
