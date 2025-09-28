export default function DomainsNav() {
  return (
    <section>
      <div className="explore_categories">
        <button onClick={() => DomainsNav(1)}>Machine Learning</button>
        <button onClick={() => DomainsNav(2)}>Artificial Intelligence</button>
        <button onClick={() => DomainsNav(3)}>Natural Language Processing</button>
        <button onClick={() => DomainsNav(4)}>Automation</button>
      </div>
    </section>
  );
}
