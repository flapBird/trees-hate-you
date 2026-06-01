"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

export default function AdsterraBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current || bannerRef.current.dataset.loaded === "true") {
      return;
    }

    bannerRef.current.dataset.loaded = "true";
    window.atOptions = {
      key: "1362380e0bd383a3424b76882e4c199e",
      format: "iframe",
      height: 60,
      width: 468,
      params: {}
    };

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://www.highperformanceformat.com/1362380e0bd383a3424b76882e4c199e/invoke.js";
    script.async = true;
    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="adsterra-banner" ref={bannerRef} aria-label="Advertisement" />
  );
}
