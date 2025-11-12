import React, { useState, useEffect } from "react";
import { Container, Row, Form, InputGroup, Button } from "react-bootstrap";
import InfoCard from "./InfoCard";
import axios from "axios";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const ModelSearchGrid = ({ model, filters, sort, cardsOnPage = 10 }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const fetchData = async (page = 1, searchQuery = query) => {
    try {
      setLoading(true);
      let data = [];
      let pagination = { total: 0, pages: 1 };

      if (searchActive && searchQuery.trim()) {
        const res = await axios.get(`${BACKEND_URL}/api/search`, {
          params: {
            q: searchQuery,
            page,
            per_page: cardsOnPage,
            type: model.toLowerCase(),
          },
        });
        data = res.data.results;
        pagination = res.data.pagination;
      } else {
        const res = await axios.get(`${BACKEND_URL}/api/${model.toLowerCase()}s`, {
          params: { page, per_page: cardsOnPage, sort, ...filters },
          paramsSerializer: { indexes: null },
        });
        data = res.data.data;
        pagination = res.data.pagination;
      }

      setItems(data);
      setNumPages(pagination.pages || 1);
      setTotal(pagination.total || data.length);
    } catch (err) {
      console.error(`Error fetching ${model}s:`, err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currPage);
  }, [currPage, filters, sort, searchActive]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchActive(true);
      setCurrPage(1);
      fetchData(1, query);
    } else {
      setSearchActive(false);
      fetchData(1);
    }
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchActive(false);
    setCurrPage(1);
    fetchData(1);
  };

  const safe = (val) => <span dangerouslySetInnerHTML={{ __html: val || "N/A" }} />;

  const renderCard = (r, i) => {
    const type = model.toLowerCase();

    if (type === "organization") {
      return (
        <InfoCard
          key={`${r.id}-${i}`}
          cardType="organization"
          id={r.id}
          cardInfo={{
            title: safe(r.name || r.title),
            location: safe(r.location),
            services: safe(r.services),
            hours: safe(r.hours || r.hours_of_operation),
            online_availability: r.online_availability || "No",
            org_type: safe(r.type_label || r.organization_type),
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
          }}
        />
      );
    } else if (type === "resource") {
      return (
        <InfoCard
          key={`${r.id}-${i}`}
          cardType="resource"
          id={r.id}
          cardInfo={{
            title: safe(r.name || r.title),
            location: safe(r.location),
            resource_type: safe(r.type_label || r.topic),
            hours: safe(r.hours || r.hours_of_operation),
            online_availability: r.online_availability || "No",
            organization: safe(r.organization_name),
            image_url: r.image_url,
          }}
        />
      );
    } else if (type === "event") {
      return (
        <InfoCard
          key={`${r.id}-${i}`}
          cardType="event"
          id={r.id}
          cardInfo={{
            title: safe(r.name || r.title),
            description: safe(r.description),
            event_type: safe(r.type_label || r.event_type),
            location: safe(r.location),
            online_availability: r.online_availability || "No",
            image_url: r.image_url,
          }}
        />
      );
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <div className="spinner-border mb-3" role="status"></div>
        <h4>Loading...</h4>
      </Container>
    );
  }

  return (
    <>
      {/* Search bar */}
      <Form onSubmit={handleSearch} className="mb-4">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder={`Search ${model.toLowerCase()}s...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" variant="primary">Search</Button>
          {searchActive && (
            <Button variant="outline-secondary" onClick={handleClearSearch}>
              Clear
            </Button>
          )}
        </InputGroup>
      </Form>

      <p>Number of results: {total}</p>

      <Row className="justify-content-center">
        {items.length > 0 ? items.map(renderCard) : <h5>No results found.</h5>}
      </Row>

      {/* Pagination */}
      {numPages > 1 && (
        <Container className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-secondary mx-2"
            onClick={() => setCurrPage((p) => Math.max(p - 1, 1))}
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
              setCurrPage((p) => (p < numPages ? p + 1 : p))
            }
            disabled={currPage >= numPages}
          >
            Next
          </button>
        </Container>
      )}
    </>
  );
};

export default ModelSearchGrid;
