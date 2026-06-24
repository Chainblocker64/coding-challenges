import { Auction } from "@/lib/services/auctionsService";
import Link from "next/link";
import AuctionListView from "./AuctionListView";

export default function AuctionList({ auctions }: { auctions: Auction[] }) {
  return (
    <div>
      {auctions.map((auction) => (
        <div key={auction.id}>
          <Link href={`/auctions/${auction.id}`}>
            <AuctionListView key={auction.id} auction={auction} />
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
}
