import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfoCard from "../../components/InfoCard";
import backupData from "../../backupData.json";

const BACKEND_URL = "https://backend.safehavenconnect.me";

const ResourcePage = () => {
  const { id } = useParams();
  const [resourceInfo, setResourceInfo] = useState(null);
  const [relatedOrgs, setRelatedOrgs] = useState([]);

  useEffect(() => {
    if (id.startsWith("default")) {
      const backup = backupData.resources.find((r) => r.id === id);
      if (backup) setResourceInfo(backup);
    } else {
      const getResourceInfo = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/resources/${id}`);
          const data = res.data;

          const formatted = {
            id: data.id,
            name: data.title,
            description: data.description,
            location: data.location,
            type: data.topic,
            hours: data.hours_of_operation || "N/A",
            online_availability: data.online_availability ? "Yes" : "No",
            image_url: data.image_url,
            resource_url: data.resource_url,
            organization_ids: data.organization_ids,
            event_ids: data.event_ids,
            services: data.services,
          };

          setResourceInfo(formatted);
        } catch (err) {
          console.error("Error fetching resource:", err);
        }
      };

      getResourceInfo();
    }
  }, [id]);

  // Fetch related organizations
  useEffect(() => {
    const fetchRelatedOrgs = async () => {
      if (resourceInfo?.organization_ids?.length) {
        try {
          const responses = await Promise.all(
            resourceInfo.organization_ids.map((orgId) =>
              axios.get(`${BACKEND_URL}/api/organizations/${orgId}`)
            )
          );

          const formattedOrgs = responses.map((res) => ({
            id: res.data.id,
            title: res.data.name,
            location: res.data.location,
            services: res.data.services,
            hours: res.data.hours_of_operation || "N/A",
            online_availability: res.data.online_availability ? "Yes" : "No",
            image_url: res.data.image_url,
            org_type: res.data.organization_type,
          }));

          setRelatedOrgs(formattedOrgs);
        } catch (err) {
          console.error("Error loading related orgs:", err);
        }
      }
    };

    fetchRelatedOrgs();
  }, [resourceInfo]);

  if (!resourceInfo) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border mb-3" role="status"></div>
        <h4 className="mt-2">Loading Resource Info...</h4>
      </Container>
    );
  }

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center">{resourceInfo.name}</h1>

        <Row className="my-3 align-items-center">
          <Col md={6} className="d-flex justify-content-center">
            <img
              src={resourceInfo.image_url}
              alt={resourceInfo.name}
              className="img-fluid rounded"
            />
          </Col>

          <Col className="text-center" md={6}>
            <Card body className="shadow-sm">
              <p><strong>Description:</strong> {resourceInfo.description}</p>
              <p><strong>Location:</strong> {resourceInfo.location}</p>
              <p><strong>Type:</strong> {resourceInfo.type}</p>
              <p><strong>Hours:</strong> {resourceInfo.hours}</p>
              <p><strong>Online Availability:</strong> {resourceInfo.online_availability}</p>

              {resourceInfo.resource_url && (
                <a
                  href={resourceInfo.resource_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about {resourceInfo.name}
                </a>
              )}
            </Card>
          </Col>
        </Row>

        <Row className="my-3">
          <Col className="text-center" md={6}>
            <h3>Related Organizations</h3>
            {relatedOrgs.length > 0 ? (
              relatedOrgs.map((org) => (
                <InfoCard key={org.id} cardType="organization" cardInfo={org} id={org.id} />
              ))
            ) : (
              <p className="text-muted">No related organizations found.</p>
            )}
          </Col>

          <Col className="text-center" md={6}>
            <h3>Related Events</h3>
            {resourceInfo.event_ids?.length > 0 ? (
              resourceInfo.event_ids.map((eventId) => (
                <InfoCard
                  key={eventId}
                  cardType="event"
                  cardInfo={{ id: eventId }}
                  id={eventId}
                />
              ))
            ) : (
              <p className="text-muted">No related events found.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResourcePage;
