"use client";

import { useEffect, useRef, useState } from "react";

const CONSENT_KEY = "trees-hate-you-privacy-consent-v1";
const CONSENT_EVENT = "trees-hate-you-consent-changed";

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
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const syncConsent = () => setEnabled(localStorage.getItem(CONSENT_KEY) === "all");
    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_EVENT, syncConsent);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

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
  }, [enabled]);

  return (
    <div className="adsterra-banner" ref={bannerRef} aria-label="Advertisement">
      {!enabled && <span className="ad-consent-note">Optional ads are off</span>}
    </div>
  );
}
