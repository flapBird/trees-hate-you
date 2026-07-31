"use client";

import { useEffect, useRef } from "react";
import { enqueueAdUnit } from "../../lib/adsterra";

const BANNERS = [
  { key: "5376bfa9b74b81b197856d11f6138d17", height: 90, width: 728 }
] as const;

export default function AdsterraBottomBanners() {
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
    <div className="adsterra-bottom-banners" ref={rootRef} aria-label="Advertisement">
      <div className="ad-frame ad-frame-wide" data-banner-key="5376bfa9b74b81b197856d11f6138d17" />
    </div>
  );
}
