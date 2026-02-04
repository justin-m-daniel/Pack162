const App = () => {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Cub Scouts · Pack 162</p>
          <h1>Big adventures, close to home.</h1>
          <p className="lede">
            We’re a friendly, modern Cub Scout pack for families in Austin. We
            build character through outdoor fun, hands-on learning, and service.
          </p>
          <div className="actions">
            <a className="button primary" href="/join">
              Join Pack 162
            </a>
            <a className="button ghost" href="/event">
              View the Calendar
            </a>
          </div>
          <div className="hero__meta">
            <div>
              <span>Next meeting</span>
              <strong>Thursday · 6:30 PM</strong>
            </div>
            <div>
              <span>Location</span>
              <strong>Community Hall</strong>
            </div>
          </div>
        </div>
        <div className="hero__panel">
          <div className="hero__card">
            <p className="badge">Family-friendly</p>
            <h2>New families welcome</h2>
            <p>
              Bring curiosity, we’ll bring the program. No prior experience
              required.
            </p>
            <a className="text-link" href="/join">
              Learn about joining →
            </a>
          </div>
          <div className="hero__card accent">
            <h3>Upcoming highlights</h3>
            <ul>
              <li>Outdoor hike + nature journal</li>
              <li>STEM night with rocket builds</li>
              <li>Service project: food pantry drive</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="stats">
        <div>
          <h3>Active dens</h3>
          <p>Kindergarten–5th grade</p>
        </div>
        <div>
          <h3>Monthly adventures</h3>
          <p>Outdoor + STEM + service</p>
        </div>
        <div>
          <h3>Family-first culture</h3>
          <p>Inclusive, supportive, fun</p>
        </div>
      </section>

      <section className="grid">
        <article>
          <h3>What we do</h3>
          <p>
            Campfires, hikes, Pinewood Derby, and hands-on learning that help
            scouts build confidence.
          </p>
        </article>
        <article>
          <h3>For families</h3>
          <p>
            Clear schedules, flexible volunteering, and a friendly community to
            share the adventure.
          </p>
        </article>
        <article>
          <h3>Get involved</h3>
          <p>
            Ask about den leadership, committee roles, or one-time event
            support.
          </p>
        </article>
      </section>

      <section className="cta">
        <div>
          <h2>Ready to visit a meeting?</h2>
          <p>
            We’ll help you find the right den and answer questions about
            uniforms, costs, and schedules.
          </p>
        </div>
        <a className="button primary" href="/join">
          Contact us to get started
        </a>
      </section>
    </div>
  );
};

export default App;
