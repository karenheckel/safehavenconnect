import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const qParam = new URLSearchParams(location.search).get("q");
    if (qParam) {
      setQuery(qParam);
      axios
        .get(`${BACKEND_URL}/api/search`, { params: { q: qParam } })
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search error:", err));
    } else {
      setResults([]);
    }
  }, [location]);

  return (
    <div className="container my-4">
      <h2>Search results for "{query}"</h2>
      {results.length === 0 && query && <p>No results found.</p>}

      {results.map((r, idx) => (
        <div key={idx} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{r.name}</h5>
            <p className="card-text text-muted">{r.type}</p>
            <p className="card-text">{r.description?.slice(0, 120)}...</p>
            <Link
              to={
                r.type === "Organization"
                  ? `/organizations/${r.id}`
                  : r.type === "Resource"
                    ? `/resources/${r.id}`
                    : `/events/${r.id}`
              }
              className="btn btn-primary"
            >
              View {r.type}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
