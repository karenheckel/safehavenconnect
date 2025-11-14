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
            eventResponses.map((res) => {
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
            })
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
              <p><strong>Type:</strong> {orgInfo.organization_type}</p>
              <p><strong>Services:</strong> {orgInfo.services}</p>
              <p><strong>Hours:</strong> {orgInfo.hours_of_operation}</p>
              <p><strong>Online Availability:</strong> {orgInfo.online_availability ? "Yes" : "No"}</p>
            </Card>

            <div className="d-grid gap-2 mt-3">
              {orgInfo.website_url ? (
                <Button
                  variant="success"
                  href={orgInfo.website_url.startsWith("http") ? orgInfo.website_url : `https://${orgInfo.website_url}`}
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
        {/* Related Section */}
        <div style={{ backgroundColor: "#f7faf8" }} className="py-5 px-3 my-5 rounded">
          <Row className="gy-4">

            {/* Related Events */}
            <Col md={6}>
              <div className="p-4 bg-white shadow-sm rounded">
                <h3 className="mb-3 border-bottom pb-2">Related Events</h3>

                {relatedEvents.length > 0 ? (
                  <Row>
                    {relatedEvents.map((event) => (
                      <Col xs={12} className="mb-4 d-flex justify-content-center" key={event.id}>
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

            {/* Related Resources */}
            <Col md={6}>
              <div className="p-4 bg-white shadow-sm rounded">
                <h3 className="mb-3 border-bottom pb-2">Related Resources</h3>

                {relatedResources.length > 0 ? (
                  <Row>
                    {relatedResources.map((resource) => (
                      <Col xs={12} className="mb-4 d-flex justify-content-center" key={resource.id}>
                        <InfoCard
                          cardType="resource"
                          cardInfo={resource}
                          id={resource.id}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-muted text-center">No related resources found.</p>
                )}
              </div>
            </Col>

          </Row>
        </div>

      </Container>
    </>
  );
};

export default OrganizationPage;