import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import InfoCard from "../components/InfoCard";
import axios from "axios";

const DATABASE_URL = "http://localhost:5001";

const Events = () => {
  const [eventsInfo, setEventsInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get(DATABASE_URL, "/api/events");
        const formatEvents = res.data.map((event) => ({
          eventId: event.id,
          title: event.name,
          location: event.location,
          time: event.start_time,
          date: event.date,
          eventType: event.event_type,
          organization: event.relatedOrganizations[0].title,
          imgUrl: event.image_url,
          pageLink: event.event_url,
        }));
        setEventsInfo(formatEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  if (loading) {
    return (
      <>
        <p>Loading events</p>
      </>
    );
  }

  return (
    <>
      <Container className="text-center my-5">
        <h1>Upcoming Events</h1>
        <p>Number of events: {eventsInfo.length}</p>
        <Row className="justify-content-center">
          {eventsInfo.map((eventInfo, index) => (
            <InfoCard key={index} cardType="event" cardInfo={eventInfo} id={eventInfo.eventId} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Events;
