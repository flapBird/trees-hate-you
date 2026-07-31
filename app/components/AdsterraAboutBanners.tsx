"use client";

import { useEffect } from "react";
import { enqueueAdUnit } from "../../lib/adsterra";

const BANNERS = [
  { key: "257dd4f27cb3fdcd530f8cb90a6ac6e4", height: 600, width: 160 },
] as const;

export default function AdsterraAboutBanners() {
  useEffect(() => {
    const root = document.querySelector(".about-ads");
    if (!(root instanceof HTMLElement) || root.dataset.loaded === "true") return;
    root.dataset.loaded = "true";
    root.querySelectorAll(".ad-frame").forEach((slot, index) => {
      const banner = BANNERS[index];
      if (slot instanceof HTMLElement && banner) enqueueAdUnit(slot, banner);
    });
  }, []);

  return (
    <div className="about-ads">
      <div className="ad-frame" data-banner-key="257dd4f27cb3fdcd530f8cb90a6ac6e4" />
    </div>
  );
}
