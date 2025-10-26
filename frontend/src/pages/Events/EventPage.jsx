import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoCard from "../../components/InfoCard";

const backupEvents = [
  {
    id: "default0",
    name: "Volunteer Information Session",
    location: "1515 Grove Blvd, Austin, TX 78741",
    start_time: "6:00 pm - 7:30 pm",
    date: "October 1, 2025",
    event_type: "Informational",
    organization_ids: [0],
    resource_ids: [0],
    image_url: "https://www.safeaustin.org/wp-content/uploads/2018/08/fb.png",
    event_url: "/event1",
  },
  {
    id: "default1",
    name: "Hope Alliance Survive. Thrive. Prevent 5K Run/Walk",
    location: "445 E Morrow St, Georgetown, TX 78626 (San Gabriel Park)",
    start_time: "9:00 am - 12:00 pm",
    date: "October 11, 2025",
    event_type: "Fundraising",
    organization_ids: [0],
    resource_ids: [0],
    image_url:
      "https://www.hopealliancetx.org/wp-content/uploads/HopeAlliance_Logo_color_tagline-1-300x300.png",
    event_url: "/event2",
  },
  {
    id: "default2",
    name: "TCFV’s 2025 Texas Town Hall",
    location: "Texas Tribune Headquarters, Austin, TX",
    start_time: "10:00 am - 12:00 pm",
    date: "October 3, 2025",
    event_type: "Panel",
    organization_ids: [0],
    resource_ids: [0],
    image_url: "https://tcfv.org/wp-content/themes/tcfv/assets/img/logo.svg",
    event_url: "/event3",
  },
];

const EventPage = () => {
  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState(null);

  useEffect(() => {
    if (id.startsWith("default")) {
      const backupEvent = backupEvents.find((e) => e.id === id);
      if (backupEvent) {
        setEventInfo({
          name: backupEvent.name,
          image_url: backupEvent.image_url,
          location: backupEvent.location,
          date: backupEvent.date,
          start_time: backupEvent.start_time,
          event_type: backupEvent.event_type,
          event_url: backupEvent.event_url,
          organization_ids: backupEvent.organization_ids,
          resource_ids: backupEvent.resource_ids,
        });
      }
    } else {
      const getEventInfo = async () => {
        try {
          const res = await axios.get(
            `https://backend.safehavenconnect.me/api/events/${id}`
          );
          setEventInfo(res.data);
        } catch (err) {
          console.error("Error fetching event:", err);
        }
      };
      getEventInfo();
    }
  }, [id]);

  if (!eventInfo) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Loading Event Info...</h4>
      </Container>
    );
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
              eventInfo.organization_ids?.map((orgId) => (
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
            {eventInfo.resource_ids?.map((resourceId) => (
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
