import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
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

        setEventsInfo(formatted.length > 0 ? formatted : backupData.events);
        setNumPages(pagination.pages || 1);
        setTotal(pagination.total);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEventsInfo(backupData.events);
      } finally {
        setLoading(false);
      }
    };
    getEvents();
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
