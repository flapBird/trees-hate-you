"use client";

import { useEffect, useRef } from "react";

const nativeAdScript =
  "https://pl29635721.effectivecpmnetwork.com/f193185e4c4ba7699185eef77932cfa9/invoke.js";

export default function NativeAd() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || root.dataset.loaded === "true") return;

    root.dataset.loaded = "true";

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = nativeAdScript;
    root.prepend(script);
  }, []);

  return (
    <div className="native-ad" ref={rootRef} aria-label="Advertisement">
      <div id="container-f193185e4c4ba7699185eef77932cfa9" />
    </div>
  );
}
