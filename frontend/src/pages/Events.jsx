import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button, Accordion, } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import backupData from "../backupData.json";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const Events = () => {
  const [eventsInfo, setEventsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [total, setTotal] = useState(3);
  const [filter, setFilter] = useState({
    types: [],
    online: "",
    registration: "",
    hours: [],
  });
  const [sort, setSort] = useState("none");
  const cardsOnPage = 12;

  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const getEvents = async (pageToFetch = 1) => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/events`, {
        params: {
          page: pageToFetch,
          per_page: cardsOnPage,
          event_type: filter.types,
          hours: filter.hours,
          online:
            filter.online === "Yes" ? "true" : filter.online === "No"
              ? "false" : undefined,
          registration_open: filter.registration === "Open" ? "true"
            : filter.registration === "Closed" ? "false" : undefined,
          sort: sort,
        },
      });

      const pagination = res.data.pagination;

      const formatted = res.data.data.map((e) => ({
        id: e.id,
        title: e.name,
        description: e.description,
        event_type: e.event_type,
        location: e.location,
        date: e.date,
        start_time: e.start_time,
        end_time: e.end_time,
        online_availability: e.is_online ? "Yes" : "No",
        registration: e.registration_open ? "Open" : "Closed",
        image_url: e.image_url,
      }));

      setEventsInfo(formatted);
      setNumPages(pagination.pages || 1);
      setTotal(pagination.total);
    } catch (err) {
      console.error("Error fetching events:", err);
      setEventsInfo(backupData.events);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/search`, {
        params: {
          q: query,
          model: "Event",
          page: currPage,
          per_page: cardsOnPage,
        },
      });
      const pagination = res.data.pagination;

      const formatted = res.data.results.map((r) => ({
        id: r.id,
        title: r.name,
        description: r.description,
        event_type: r.type_label,
        location: r.location,
        date: r.date,
        start_time: r.start_time,
        end_time: r.end_time,
        online_availability: r.online_availability,
        registration: r.registration_open ? "Open" : "Closed",
        image_url: r.image_url,
      }));

      setEventsInfo(formatted);
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
    getEvents(1);
  };

  useEffect(() => {
    if (searchActive) {
      handleSearch({ preventDefault: () => { } });
    } else {
      getEvents(currPage);
    }
  }, [currPage, searchActive, filter, sort]);

  useEffect(() => {
    getEvents(1);
  }, []);

  const handleHoursChange = (hour) => {
    setFilter((prev) => {
      const newHours = prev.hours.includes(hour)
        ? prev.hours.filter((h) => h !== hour)
        : [...prev.hours, hour];
      return { ...prev, hours: newHours };
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
        <h4 className="mt-2">Loading Events...</h4>
      </Container>
    );
  }

  return (
    <Container className="text-center my-5">
      <h1>Upcoming Events</h1>
      <p>Number of events: {total}</p>

      <Form
        onSubmit={handleSearch}
        className="d-flex justify-content-center mb-5"
      >
        <InputGroup
          style={{ maxWidth: "550px" }}
          className="shadow-sm rounded-pill"
        >
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
            placeholder="Search events..."
            aria-label="Search events"
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
                <Accordion.Header>Event Type</Accordion.Header>
                <Accordion.Body>
                  {[
                    "Class",
                    "Education",
                    "Family Event",
                    "Health",
                    "Legal Clinic",
                    "Meal Service",
                    "Meeting",
                    "Orientation",
                    "Outreach",
                    "Preparedness",
                    "Respite",
                    "Safety",
                    "Social",
                    "Support",
                    "Therapy",
                    "Training",
                    "Wellness",
                    "Workshop",
                  ].map((type) => (
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
                <Accordion.Header>Registration Open</Accordion.Header>
                <Accordion.Body>
                  <Form.Check
                    type="radio"
                    name="registration"
                    label="All"
                    checked={filter.registration === ""}
                    onChange={() => setFilter({ ...filter, registration: "" })}
                  />
                  <Form.Check
                    type="radio"
                    name="registration"
                    label="Open"
                    checked={filter.registration === "Open"}
                    onChange={() =>
                      setFilter({ ...filter, registration: "Open" })
                    }
                  />
                  <Form.Check
                    type="radio"
                    name="registration"
                    label="Closed"
                    checked={filter.registration === "Closed"}
                    onChange={() =>
                      setFilter({ ...filter, registration: "Closed" })
                    }
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Hours</Accordion.Header>
                <Accordion.Body>
                  {["Morning", "Afternoon", "Evening", "N/A"].map((option) => (
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
                    <option value="name">Event Name</option>
                    <option value="state">Location (State)</option>
                    <option value="date">Event Date</option>
                  </Form.Select>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>

          <Col xs={12} md={9} style={{ order: 2 }}>
            <Row className="justify-content-center">
              {eventsInfo.map((event, i) => (
                <InfoCard
                  key={i}
                  cardType="event"
                  cardInfo={event}
                  id={event.id}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

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
          onClick={() => setCurrPage((p) => (p < numPages ? p + 1 : p))}
          disabled={currPage >= numPages}
        >
          Next
        </button>
      </Container>
    </Container>
  );
};

export default Events;