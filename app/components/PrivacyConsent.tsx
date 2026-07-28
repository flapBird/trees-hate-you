"use client";

import { useEffect, useRef, useState } from "react";

const CONSENT_KEY = "trees-hate-you-privacy-consent-v1";
const CONSENT_EVENT = "trees-hate-you-consent-changed";
const OPEN_EVENT = "trees-hate-you-open-privacy-choices";

type ConsentChoice = "essential" | "all";

export default function PrivacyConsent() {
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(localStorage.getItem(CONSENT_KEY) === null);

    const openChoices = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, openChoices);
    return () => window.removeEventListener(OPEN_EVENT, openChoices);
  }, []);

  useEffect(() => {
    if (visible) {
      panelRef.current?.focus();
    }
  }, [visible]);

  function saveChoice(choice: ConsentChoice) {
    const previousChoice = localStorage.getItem(CONSENT_KEY);
    localStorage.setItem(CONSENT_KEY, choice);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
    if (previousChoice === "all" && choice === "essential") {
      window.location.reload();
    }
  }

  if (!visible) {
    return null;
  }

  return (
    <section
      className="privacy-consent"
      aria-label="Privacy choices"
      ref={panelRef}
      tabIndex={-1}
    >
      <div>
        <p className="eyebrow">Your privacy choices</p>
        <h2>Choose how this site uses optional services.</h2>
        <p>
          The game and essential site features work without analytics or advertising cookies.
          If you accept all, Google Analytics and our advertising partner may load. Read the{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
      <div className="consent-actions">
        <button type="button" className="secondary-action" onClick={() => saveChoice("essential")}>
          Essential only
        </button>
        <button type="button" className="primary-action" onClick={() => saveChoice("all")}>
          Accept all
        </button>
      </div>
    </section>
  );
}
