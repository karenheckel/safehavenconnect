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
      {query && (
        <p>
          Results for: <strong>{query}</strong>
        </p>
      )}
      <p>Number of results: {total}</p>

      <Row className="justify-content-center">
        {results.length > 0 ? (
          results.map((r, i) => {
            const cardType = r.type.toLowerCase();

            let cardInfo = {};

            if (r.type === "Organization") {
              cardInfo = {
                title: <span dangerouslySetInnerHTML={{ __html: r.name }} />,
                location: <span dangerouslySetInnerHTML={{ __html: r.location || "N/A" }} />,
                services: <span dangerouslySetInnerHTML={{ __html: r.services || "N/A" }} />,
                hours: <span dangerouslySetInnerHTML={{ __html: r.hours || "N/A" }} />,
                online_availability: r.online_availability,
                org_type: <span dangerouslySetInnerHTML={{ __html: r.type_label || "N/A" }} />,
                image_url: r.image_url,
                pageLink:
                  r.website_url && r.website_url !== "N/A" ? (
                    <a
                      href={r.website_url.replace(/<[^>]+>/g, "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      dangerouslySetInnerHTML={{ __html: r.website_url }}
                    />
                  ) : (
                    "N/A"
                  ),
                id: r.id,
              };
            } else if (r.type === "Resource") {
              cardInfo = {
                title: <span dangerouslySetInnerHTML={{ __html: r.name }} />,
                location: <span dangerouslySetInnerHTML={{ __html: r.location || "N/A" }} />,
                resource_type: <span dangerouslySetInnerHTML={{ __html: r.type_label || "N/A" }} />,
                hours: <span dangerouslySetInnerHTML={{ __html: r.hours || "N/A" }} />,
                online_availability: r.online_availability,
                organization: <span dangerouslySetInnerHTML={{ __html: r.organization_name || "N/A" }} />,
                image_url: r.image_url,
                pageLink:
                  r.website_url && r.website_url !== "N/A" ? (
                    <a
                      href={r.website_url.replace(/<[^>]+>/g, "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      dangerouslySetInnerHTML={{ __html: r.website_url }}
                    />
                  ) : (
                    "N/A"
                  ),
                id: r.id,
              };
            } else if (r.type === "Event") {
              cardInfo = {
                title: <span dangerouslySetInnerHTML={{ __html: r.name }} />,
                event_type: <span dangerouslySetInnerHTML={{ __html: r.type_label || "N/A" }} />,
                description: <span dangerouslySetInnerHTML={{ __html: r.description || "N/A" }} />,
                location: <span dangerouslySetInnerHTML={{ __html: r.location || "N/A" }} />,
                online_availability: r.online_availability,
                image_url: r.image_url,
                id: r.id,
              };
            }

            return (
              <InfoCard
                key={`${r.type}-${r.id}-${i}`}
                cardType={cardType}
                id={r.id}
                cardInfo={cardInfo}
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
