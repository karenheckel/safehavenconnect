import React, { useState, useEffect } from "react";
import { Container, Row, InputGroup, Form, Button } from "react-bootstrap";
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
  const cardsOnPage = 10;

  const [query, setQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/events`, {
          params: { page: currPage, per_page: cardsOnPage },
        });
        const pagination = res.data.pagination;
        const formatted = res.data.data.map((event) => {
          // Format readable times
          const start = new Date(event.start_time);
          const end = new Date(event.end_time);
          const formattedTime = `${start.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })} - ${end.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}`;

          return {
            id: event.id,
            title: event.name,
            description: event.description,
            event_type: event.event_type,
            location: event.location,
            date: new Date(event.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            time: formattedTime,
            online_availability: event.is_online ? "Yes" : "No",
            registration: event.registration_open ? "Open" : "Closed",
            image_url: event.image_url,
          };
        });

        if (!searchActive) {
          setEventsInfo(formatted.length > 0 ? formatted : backupData.events);
          setNumPages(pagination.pages || 1);
          setTotal(pagination.total);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setEventsInfo(backupData.events);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
  }, [currPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/search`, {
        params: { q: query, model: "Event", page: currPage, per_page: cardsOnPage },
      });
      const pagination = res.data.pagination;
      const formatEvents = res.data.results.map((event) => ({
        id: event.id,
        title: event.name,
        description: event.description,
        event_type: event.type_label,
        location: event.location,
        date: event.date || "N/A",
        time: event.time || "N/A",
        online_availability: event.online_availability,
        registration: event.registration_open ? "Open" : "Closed",
        image_url: event.image_url,
      }));
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
  };

  useEffect(() => {
    if (searchActive) {
      handleSearch({ preventDefault: () => { } });
    }
  }, [currPage]);

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


      <Row className="justify-content-center">
        {eventsInfo.map((event, i) => (
          <InfoCard key={i} cardType="event" cardInfo={event} id={event.id} />
        ))}
      </Row>

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
