"use client";

import { useEffect, useRef } from "react";

const AD_SCRIPT_SRC =
  "https://pl29635721.effectivecpmnetwork.com/f193185e4c4ba7699185eef77932cfa9/invoke.js";
const AD_CONTAINER_ID = "container-f193185e4c4ba7699185eef77932cfa9";

export default function NativeBannerAd() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || wrapper.dataset.loaded === "true") return;
    wrapper.dataset.loaded = "true";

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = AD_SCRIPT_SRC;

    // Insert script before the container div, same as user's raw HTML
    const container = wrapper.querySelector(`#${CSS.escape(AD_CONTAINER_ID)}`);
    if (container?.parentNode) {
      container.parentNode.insertBefore(script, container);
    }
  }, []);

  return (
    <div className="native-banner-ad" ref={wrapperRef} aria-label="Advertisement">
      <div id={AD_CONTAINER_ID} />
    </div>
  );
}
