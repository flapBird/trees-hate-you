"use client";

import { useEffect, useRef } from "react";

const nativeAdScript =
  "https://pl29635721.effectivecpmnetwork.com/f193185e4c4ba7699185eef77932cfa9/invoke.js";

export default function NativeAd() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const container = root.querySelector<HTMLElement>(
      "#container-f193185e4c4ba7699185eef77932cfa9"
    );

    // The ad network assigns its own generated class names and switches the
    // four cards to a single column on narrow screens. Mark the element that
    // directly owns the cards so our mobile CSS can keep the requested 2x2
    // layout without depending on those unstable class names.
    const markCardGrid = () => {
      if (!container) return;

      const candidates = [container, ...container.querySelectorAll<HTMLElement>("div")];
      const cardGrid = candidates.find((candidate) => {
        const children = Array.from(candidate.children).filter(
          (child) => child.tagName !== "SCRIPT" && child.tagName !== "STYLE"
        );

        return (
          children.length >= 4 &&
          children.slice(0, 4).every((child) => child.querySelector("img"))
        );
      });

      if (cardGrid) cardGrid.dataset.mobileNativeGrid = "true";
    };

    const observer = new MutationObserver(markCardGrid);
    if (container) observer.observe(container, { childList: true, subtree: true });

    if (root.dataset.loaded !== "true") {
      root.dataset.loaded = "true";

      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = nativeAdScript;
      root.prepend(script);
    }

    markCardGrid();

    return () => observer.disconnect();
  }, []);

  return (
    <div className="native-ad" ref={rootRef} aria-label="Advertisement">
      <div id="container-f193185e4c4ba7699185eef77932cfa9" />
    </div>
  );
}
