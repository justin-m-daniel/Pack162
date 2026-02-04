export const buildRewriter = () => {
  const header = `
    <header class="pack-shell">
      <div class="pack-shell__inner">
        <a class="pack-shell__logo" href="/">Pack 162</a>
        <nav class="pack-shell__nav">
          <a href="/home">Home</a>
          <a href="/event">Calendar</a>
          <a href="/node/2">About</a>
          <a class="pack-shell__cta" href="/node/2">Join</a>
        </nav>
      </div>
    </header>
  `;

  const hero = `
    <section class="pack-hero">
      <div class="pack-shell__inner">
        <p class="pack-hero__eyebrow">Cub Scout Pack 162 · Austin, TX</p>
        <h1>Adventure, belonging, and growth for every family.</h1>
        <p>
          Weekly meetings, campouts, and service projects that build confidence,
          friendships, and unforgettable memories.
        </p>
        <div class="pack-hero__actions">
          <a class="pack-btn pack-btn--primary" href="/node/2">Join the pack</a>
          <a class="pack-btn pack-btn--ghost" href="/event">See upcoming events</a>
        </div>
      </div>
    </section>
  `;

  const footer = `
    <footer class="pack-shell__footer">
      <div class="pack-shell__inner">
        <p>Pack 162 · Scouting America · Serving families with care.</p>
        <p><a href="/privacy">Privacy & Safety</a></p>
      </div>
    </footer>
  `;

  const css = `
    @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap");
    :root {
      --pack-blue: #0b4fc2;
      --pack-blue-dark: #082a5e;
      --pack-yellow: #f5c84c;
      --pack-red: #d9483b;
      --pack-ink: #0b1a2b;
      --pack-bg: #f4f7fb;
      --pack-card: #ffffff;
      --pack-shadow: 0 20px 60px rgba(10, 28, 58, 0.12);
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: "Space Grotesk", sans-serif;
      background: radial-gradient(circle at top, #ffffff 0%, #eef3fb 45%, #e9f0fb 100%);
      color: var(--pack-ink);
      line-height: 1.6;
    }
    a {
      color: var(--pack-blue);
      text-decoration: none;
    }
    a:hover {
      color: var(--pack-red);
    }
    .pack-shell {
      position: sticky;
      top: 0;
      z-index: 20;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(11, 79, 194, 0.12);
    }
    .pack-shell__inner {
      width: min(1100px, 92vw);
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      gap: 16px;
    }
    .pack-shell__logo {
      font-weight: 700;
      font-size: 1.2rem;
      color: var(--pack-blue-dark);
      letter-spacing: 0.02em;
    }
    .pack-shell__nav {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      font-size: 0.95rem;
    }
    .pack-shell__nav a {
      padding: 6px 12px;
      border-radius: 999px;
      background: rgba(11, 79, 194, 0.08);
      color: var(--pack-blue-dark);
    }
    .pack-shell__nav a:hover {
      background: rgba(217, 72, 59, 0.12);
      color: var(--pack-red);
    }
    .pack-shell__cta {
      background: var(--pack-red);
      color: #ffffff;
      padding: 8px 14px;
      border-radius: 999px;
      font-weight: 600;
    }
    .pack-shell__cta:hover {
      background: #b9342a;
      color: #ffffff;
    }
    .pack-hero {
      width: min(1100px, 92vw);
      margin: 26px auto 0;
      background: linear-gradient(120deg, rgba(11, 79, 194, 0.12), rgba(245, 200, 76, 0.25));
      border-radius: 20px;
      padding: 28px 32px;
      box-shadow: var(--pack-shadow);
    }
    .pack-hero__eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-size: 0.75rem;
      color: var(--pack-blue-dark);
      margin-bottom: 8px;
    }
    .pack-hero h1 {
      font-size: clamp(1.8rem, 3vw, 2.6rem);
      margin: 0 0 12px;
      color: var(--pack-blue-dark);
    }
    .pack-hero p {
      margin: 0;
      max-width: 58ch;
    }
    .pack-hero__actions {
      margin-top: 16px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .pack-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 999px;
      font-weight: 600;
    }
    .pack-btn--primary {
      background: var(--pack-blue);
      color: #ffffff;
    }
    .pack-btn--primary:hover {
      background: #093f9a;
    }
    .pack-btn--ghost {
      background: #ffffff;
      border: 1px solid rgba(11, 79, 194, 0.2);
      color: var(--pack-blue-dark);
    }
    .pack-btn--ghost:hover {
      border-color: rgba(217, 72, 59, 0.4);
      color: var(--pack-red);
    }
    table#container {
      width: min(1100px, 92vw);
      margin: 28px auto 40px;
      background: var(--pack-card);
      border-radius: 20px;
      box-shadow: var(--pack-shadow);
      overflow: hidden;
      border-collapse: separate;
      border-spacing: 0;
    }
    #headertop,
    #header,
    #headerbottom {
      display: none;
    }
    td {
      padding: 16px 20px;
    }
    h1,
    h2,
    h3,
    h4 {
      color: var(--pack-blue-dark);
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
    }
    .pack-shell__footer {
      margin-top: 40px;
      padding: 24px 0 48px;
    }
    .pack-shell__footer p {
      margin: 6px 0;
      color: rgba(11, 26, 43, 0.7);
    }
    @media (max-width: 768px) {
      .pack-shell__inner {
        flex-direction: column;
        align-items: flex-start;
      }
      .pack-hero {
        padding: 20px;
      }
      td {
        padding: 12px 14px;
      }
    }
  `;

  return new HTMLRewriter()
    .on("head", {
      element(element) {
        element.append(`<style>${css}</style>`, { html: true });
      },
    })
    .on("body", {
      element(element) {
        element.prepend(`${header}${hero}`, { html: true });
        element.append(footer, { html: true });
      },
    });
};
