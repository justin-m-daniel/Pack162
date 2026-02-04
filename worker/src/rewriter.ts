export const buildRewriter = () => {
  const header = `
    <header class="pack-shell">
      <div class="pack-shell__inner">
        <a class="pack-shell__logo" href="/">Pack 162</a>
        <nav class="pack-shell__nav">
          <a href="/about">About</a>
          <a href="/join">Join</a>
          <a href="/events">Events</a>
          <a href="/docs">Docs</a>
          <a href="/legacy">Legacy</a>
        </nav>
      </div>
    </header>
  `;

  const footer = `
    <footer class="pack-shell__footer">
      <div class="pack-shell__inner">
        <p>Pack 162 · Scouting America · Serving families with care.</p>
        <p><a href="/privacy">Privacy & Safety</a></p>
      </div>
    </footer>
  `;

  return new HTMLRewriter()
    .on("head", {
      element(element) {
        element.append(
          `<link rel="stylesheet" href="/assets/shell.css" />`,
          { html: true }
        );
      },
    })
    .on("body", {
      element(element) {
        element.prepend(header, { html: true });
        element.append(footer, { html: true });
      },
    });
};
