import AuctionListing from "@/components/auctions/AuctionListing";
import { getAuctionsWithMeta } from "@/lib/services/auctionsService";

export default async function Home() {
  const auctionData = await getAuctionsWithMeta({ limit: 3 });
  return <AuctionListing initialData={auctionData} />;
}
