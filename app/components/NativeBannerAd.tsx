"use client";

import { useEffect, useRef } from "react";

export default function NativeBannerAd() {
  return (
    <div className="native-banner-ad" aria-label="Advertisement">
      <NativeBannerAdInner />
    </div>
  );
}

function NativeBannerAdInner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.dataset.loaded === "true") return;
    container.dataset.loaded = "true";

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl29635721.effectivecpmnetwork.com/f193185e4c4ba7699185eef77932cfa9/invoke.js";
    container.appendChild(script);
  }, []);

  return (
    <div ref={containerRef} aria-label="Advertisement" />
  );
}
