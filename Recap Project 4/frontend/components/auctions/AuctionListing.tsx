"use client";
import { useState } from "react";
import AuctionList from "./AuctionList";
import { loadAuctionData } from "@/lib/actions/auctionActions";
import { Auction, AuctionsResponse } from "@/lib/services/auctionsService";

export default function AuctionListing({
  initialAuctionData,
}: {
  initialAuctionData: AuctionsResponse;
}) {
  const initialMeta = initialAuctionData.meta;
  const initialAuctions = initialAuctionData.data;

  const [meta, setMeta] = useState(initialMeta);
  const { page, limit, totalPages } = meta;
  const [auctions, setAuctions] = useState<Auction[]>(initialAuctions);

  async function reloadAuctions() {
    const { data: auctions, meta } = await loadAuctionData(page, limit);
    setAuctions(auctions);
    setMeta(meta);
  }

  return (
    <>
      <AuctionList auctions={auctions} />
      {page > 1 && (
        <button
          onClick={() => {
            setMeta({ ...meta, page: page - 1 });
            reloadAuctions();
          }}
        >
          Back
        </button>
      )}
      {totalPages > page && (
        <button
          onClick={() => {
            setMeta({ ...meta, page: page + 1 });
            reloadAuctions();
          }}
        >
          Forward
        </button>
      )}
    </>
  );
}
