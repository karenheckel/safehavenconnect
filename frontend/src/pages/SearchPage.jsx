import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [total, setTotal] = useState(0);
  const cardsOnPage = 12;

  const getSearchResults = async (q, page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/search`, {
        params: { q, page, per_page: cardsOnPage },
      });
      const pagination = res.data.pagination;
      setResults(res.data.results);
      setNumPages(pagination.pages || 1);
      setTotal(pagination.total);
    } catch (err) {
      console.error("Error fetching search results:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qParam = params.get("q") || "";
    const pageParam = parseInt(params.get("page") || "1", 10);
    setQuery(qParam);
    setCurrPage(pageParam);

    if (qParam.trim()) {
      getSearchResults(qParam, pageParam);
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [location.search]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate(`/search?${params.toString()}`);
  };

  if (loading) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Searching...</h4>
      </Container>
    );
  }

  return (
    <Container className="text-center my-5">
      <h1>Search Results</h1>
      {query && <p>Results for: <strong>{query}</strong></p>}
      <p>Number of results: {total}</p>

      <Row className="justify-content-center">
        {results.length > 0 ? (
          results.map((r, i) => {
            const highlightedDescription = {__html: r.description?.length > 200 ? r.description.slice(0, 200) + "..."
                : r.description,
            };
            return (
              <InfoCard
                key={i}
                id={r.id}
                cardType={r.type.toLowerCase()}
                cardInfo={{
                  title: (<span dangerouslySetInnerHTML={{ __html: r.name }}/>),
                  description: (<span dangerouslySetInnerHTML={highlightedDescription}/>),
                  image_url: r.image_url,
                  type: r.type,
                }}
              />
            );
          })
        ) : (
          <h5>No results found.</h5>
        )}
      </Row>

      {numPages > 1 && (
        <Container className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-secondary mx-2"
            onClick={() => handlePageChange(Math.max(currPage - 1, 1))}
            disabled={currPage === 1}
          >
            Previous
          </button>

          <span className="align-self-center mx-2">
            Page {currPage} of {numPages}
          </span>

          <button
            className="btn btn-secondary mx-2"
            onClick={() =>
              handlePageChange(currPage < numPages ? currPage + 1 : currPage)
            }
            disabled={currPage >= numPages}
          >
            Next
          </button>
        </Container>
      )}
    </Container>
  );
};

export default SearchPage;
