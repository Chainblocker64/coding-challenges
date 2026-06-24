import { Auction } from "@/lib/services/auctionsService";

export default function AuctionDetailView({ auction }: { auction: Auction }) {
  return (
    <>
      <p>{auction.title}</p>
      <p>{auction.description}</p>
      <p>Starting Price: {auction.startingPrice}</p>
      <p>Current Price: {auction.currentPrice}</p>
      <p>Started: {new Date(auction.createdAt).toLocaleString()}</p>
      <p>Until: {new Date(auction.endDate).toLocaleString()}</p>
      <p>Seller: {auction.seller}</p>
    </>
  );
}
