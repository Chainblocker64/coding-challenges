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

export type Meta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
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
  page?: number,
  limit?: number,
): Promise<AuctionsResponse> {
  try {
    let url = apiUrl + "/auctions";

    if (page) {
      url += `?page=${page}`;
    }
    if (limit) {
      url += `?limit=${limit}`;
    }

    const response = await fetch(`${url}`, {
      cache: "no-store",
    });

    return await response.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function getAuctions(
  page?: number,
  limit?: number,
): Promise<Auction[]> {
  const { data: auctions } = await getAuctionsWithMeta(page, limit);
  return auctions;
}

export async function getAuctionById(id: string): Promise<Auction> {
  try {
    const response = await fetch(`${apiUrl}/auctions/${id}`);
    return response.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
}
