import AuctionListing from "@/components/auctions/AuctionListing";
import { getAuctionsWithMeta } from "@/lib/services/auctionsService";

export default async function Home() {
  const initialAuctionData = await getAuctionsWithMeta(undefined, 3);
  console.log(initialAuctionData);
  return <AuctionListing initialAuctionData={initialAuctionData} />;
}
