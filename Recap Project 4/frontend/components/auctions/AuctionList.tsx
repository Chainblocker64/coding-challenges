import { Auction } from "@/lib/services/auctionsService";
import AuctionView from "./AuctionView";

export default function AuctionList({ auctions }: { auctions: Auction[] }) {
  return (
    <div>
      {auctions.map((auction) => (
        <div key={auction.id}>
          <AuctionView key={auction.id} auction={auction} />
          <br />
        </div>
      ))}
    </div>
  );
}
