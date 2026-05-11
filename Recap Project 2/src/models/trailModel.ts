import { getDB } from "./db.js";

export interface Trail {
  title: string;
  slug: string;
  difficulty: string;
  distanceKm: number;
  description: string;
  imageUrl: URL;
  createdAt: number;
}

export interface TrailPayload extends Trail {
  regionId: number;
}

//TODO we could extend TrailPayload instead for the regionId field. Extend chains seem less readable though?
export interface TrailDbObject extends Trail {
  id: number;
  regionId: number;
}

//TODO better naming?
export interface TrailData extends TrailDbObject {
  regionName: string;
  regionCountry: string;
}

const selectFields = `
SELECT
trails.id AS id,
trails.title AS title,
trails.slug AS slug,
trails.difficulty AS difficulty,
trails.distance_km AS distanceKm,
trails.description AS description,
trails.image_url AS imageUrl,
trails.region_id AS regionId,
trails.created_at AS createdAt,
regions.name AS regionName,
regions.country AS regionCountry
FROM trails
INNER JOIN regions
ON trails.region_id = regions.id`;

export async function getAllTrails(): Promise<TrailData[]> {
  const db = getDB();
  const trails = await db.all<TrailData[]>(selectFields);

  return trails;
}

export async function getTrailBySlug(
  slug: string,
): Promise<TrailData | undefined> {
  const db = getDB();
  const trail = await db.get<TrailData>(
    `
    ${selectFields}
    WHERE trails.slug = $slug`,
    {
      $slug: slug,
    },
  );
  return trail;
}

export async function getTrailsByRegionId(
  regionId: number,
): Promise<TrailData[]> {
  const db = getDB();
  const trails = await db.all<TrailData[]>(
    `
        ${selectFields}
        WHERE regions.id = $regionId`,
    {
      $regionId: regionId,
    },
  );

  return trails;
}

export async function getTrailById(id: number): Promise<TrailData | undefined> {
  const db = getDB();
  const trail = await db.get<TrailData>(
    `
      ${selectFields}
      WHERE trails.id = $id`,
    {
      $id: id,
    },
  );

  return trail;
}

export async function addTrail(trail: TrailPayload): Promise<number> {
  const db = getDB();
  const result = await db.run(
    `
    INSERT INTO trails (title, slug, difficulty, distance_km, description, image_url, created_at, region_id)
    VALUES ($title, $slug, $difficulty, $distance_km, $description, $image_url, $created_at, $region_id)
    `,
    {
      $title: trail.title,
      $slug: trail.slug,
      $difficulty: trail.difficulty,
      $distance_km: trail.distanceKm,
      $description: trail.description,
      $image_url: trail.imageUrl,
      $created_at: trail.createdAt,
    },
  );

  return result.lastID!;
}

export async function deleteTrail(id: number): Promise<void> {
  const db = getDB();
  await db.run(
    `
    DELETE FROM trails
    WHERE id = $id`,
    {
      $id: id,
    },
  );
}
