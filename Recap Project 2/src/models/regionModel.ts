import { getDB } from "./db.js";

export interface Region {
  name: string;
  slug: string;
  country: string;
  description: string;
}

export interface RegionDbObject extends Region {
  id: number;
}

const selectFields = `
SELECT *
FROM regions
`;

export async function getAllRegions(): Promise<RegionDbObject[]> {
  const db = getDB();
  const regions = await db.all<RegionDbObject[]>(selectFields);
  return regions;
}

export async function getRegionBySlug(
  slug: string,
): Promise<RegionDbObject | undefined> {
  const db = getDB();
  const region = db.get<RegionDbObject>(
    `
        ${selectFields}
        WHERE regions.slug = $slug`,
    {
      $slug: slug,
    },
  );
  return region;
}
