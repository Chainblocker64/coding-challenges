"use client";
import { useState } from "react";
import AuctionList from "./AuctionList";
import { loadAuctionData } from "@/lib/actions/auctionActions";
import {
  Auction,
  AuctionsResponse,
  QueryParams,
} from "@/lib/services/auctionsService";

export default function AuctionListing({
  initialData,
}: {
  initialData: AuctionsResponse;
}) {
  const initialMeta = initialData.meta;
  const initialAuctions = initialData.data;

  const [meta, setMeta] = useState(initialMeta);
  const [auctions, setAuctions] = useState<Auction[]>(initialAuctions);

  const { page, limit, totalPages } = meta;

  async function reloadAuctions(queryParams: QueryParams) {
    const { data: auctions, meta } = await loadAuctionData(queryParams);
    setMeta(meta);
    setAuctions(auctions);
  }

  return (
    <>
      <AuctionList auctions={auctions} />
      {page > 1 && (
        <button
          onClick={() => {
            const newPage = page - 1;
            setMeta({ ...meta, page: newPage });
            reloadAuctions({ limit: limit, page: newPage });
          }}
        >
          Back
        </button>
      )}
      {totalPages > page && (
        <button
          onClick={() => {
            const newPage = page + 1;
            setMeta({ ...meta, page: newPage });
            reloadAuctions({ limit: limit, page: newPage });
          }}
        >
          Forward
        </button>
      )}
    </>
  );
}
