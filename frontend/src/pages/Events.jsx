import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  Accordion,
} from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";
import backupData from "../backupData.json";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const formatEventData = (event) => {
  let formattedTime = "N/A";
  let formattedDate = "N/A";

  if (event.start_time && event.end_time) {
    try {
      const start = new Date(event.start_time);
      const end = new Date(event.end_time);
      formattedTime = `${start.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })} - ${end.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}`;
    } catch (e) {
      console.error("Could not parse event time:", e);
    }
  } else if (event.time && event.time.includes(" - ")) {
    try {
      const [startStr, endStr] = event.time.split(" - ");
      const start = new Date(startStr);
      const end = new Date(endStr);
      formattedTime = `${start.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })} - ${end.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      })}`;
    } catch (e) {
      console.error("Could not parse search time:", e);
    }
  } else if (event.time) {
    formattedTime = event.time;
  }

  if (event.date) {
    try {
      const dateObj = new Date(event.date + "T00:00:00");
      formattedDate = dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Could not parse event date:", e);
    }
  }

  return {
    id: event.id,
    title: event.name,
    description: event.description,
    event_type: event.event_type|| "N/A",
    location: event.location,
    date: formattedDate,
    time: formattedTime,
    online_availability: event.is_online
      ? "Yes"
      : event.online_availability || "No",
    registration: event.registration_open ? "Open" : "Closed",
    image_url: event.image_url,
  };
};

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
            filter.online === "Yes"
              ? "true"
              : filter.online === "No"
              ? "false"
              : undefined,
          registration_open:
            filter.registration === "Open"
              ? "true"
              : filter.registration === "Closed"
              ? "false"
              : undefined,
          sort: sort,
        },
        paramsSerializer: {
          indexes: null,
        }, 
      });
      const pagination = res.data.pagination;
      const formatted = res.data.data.map(formatEventData);
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

  const handleSearch = async (e, page = 1) => {
    if (e) e.preventDefault();
    setCurrPage(page)
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/search`, {
        params: {
          q: query,
          model: "Event",
          page,
          per_page: cardsOnPage,
        },
      });
      const pagination = res.data.pagination;
      const formatEvents = res.data.results.map(formatEventData);
      setEventsInfo(formatEvents);
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

  const pageChange = (newPage) => {
    if (searchActive) {
      handleSearch(null, newPage)
    } else {
      setCurrPage(newPage)
    }
  }

  useEffect(() => {
    if (!searchActive) {
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
    setCurrPage(1)
  };

  const handleTypeChange = (type) => {
    setFilter((prev) => {
      const newTypes = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];
      return { ...prev, types: newTypes };
    });
    setCurrPage(1)
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
      <p>Showing {eventsInfo.length} events on this page</p>
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
                    onChange={() => {setCurrPage(1)
                      setFilter({ ...filter, online: "" })}}
                  />
                  <Form.Check
                    type="radio"
                    name="online"
                    label="Yes"
                    checked={filter.online === "Yes"}
                    onChange={() => {setCurrPage(1)
                      setFilter({ ...filter, online: "Yes" })}}
                  />
                  <Form.Check
                    type="radio"
                    name="online"
                    label="No"
                    checked={filter.online === "No"}
                    onChange={() => {setCurrPage(1)
                      setFilter({ ...filter, online: "No" })}}
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
                    onChange={() => {setCurrPage(1) 
                      setFilter({ ...filter, registration: "" })}}
                  />
                  <Form.Check
                    type="radio"
                    name="registration"
                    label="Open"
                    checked={filter.registration === "Open"}
                    onChange={() => {setCurrPage(1)
                      setFilter({ ...filter, registration: "Open" })}
                    }
                  />
                  <Form.Check
                    type="radio"
                    name="registration"
                    label="Closed"
                    checked={filter.registration === "Closed"}
                    onChange={() => {setCurrPage(1)
                      setFilter({ ...filter, registration: "Closed" })}
                    }
                  />
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Hours</Accordion.Header>
                <Accordion.Body>
                {[{label: "Morning (5 AM - 11 AM)", value: "Morning"}, {label: "Afternoon (12 PM - 4 PM)", value: "Afternoon"}, {label: "Evening (5 PM - 11 PM)", value: "Evening"}, {label: "All Day/Unspecified", value: "N/A"}].map((option) => (
                   <Form.Check
                     key={option.value}
                     type="checkbox"
                     label={option.label}
                     checked={filter.hours.includes(option.value)}
                     onChange={() => handleHoursChange(option.value)}
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
            onClick={() => pageChange(1)}
            disabled={currPage === 1}
          >
            First
          </button>

          <button
            className="btn btn-secondary mx-2"
            onClick={() => pageChange(Math.max(currPage - 1, 1))}
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
              pageChange(Math.min(currPage + 1, numPages))            
            }
            disabled={currPage >= numPages}
          >
            Next
          </button>
          <button
            className="btn btn-secondary mx-2"
            onClick={() => pageChange(numPages)}
            disabled={currPage >= numPages}
          >
            Last
          </button>
      </Container>
    </Container>
  );
};

export default Events;