import { cookies } from "next/headers";
import { fetchAPI } from "./authService";

export enum AuctionStatus {
  OPEN = "open",
  CLOSED = "closed",
}

export type Auction = {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  endDate: string;
  createdAt: string;
  seller: string;
  status: AuctionStatus;
};

export type AuctionPayload = Omit<
  Auction,
  "id" | "currentPrice" | "endDate" | "createdAt" | "seller" | "status"
>;

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type QueryParams = {
  page?: number;
  limit?: number;
};

export type AuctionsResponse = {
  data: Auction[];
  meta: Meta;
};

const apiUrl: string = process.env.DARKBAY_API_URL || "";

if (!apiUrl) {
  throw new Error("Auction API URL not configured");
}

export async function getAuctionsWithMeta(
  queryParams: QueryParams = {},
): Promise<AuctionsResponse> {
  try {
    let url = `${apiUrl}/auctions`;

    const queryString = buildQueryString(queryParams);

    if (queryString) {
      url += `?${queryString}`;
    }
    const response = await fetchAPI(`${url}`, {
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getAuctions(
  queryParams: QueryParams,
): Promise<Auction[]> {
  const { data: auctions } = await getAuctionsWithMeta(queryParams);
  return auctions;
}

export async function getAuctionById(id: string): Promise<Auction | null> {
  try {
    const response = await fetchAPI(`${apiUrl}/auctions/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      } else {
        throw new Error(`Error while fetching auction with ID ${id}`);
      }
    }

    return await response.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function createAuction(auction: AuctionPayload) {
  try {
    const url = `${apiUrl}/auctions`;
    const response = fetchAPI(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
}

function buildQueryString({ page, limit }: QueryParams): string {
  const queryParams: Record<string, string> = {};

  if (page) {
    queryParams.page = page.toString();
  }

  if (limit) {
    queryParams.limit = limit.toString();
  }

  return new URLSearchParams(queryParams).toString();
}
