"use server";

import { getAuctionsWithMeta } from "@/lib/services/auctionsService";

export async function loadAuctionData(page?: number, limit?: number) {
  return await getAuctionsWithMeta(page, limit);
}
