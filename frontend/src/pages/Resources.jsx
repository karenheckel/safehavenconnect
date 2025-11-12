import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Accordion, Form, Button, InputGroup } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import backupData from "../backupData.json";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [total, setTotal] = useState(3);
  const [filter, setFilter] = useState({
    types: [],
    online: "",
    orgs: [],
    hours: [],
  });
  const [sort, setSort] = useState("none");
  const cardsOnPage = 10;

  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const getResources = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/resources`, {
          params: {
            page: currPage,
            per_page: cardsOnPage,
            type: filter.types,
            hours: filter.hours,
            orgs: filter.orgs,
            online:
              filter.online === "Yes"
                ? "true"
                : filter.online === "No"
                ? "false"
                : undefined,
            sort: sort,
          },
          paramsSerializer: { indexes: null },
        });
        const pagination = res.data.pagination;
        const formatResources = res.data.data.map((resource) => ({
          title: resource.title,
          location: resource.location,
          resource_type: resource.topic,
          hours: resource.hours_of_operation || "N/A",
          online_availability: resource.online_availability ? "Yes" : "No",
          organization: resource.organization_name,
          image_url: resource.image_url,
          pageLink: resource.website_url,
          id: resource.id,
          services: resource.services,
        }));
        setResources(formatResources);
        setNumPages(pagination.pages || 1);
        setTotal(pagination.total);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResources(backupData.resources);
      } finally {
        setLoading(false);
      }
    };

    if (!searchActive) getResources();
    console.log(filter, sort);
  }, [filter, sort, currPage, searchActive]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/search`, {
        params: { q: query, model: "Resource", page: currPage, per_page: cardsOnPage },
      });
      const pagination = res.data.pagination;
      const formatResources = res.data.results.map((res) => ({
        title: res.name,
        location: res.location,
        resource_type: res.type_label,
        hours: res.hours || "N/A",
        online_availability: res.online_availability,
        organization: res.organization_name,
        image_url: res.image_url,
        id: res.id,
        services: res.services,
      }));
      setResources(formatResources);
      setNumPages(pagination.pages || 1);
      setTotal(pagination.total);
      setSearchActive(true);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSearchActive(false);
    setCurrPage(1);
  };

  useEffect(() => {
    if (searchActive) {
      handleSearch({ preventDefault: () => {} });
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

  const handleOrgChange = (org) => {
    setFilter((prev) => {
      const newOrgs = prev.orgs.includes(org)
        ? prev.orgs.filter((s) => s !== org)
        : [...prev.orgs, org];
      return { ...prev, orgs: newOrgs };
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
        <h4 className="mt-2">Loading Resources...</h4>
      </Container>
    );
  }

  return (
    <>
      <Container className="text-center my-5">
        <h1>Resources</h1>
        <p>Number of resources: {total}</p>
        
        <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
          <InputGroup style={{ maxWidth: "500px" }}>
            <Form.Control
              type="text"
              placeholder="Search resources..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Search
            </Button>
            {searchActive && (
              <Button variant="outline-secondary" onClick={clearSearch}>
                Clear
              </Button>
            )}
          </InputGroup>
        </Form>
        
        <Container>
          <Row>
            <Col xs={3}>
              <Accordion defaultActiveKey="" alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Type</Accordion.Header>
                  <Accordion.Body>
                    {["Medical Assistance", "Legal"].map((type) => (
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
                  <Accordion.Header>Organization Name</Accordion.Header>
                  <Accordion.Body>
                    {["A-F", "G-K", "L-P", "Q-U", "V-Z"].map((org) => (
                      <Form.Check
                        key={org}
                        type="checkbox"
                        label={org}
                        checked={filter.orgs.includes(org)}
                        onChange={() => handleOrgChange(org)}
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Hours</Accordion.Header>
                  <Accordion.Body>
                    {["24/7", "Weekdays", "Weekends", "Night", "N/A"].map(
                      (option) => (
                        <Form.Check
                          key={option}
                          type="checkbox"
                          label={option}
                          checked={filter.hours.includes(option)}
                          onChange={() => handleHoursChange(option)}
                        />
                      )
                    )}
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
            <Col xs={9}>
              <Row className="justify-content-center">
                {resources.map((res, index) => (
                  <InfoCard
                    key={index}
                    cardType="resource"
                    cardInfo={res}
                    id={res.id}
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

export default Resources;
