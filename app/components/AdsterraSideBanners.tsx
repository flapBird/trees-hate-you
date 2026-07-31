"use client";

import { useEffect, useRef } from "react";
import { enqueueAdUnit } from "../../lib/adsterra";

const BANNERS = [
  { key: "9dd8521ac4905517a2547e838460c470", height: 250, width: 300 },
  { key: "0ec587ff8c92f0f5c44c4732bce0ff20", height: 50, width: 320 }
] as const;

export default function AdsterraSideBanners() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || root.dataset.loaded === "true") return;
    root.dataset.loaded = "true";

    BANNERS.forEach((banner) => {
      const slot = root.querySelector(`[data-banner-key="${banner.key}"]`);
      if (slot instanceof HTMLElement) enqueueAdUnit(slot, banner);
    });
  }, []);

  return (
    <div className="adsterra-side-banners" ref={rootRef} aria-label="Advertisement">
      <div className="ad-frame" data-banner-key="9dd8521ac4905517a2547e838460c470" />
      <div className="ad-frame" data-banner-key="0ec587ff8c92f0f5c44c4732bce0ff20" />
    </div>
  );
}
