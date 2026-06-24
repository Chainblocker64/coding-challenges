import { Auction } from "@/lib/services/auctionsService";

export default function AuctionListView({ auction }: { auction: Auction }) {
  return (
    <>
      <p>{auction.title}</p>
      <p>Current Price: {auction.currentPrice}</p>
      <p>Until: {new Date(auction.endDate).toLocaleString()}</p>
      <p>Seller: {auction.seller}</p>
    </>
  );
}
