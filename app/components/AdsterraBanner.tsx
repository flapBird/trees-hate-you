"use client";

import { useEffect, useRef } from "react";
import { enqueueAdUnit } from "../../lib/adsterra";

export default function AdsterraBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el || el.dataset.loaded === "true") return;
    el.dataset.loaded = "true";
    enqueueAdUnit(el, { key: "1362380e0bd383a3424b76882e4c199e", height: 60, width: 468 });
  }, []);

  return (
    <div className="adsterra-banner" ref={bannerRef} aria-label="Advertisement">
    </div>
  );
}
