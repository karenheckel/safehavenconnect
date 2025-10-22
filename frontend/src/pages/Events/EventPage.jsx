import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoCard from "../../components/InfoCard";

const EventPage = () => {
  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState(null);

  useEffect(() => {
    const getEventInfo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/events/${id}`
        );
        setEventInfo(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    getEventInfo();
  }, [id]);

  if (!eventInfo) {
    return <p>Loading event info</p>;
  }

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center">{eventInfo.name}</h1>
        <Row className="my-3 align-items-center">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={eventInfo.image_url}
              alt={eventInfo.name}
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p>Location: {eventInfo.location}</p>
              <p>Date: {eventInfo.date}</p>
              <p>Time: {eventInfo.start_time}</p>
              <p>Event Type: {eventInfo.event_type}</p>
              <a href={eventInfo.event_url}>Event Link</a>
            </Card>
          </Col>
        </Row>
        {eventInfo.map_url && (
          <Row>
            <iframe
              title="Map to Event"
              src={eventInfo.map_url}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Row>
        )}
        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            {
              // list of instances
              eventInfo.organization_ids.map((orgId) => (
                <InfoCard
                  key={orgId}
                  cardType="organization"
                  cardInfo={{ id: orgId }}
                />
              ))
            }
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
            {eventInfo.resource_ids.map((resourceId) => (
              <InfoCard
                key={resourceId}
                cardType="resource"
                cardInfo={{ id: resourceId }}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EventPage;
