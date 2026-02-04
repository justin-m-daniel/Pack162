const App = () => {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Cub Scouts · Pack 162</p>
          <h1>Adventure starts here.</h1>
          <p className="lede">
            A welcoming, family-first Cub Scout pack focused on fun, character,
            and community service.
          </p>
          <div className="actions">
            <a className="button primary" href="/join">
              Join the Pack
            </a>
            <a className="button ghost" href="/events">
              Upcoming Events
            </a>
          </div>
        </div>
        <div className="card">
          <h2>Next meeting</h2>
          <p>Thursday · 6:30 PM · Community Hall</p>
          <p className="muted">Check the legacy site for full calendar.</p>
        </div>
      </section>

      <section className="grid">
        <article>
          <h3>What we do</h3>
          <p>
            Outdoor adventures, STEM nights, service projects, and family
            traditions that build confidence and friendships.
          </p>
        </article>
        <article>
          <h3>For families</h3>
          <p>
            We welcome all families and provide clear expectations, schedules,
            and volunteer roles.
          </p>
        </article>
        <article>
          <h3>Get involved</h3>
          <p>
            Reach out to learn about leadership, committee roles, or parent
            helpers.
          </p>
        </article>
      </section>
    </div>
  );
};

export default App;
