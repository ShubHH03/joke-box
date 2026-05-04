import { useState, useEffect } from "react";
import "./App.css";

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function JokeCard({ joke, index }) {
  return (
    <div className="joke-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <span className="quote-mark">&ldquo;</span>
      <p className="joke-content">{joke.content}</p>
      {joke.categories?.length > 0 && (
        <div className="joke-footer">
          {joke.categories.slice(0, 4).map((cat) => (
            <span key={cat} className="category-tag">
              {cat}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [jokes, setJokes] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJokes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/randomjokes?query=${category || "science"}`,
        );
        if (!response.ok)
          throw new Error(`Request failed (${response.status})`);
        const data = await response.json();
        setJokes(data.data?.data ?? []);
      } catch (err) {
        setError(err.message);
        setJokes([]);
      } finally {
        setLoading(false);
      }
    };

    const id = setTimeout(fetchJokes, 700);
    return () => clearTimeout(id);
  }, [category]);

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-icon">😄</div>
        <h1 className="title">Joke Box</h1>
        <p className="subtitle">Discover hilarious jokes by category</p>
      </header>

      {/* ── Search ── */}
      <div className="search-wrapper">
        <span className="search-icon-wrap">
          <SearchIcon />
        </span>
        <input
          className="search-input"
          type="text"
          placeholder='Search by category (e.g. "science", "food"…)'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        {category && (
          <button
            className="clear-btn"
            onClick={() => setCategory("")}
            aria-label="Clear"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Content ── */}
      {loading ? (
        <div className="state-box">
          <div className="spinner" />
          <p className="state-label">Fetching jokes…</p>
        </div>
      ) : error ? (
        <div className="state-box">
          <span className="state-emoji">⚠️</span>
          <p className="state-label">{error}</p>
          <button className="retry-btn" onClick={() => setCategory((c) => c)}>
            Retry
          </button>
        </div>
      ) : jokes.length === 0 ? (
        <div className="state-box">
          <span className="state-emoji">🔍</span>
          <p className="state-label">No jokes found for this category.</p>
        </div>
      ) : (
        <>
          <p className="results-meta">
            {jokes.length} joke{jokes.length !== 1 ? "s" : ""} found
          </p>
          <div className="jokes-grid">
            {jokes.map((joke, i) => (
              <JokeCard key={joke.id} joke={joke} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
