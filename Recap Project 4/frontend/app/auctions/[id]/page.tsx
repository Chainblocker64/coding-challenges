import AuctionDetailView from "@/components/auctions/AuctionDetailView";
import { Auction, getAuctionById } from "@/lib/services/auctionsService";

export default async function AuctionDetailPage({
  params,
}: PageProps<"/auctions/[id]">) {
  const { id } = await params;

  let auction: Auction | null = null;

  try {
    auction = await getAuctionById(id);
  } catch (error) {
    throw error;
  }

  if (auction) {
    return <AuctionDetailView auction={auction} />;
  } else {
    return <p>Auction with ID {id} not found</p>;
  }
}
