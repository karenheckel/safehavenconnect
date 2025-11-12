import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Accordion, Form } from "react-bootstrap";
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
  const [filter, setFilter] = useState({
    types: [],
    online: "",
    services: [],
    hours: [],
  });
  const [sort, setSort] = useState("none");
  const cardsOnPage = 10;

  useEffect(() => {
    const getOrganizations = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/organizations`, {
          params: { 
            page: currPage, 
            per_page: cardsOnPage,
            type: filter.types, 
            hours: filter.hours, 
            online: filter.online === "Yes" ? true : false, 
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
          pageLink: org.website_url,
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
    getOrganizations();
  }, [filter, currPage, sort]);

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

  const filteredOrganizations = organizations
    .filter((org) => {
      const matchType =
        filter.types.length === 0 ||
        filter.types.some((t) =>
          org.org_type?.toLowerCase().includes(t.toLowerCase())
        );
      const matchOnline =
        !filter.online || org.online_availability === filter.online;
      const matchService =
        filter.services.length === 0 ||
        filter.services.some((s) =>
          org.services?.toLowerCase().includes(s.toLowerCase())
        );
      const matchHours =
        filter.hours.length === 0 ||
        org.hours?.toLowerCase() === "n/a" ||
        filter.hours.some((h) =>
          org.hours?.toLowerCase().includes(h.toLowerCase())
        );

      return matchType && matchOnline && matchService && matchHours;
    })
    .sort((a, b) => {
      if (sort === "state") {
        return a.location.localeCompare(b.location);
      } else if (sort === "name") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  if (loading) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Loading Organizations…</h4>
      </Container>
    );
  }

  return (
    <>
      <Container className="text-center my-5">
        <h1>Organizations</h1>
        <p>Number of Organizations: {total}</p>
        <Container>
          <Row>
            <Col xs={3}>
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
                    {["Medical", "Food", "Counseling", "Emergency Shelter"].map(
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
                    {["24-hour", "Weekdays", "Weekends"].map((option) => (
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
            <Col xs={9}>
              <Row className="justify-content-center">
                {filteredOrganizations.map((org, index) => (
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
