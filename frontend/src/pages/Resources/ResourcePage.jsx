import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
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
  const [relatedEvents, setRelatedEvents] = useState([]);

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

  useEffect(() => {
    const fetchRelatedEvents = async () => {
      if (resourceInfo?.event_ids?.length) {
        try {
          const responses = await Promise.all(
            resourceInfo.event_ids.map((eventId) =>
              axios.get(`${BACKEND_URL}/api/events/${eventId}`)
            )
          );

          const formatted = responses.map((res) => {
            const e = res.data;

            return {
              id: e.id,
              title: e.name,
              location: e.location,
              description: e.description,
              event_type: e.event_type,
              date: e.date,
              start_time: e.start_time,
              end_time: e.end_time,
              registration: e.registration_open ? "Open" : "Closed",
              online_availability: e.is_online ? "Yes" : "No",
              image_url: e.image_url,
            };
          });

          setRelatedEvents(formatted);
        } catch (err) {
          console.error("Error fetching related events:", err);
        }
      }
    };

    fetchRelatedEvents();
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
            </Card>

            <div className="d-grid gap-2 mt-3">
              {resourceInfo.resource_url ? (
                <Button
                  variant="success"
                  href={resourceInfo.resource_url.startsWith("http") ? resourceInfo.resource_url : `http://${resourceInfo.resource_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  style={{
                    backgroundColor: "#2e856e",
                    borderColor: "#2e856e",
                  }}
                >
                  Visit Website <i className="bi bi-box-arrow-up-right ms-2"></i>
                </Button>
              ) : (
                <Button variant="secondary" size="lg" disabled>
                  No Website Available
                </Button>
              )}
            </div>

          </Col>
        </Row>

        <div style={{ backgroundColor: "#f7faf8" }} className="py-5 px-3 my-5 rounded">
          <Row className="gy-4">
            <Col md={6}>
              <div className="p-4 rounded shadow-sm bg-white mb-4">
                <h3 className="mb-3 border-bottom pb-2">Related Organizations</h3>

                {relatedOrgs.length > 0 ? (
                  <Row>
                    {relatedOrgs.map((org) => (
                      <Col xs={12} className="mb-4 d-flex justify-content-center">
                        <InfoCard
                          cardType="organization"
                          cardInfo={org}
                          id={org.id}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-muted text-center">No related organizations found.</p>
                )}
              </div>
            </Col>

            <Col md={6}>
              <div className="p-4 rounded shadow-sm bg-white mb-4">
                <h3 className="mb-3 border-bottom pb-2">Related Events</h3>

                {relatedEvents.length > 0 ? (
                  <Row>
                    {relatedEvents.map((event) => (
                      <Col xs={12} className="mb-4 d-flex justify-content-center">
                        <InfoCard
                          cardType="event"
                          cardInfo={event}
                          id={event.id}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-muted text-center">No related events found.</p>
                )}
              </div>
            </Col>
          </Row>
        </div>

      </Container>
    </>
  );
};

export default ResourcePage;