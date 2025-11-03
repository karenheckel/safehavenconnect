import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoCard from "../../components/InfoCard";
import backupData from "../../backupData.json"

const BACKEND_URL = "https://backend.safehavenconnect.me";

const EventPage = () => {
  const { id } = useParams();
  const [eventInfo, setEventInfo] = useState(null);
  const [relatedOrgs, setRelatedOrgs] = useState([]);
  const [relatedResources, setRelatedResources] = useState([]);

  useEffect(() => {
    if (id.startsWith("default")) {
      const backupEvent = backupData.events.find((e) => e.eventId === id);
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
          const res = await axios.get(`${BACKEND_URL}/api/events/${id}`);

          // Format times
          const event = res.data;
          const start = new Date(event.start_time);
          const end = new Date(event.end_time);
          const formattedTime = `${start.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })} - ${end.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}`;

          // Format date
          const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          setEventInfo({
            name: event.name,
            description: event.description,
            event_type: event.event_type,
            location: event.location,
            date: formattedDate,
            time: formattedTime,
            is_online: event.is_online ? "Yes" : "No",
            registration: event.registration_open ? "Open" : "Closed",
            image_url: event.image_url,
            event_url: event.event_url,
            map_url: event.map_url,
            organization_ids: event.organization_ids,
            resource_ids: event.resource_ids,
          });
          // Fetch related organizations
          if (event.organization_ids?.length) {
            const orgResponses = await Promise.all(
              event.organization_ids.map((oid) =>
                axios.get(`${BACKEND_URL}/api/organizations/${oid}`)
              )
            );
            const orgs = orgResponses.map((r) => ({
              id: r.data.id,
              title: r.data.name,
              location: r.data.location,
              org_type: r.data.organization_type,
              services: r.data.services,
              hours: r.data.hours_of_operation || "N/A",
              online_availability: r.data.online_availability ? "Yes" : "No",
              image_url: r.data.image_url,
            }));
            setRelatedOrgs(orgs);
          }

          // Fetch related resources
          if (event.resource_ids?.length) {
            const resResponses = await Promise.all(
              event.resource_ids.map((rid) =>
                axios.get(`${BACKEND_URL}/api/resources/${rid}`)
              )
            );
            const resources = resResponses.map((r) => ({
              id: r.data.id,
              title: r.data.title,
              location: r.data.location,
              resource_type: r.data.topic,
              hours: r.data.hours_of_operation || "N/A",
              online_availability: r.data.online_availability ? "Yes" : "No",
              organization: r.data.organization_name,
              image_url: r.data.image_url,
            }));
            setRelatedResources(resources);
          }
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
              <p><strong>Event Type:</strong> {eventInfo.event_type}</p>
              <p><strong>Description:</strong> {eventInfo.description}</p>
              <p><strong>Location:</strong> {eventInfo.location}</p>
              <p><strong>Date:</strong> {eventInfo.date}</p>
              <p><strong>Time:</strong> {eventInfo.time}</p>
              <p><strong>Online:</strong> {eventInfo.is_online}</p>
              <p><strong>Registration:</strong> {eventInfo.registration}</p>
              {eventInfo.event_url && (
                <p> <strong>Website:</strong>{" "}
                  <a href={eventInfo.event_url}
                    target="_blank"
                    rel="noopener noreferrer" >
                    {eventInfo.event_url} </a></p>)}
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
            {relatedOrgs.length > 0 ? (
              relatedOrgs.map((org) => (
                <InfoCard
                  key={org.id}
                  cardType="organization"
                  cardInfo={org}
                  id={org.id}
                />
              ))
            ) : (
              <p className="text-muted">No related organizations found.</p>
            )}
          </Col>
          <Col className="text-center" md={6}>
            <h3>Related Resources</h3>
            {relatedResources.length > 0 ? (
              relatedResources.map((res) => (
                <InfoCard
                  key={res.id}
                  cardType="resource"
                  cardInfo={res}
                  id={res.id}
                />
              ))
            ) : (
              <p className="text-muted">No related resources found.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EventPage;
