"use server";

import {
  getAuctionsWithMeta,
  QueryParams,
} from "@/lib/services/auctionsService";

export async function loadAuctionData(queryParams?: QueryParams) {
  return await getAuctionsWithMeta(queryParams);
}
