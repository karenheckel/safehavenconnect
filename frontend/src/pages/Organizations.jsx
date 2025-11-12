import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Accordion, Form, InputGroup, Button } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import backupData from "../backupData.json";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [total, setTotal] = useState(3);

  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [filter, setFilter] = useState({
    types: [],
    online: "",
    services: [],
    hours: [],
  });
  const [sort, setSort] = useState("none");
  const cardsOnPage = 12;

  const getOrganizations = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/organizations`, {
        params: {
          page: currPage,
          per_page: cardsOnPage,
          type: filter.types,
          services: filter.services,
          hours: filter.hours,
          online: (
            filter.online === "Yes"
              ? "true"
              : filter.online === "No"
                ? "false"
                : undefined
          ),
          sort: sort
        },
        paramsSerializer: { indexes: null }
      },
      );
      const pagination = res.data.pagination;
      const formatOrgs = res.data.data.map((org) => ({
        title: org.name,
        location: org.location,
        services: org.services,
        hours: org.hours_of_operation || "N/A",
        online_availability: org.online_availability ? "Yes" : "No",
        org_type: org.organization_type,
        image_url: org.image_url,
        pageLink: org.website_url || "N/A",
        id: org.id,
      }));
      setOrganizations(formatOrgs);
      setNumPages(pagination.pages || 1);
      setTotal(pagination.total);
    } catch (error) {
      setOrganizations(backupData.organizations);
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizations();
    console.log(filter, sort)
  }, [filter, currPage, sort]);

  // Fetch search results
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/search`, {
        params: { q: query, model: "Organization", page: currPage, per_page: cardsOnPage },
      });
      const pagination = res.data.pagination;
      const formatOrgs = res.data.results.map((org) => ({
        title: org.name,
        location: org.location,
        services: org.services,
        hours: org.hours || "N/A",
        online_availability: org.online_availability,
        org_type: org.type_label,
        image_url: org.image_url,
        pageLink: org.website_url,
        id: org.id,
      }));
      setOrganizations(formatOrgs);
      setNumPages(pagination.pages || 1);
      setTotal(pagination.total);
      setSearchActive(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Clear search and reset to normal view
  const clearSearch = () => {
    setQuery("");
    setSearchActive(false);
    setCurrPage(1);
  };

  // Run normal fetch if not searching
  useEffect(() => {
    if (!searchActive) {
      getOrganizations(currPage);
    }
  }, [filter, currPage, sort, searchActive]);

  // Re-run search when changing page during active search
  useEffect(() => {
    if (searchActive) {
      handleSearch(new Event("submit"));
    }
  }, [currPage]);

  const handleHoursChange = (hour) => {
    setFilter((prev) => {
      const newHours = prev.hours.includes(hour)
        ? prev.hours.filter((h) => h !== hour)
        : [...prev.hours, hour];
      return { ...prev, hours: newHours };
    });
  };

  const handleServiceChange = (service) => {
    setFilter((prev) => {
      const newServices = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services: newServices };
    });
  };

  const handleTypeChange = (type) => {
    setFilter((prev) => {
      const newTypes = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];
      return { ...prev, types: newTypes };
    });
  };

  if (loading) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">
          {searchActive ? "Searching…" : "Loading Organizations…"}
        </h4>
      </Container>
    );
  }

  return (
    <>
      <Container className="text-center my-5">
        <h1>Organizations</h1>
        <p>Number of Organizations: {total}</p>


        {/* Search Bar */}
        <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-5">
          <InputGroup style={{ maxWidth: "550px" }} className="shadow-sm rounded-pill">
            <InputGroup.Text
              id="search-icon"
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: "50rem",
                borderBottomLeftRadius: "50rem",
              }}
            >
              <i className="bi bi-search text-muted"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search organizations..."
              aria-label="Search organizations"
              aria-describedby="search-icon"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                borderLeft: "none",
                borderTopRightRadius: "50rem",
                borderBottomRightRadius: "50rem",
                paddingLeft: "0.5rem",
              }}
            />
            <Button
              variant="success"
              type="submit"
              className="px-4 rounded-pill ms-2"
              style={{
                backgroundColor: "#2e856e",
                borderColor: "#2e856e",
              }}
            >
              Search
            </Button>
            {searchActive && (
              <Button
                variant="outline-secondary"
                onClick={clearSearch}
                className="px-3 rounded-pill ms-2"
              >
                <i className="bi bi-x-circle me-1"></i> Clear
              </Button>
            )}
          </InputGroup>
        </Form>



        <Container fluid>
          <Row>
            <Col xs={12} md={3} className="mb-3 mb-md-0" style={{ order: 1 }}>
              <Accordion defaultActiveKey="" alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Type</Accordion.Header>
                  <Accordion.Body>
                    {["Health Center", "Shelter"].map((type) => (
                      <Form.Check
                        key={type}
                        type="checkbox"
                        label={type}
                        checked={filter.types.includes(type)}
                        onChange={() => handleTypeChange(type)}
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Online Availability</Accordion.Header>
                  <Accordion.Body>
                    <Form.Check
                      type="radio"
                      name="online"
                      label="All"
                      checked={filter.online === ""}
                      onChange={() => setFilter({ ...filter, online: "" })}
                    />
                    <Form.Check
                      type="radio"
                      name="online"
                      label="Yes"
                      checked={filter.online === "Yes"}
                      onChange={() => setFilter({ ...filter, online: "Yes" })}
                    />
                    <Form.Check
                      type="radio"
                      name="online"
                      label="No"
                      checked={filter.online === "No"}
                      onChange={() => setFilter({ ...filter, online: "No" })}
                    />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Services</Accordion.Header>
                  <Accordion.Body>
                    {["Healthcare", "Outreach", "Preventive"].map(
                      (service) => (
                        <Form.Check
                          key={service}
                          type="checkbox"
                          label={service}
                          checked={filter.services.includes(service)}
                          onChange={() => handleServiceChange(service)}
                        />
                      )
                    )}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Hours</Accordion.Header>
                  <Accordion.Body>
                    {["24/7", "Weekdays", "Weekends", "Night", "N/A"].map((option) => (
                      <Form.Check
                        key={option}
                        type="checkbox"
                        label={option}
                        checked={filter.hours.includes(option)}
                        onChange={() => handleHoursChange(option)}
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>Sort</Accordion.Header>
                  <Accordion.Body>
                    <Form.Select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="none">No Sort</option>
                      <option value="state">Location (State)</option>
                      <option value="name">Name</option>
                    </Form.Select>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col xs={12} md={9} style={{ order: 2 }}>
              <Row className="justify-content-center">
                {organizations.map((org, index) => (
                  <InfoCard
                    key={index}
                    cardType="organization"
                    cardInfo={org}
                    id={org.id}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>

        <Container className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-secondary mx-2"
            onClick={() => setCurrPage((prev) => Math.max(prev - 1, 1))}
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
              setCurrPage((prev) => (prev < numPages ? prev + 1 : prev))
            }
            disabled={currPage >= numPages}
          >
            Next
          </button>
        </Container>
      </Container>
    </>
  );
};

export default Organizations;
