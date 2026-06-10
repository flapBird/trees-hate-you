"use client";

import type { Metadata } from "next";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormState("submitting");
    setFormMessage("Sending your message through the forest...");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: formData.get("name"),
          email: formData.get("email"),
          review: `[CONTACT] ${formData.get("message")}`,
          rating: 5
        })
      });

      if (response.ok) {
        setFormState("success");
        setFormMessage("Message sent! We'll get back to you soon.");
        form.reset();
      } else {
        const data = await response.json().catch(() => null) as { error?: string } | null;
        setFormState("error");
        setFormMessage(data?.error ?? "Failed to send. Please try again later.");
      }
    } catch {
      setFormState("error");
      setFormMessage("Network error. The trees might be interfering. Try again.");
    }
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Primary navigation">
          <a className="logo" href="/">🌲 TREES HATE YOU</a>
          <div className="nav-links" style={{ position: "static", display: "flex", padding: 0, border: 0, background: "transparent", boxShadow: "none", transform: "none" }}>
            <a href="/#play">Play</a>
            <a href="/about">About</a>
            <a href="/#how-to-play">How to Play</a>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="section" aria-label="Contact Us">
          <h1>Contact Us</h1>

          <div className="story" style={{ maxWidth: "680px" }}>
            <p>
              Got questions, feedback, or a particularly creative way the trees murdered you?
              We&apos;d love to hear it. Use the form below to reach the developer behind Trees Hate You.
            </p>

            <h2>Send a Message</h2>
            <form className="review-form" onSubmit={submitContact} style={{ marginTop: "16px" }}>
              <label>
                Your Name
                <input name="name" placeholder="Your forest survivor name" required maxLength={48} />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="your@email.com" required maxLength={160} />
                <small>So we can reply to your message</small>
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Tell us what's on your mind..." required maxLength={1200} />
              </label>
              <button className="submit-review" type="submit" disabled={formState === "submitting"}>
                <span>{formState === "submitting" ? "Sending..." : "Send Message 🌲"}</span>
              </button>
              {formMessage && (
                <p className={`form-message ${formState}`}>{formMessage}</p>
              )}
            </form>

            <h2>Other Ways to Reach Us</h2>
            <p>
              The Trees Hate You demo is live on{" "}
              <a href="https://tykenn.itch.io/trees-hate-you" target="_blank" rel="noopener noreferrer" style={{ color: "var(--leaf)", textDecoration: "underline" }}>
                itch.io
              </a>.
              Check there for the latest updates, devlog posts, and community discussions.
            </p>
            <p>
              For press inquiries, collaboration requests, or business matters, use the contact
              form above and we&apos;ll route your message accordingly.
            </p>

            <p className="credit">
              Made by indie developer Tykenn. Demo live on itch.io now. Full Steam release planned for 2026.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 treeshateyou.help</p>
        <nav aria-label="Footer navigation">
          <a href="/#play">Play</a>
          <a href="/about">About</a>
          <a href="/#how-to-play">How to Play</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </nav>
      </footer>
    </>
  );
}
