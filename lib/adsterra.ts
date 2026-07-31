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

export type AdUnit = {
  key: string;
  height: number;
  width: number;
};

// Adsterra's invoke.js reads the shared window.atOptions global, so multiple
// units on one page must load one after another or they can overwrite each
// other's config. This promise chain serializes every unit on the page.
let queue: Promise<void> = Promise.resolve();

export function enqueueAdUnit(slot: HTMLElement, unit: AdUnit): void {
  queue = queue.then(
    () =>
      new Promise<void>((resolve) => {
        window.atOptions = {
          key: unit.key,
          format: "iframe",
          height: unit.height,
          width: unit.width,
          params: {}
        };

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = `https://www.highperformanceformat.com/${unit.key}/invoke.js`;
        script.onerror = () => resolve();
        slot.appendChild(script);

        // Wait until the ad iframe actually appears in the slot (or a timeout
        // elapses) before the next unit is allowed to overwrite atOptions.
        const started = Date.now();
        const pollForIframe = () => {
          if (slot.querySelector("iframe")) {
            resolve();
            return;
          }
          if (Date.now() - started > 8000) {
            resolve();
            return;
          }
          window.setTimeout(pollForIframe, 200);
        };
        pollForIframe();
      })
  );
}
