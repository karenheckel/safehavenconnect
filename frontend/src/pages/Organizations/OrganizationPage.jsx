import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoCard from "../../components/InfoCard";
import backupData from "../../backupData.json";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const OrganizationPage = () => {
  const { id } = useParams();
  const [orgInfo, setOrgInfo] = useState(null);
  const [relatedResources, setRelatedResources] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);

  useEffect(() => {
    if (id.startsWith("default")) {
      const backupOrg = backupData.organizations.find((org) => org.id === id);
      if (backupOrg) {
        setOrgInfo(backupOrg);
      }
    } else {
      const getOrgInfo = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/organizations/${id}`);

          setOrgInfo(res.data);

          const resourceRequests = res.data.resource_ids.map((rid) =>
            axios.get(`${BACKEND_URL}/api/resources/${rid}`)
          );

          const eventRequests = res.data.event_ids.map((eid) =>
            axios.get(`${BACKEND_URL}/api/events/${eid}`)
          );

          const [resourceResponses, eventResponses] = await Promise.all([
            Promise.all(resourceRequests),
            Promise.all(eventRequests),
          ]);

          setRelatedResources(
            resourceResponses.map((r) => ({
              id: r.data.id,
              title: r.data.title,
              location: r.data.location,
              resource_type: r.data.topic,
              hours: r.data.hours_of_operation || "N/A",
              online_availability: r.data.online_availability ? "Yes" : "No",
              organization: r.data.organization_name,
              image_url: r.data.image_url,
            }))
          );

          setRelatedEvents(
            eventResponses.map((e) => ({
              id: e.data.id,
              title: e.data.name,
              location: e.data.location,
              time: e.data.start_time
                ? new Date(e.data.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "N/A",
              date: e.data.date,
              event_type: e.data.event_type,
              image_url: e.data.image_url,
            }))
          );

        } catch (err) {
          console.error("Error fetching organization:", err);
        }
      };

      getOrgInfo();
    }
  }, [id]);

  if (!orgInfo) {
    return (
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Loading Organization Info...</h4>
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center">{orgInfo.name}</h1>
        <Row className="my-3 align-items-center">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={orgInfo.image_url}
              alt={orgInfo.name}
              className="img-fluid rounded"
            />
          </Col>
          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p><strong>Location:</strong> {orgInfo.location}</p>
              <p><strong>Services:</strong> {orgInfo.services}</p>
              <p><strong>Hours:</strong> {orgInfo.hours_of_operation}</p>
              <p><strong>Online Availability:</strong> {orgInfo.online_availability ? "Yes" : "No"}</p>
              <p><strong>Website:</strong> {" "}<a href={orgInfo.website_url}>{orgInfo.website_url}</a> </p>
            </Card>
          </Col>
        </Row>
        <Row className="my-3">
          <Col md={6} className="text-center">
            <h3>Related Events</h3>
            {relatedEvents.length > 0 ? (
              relatedEvents.map((event) => (
                <InfoCard
                  key={event.id}
                  cardType="event"
                  cardInfo={event}
                  id={event.id}
                />
              ))
            ) : (
              <p>No related events found.</p>
            )}
          </Col>

          <Col md={6} className="text-center">
            <h3>Related Resources</h3>
            {relatedResources.length > 0 ? (
              relatedResources.map((resource) => (
                <InfoCard
                  key={resource.id}
                  cardType="resource"
                  cardInfo={resource}
                  id={resource.id}
                />
              ))
            ) : (
              <p>No related resources found.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrganizationPage;
